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
        console.error(
          "Cloudinary image upload failed:",
          error?.message || error,
        );
        throw new AppError(
          "The image was processed, but Cloudinary rejected the upload. Verify the CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET values in Render.",
          502,
        );
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
