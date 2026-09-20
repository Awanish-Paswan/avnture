import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import { AppError } from "../middleware/error.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const uploadsDirectory = path.resolve(here, "../uploads");

function cloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

async function saveToCloudinary(buffer) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "avnture-technologies/projects",
        resource_type: "image",
        format: "webp",
        overwrite: false,
      },
      (error, result) => {
        if (error || !result?.secure_url)
          reject(error || new Error("Cloudinary did not return an image URL."));
        else resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

function cloudinaryFailure(error) {
  const message = String(error?.message || error?.error?.message || "");
  const code = String(error?.code || "");
  const httpCode = Number(error?.http_code || error?.status || 0);

  console.error("Cloudinary image upload failed:", {
    name: error?.name,
    code: code || undefined,
    httpCode: httpCode || undefined,
    message: message || undefined,
  });

  if (["ETIMEDOUT", "ECONNRESET", "ENOTFOUND"].includes(code))
    return "Cloudinary could not be reached. Retry the upload and check Render's outbound connection if it continues.";
  if (/signature/i.test(message))
    return "Cloudinary reported an invalid signature. Replace CLOUDINARY_API_SECRET in Render with a freshly copied value.";
  if (httpCode === 401 || /api.?key|credentials|authentication/i.test(message))
    return "Cloudinary rejected the API credentials. Verify the cloud name and replace the API key and secret in Render.";
  if (httpCode === 403 || /disabled|restricted|permission/i.test(message))
    return "Cloudinary denied this upload. Check that the product environment and API key allow image uploads.";
  return `Cloudinary rejected the upload${httpCode ? ` (HTTP ${httpCode})` : ""}. Check the Render log entry for the exact Cloudinary response.`;
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) throw new AppError("Choose an image to upload.", 422);

    let optimized;
    try {
      optimized = await sharp(req.file.buffer, { failOn: "error" })
        .rotate()
        .resize({
          width: 1600,
          height: 1200,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82, effort: 5 })
        .toBuffer();
    } catch {
      throw new AppError(
        "This image could not be decoded. Export it again as a standard JPG, PNG, WebP or AVIF file.",
        422,
      );
    }

    let url;
    let storage;
    if (cloudinaryConfigured()) {
      try {
        url = await saveToCloudinary(optimized);
      } catch (error) {
        throw new AppError(cloudinaryFailure(error), 502);
      }
      storage = "cloudinary";
    } else {
      if (process.env.NODE_ENV === "production")
        throw new AppError(
          "Image storage is not configured. Add the Cloudinary environment variables in Render.",
          503,
        );
      await fs.mkdir(uploadsDirectory, { recursive: true });
      const filename = `project-${Date.now()}-${randomUUID()}.webp`;
      await fs.writeFile(path.join(uploadsDirectory, filename), optimized);
      url = `/uploads/${filename}`;
      storage = "local";
    }

    const metadata = await sharp(optimized).metadata();
    res.status(201).json({
      success: true,
      message: "Image uploaded and optimized.",
      data: {
        url,
        storage,
        width: metadata.width,
        height: metadata.height,
        bytes: optimized.length,
      },
    });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    console.error("Unexpected image upload failure:", error);
    next(new AppError("The image could not be uploaded.", 500));
  }
}
