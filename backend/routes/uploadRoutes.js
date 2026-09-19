import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

export const uploadRouter = Router();

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 2, parts: 4 },
  fileFilter(req, file, callback) {
    if (!allowedTypes.has(file.mimetype))
      return callback(
        new AppError("Upload a JPG, PNG, WebP or AVIF image.", 422),
      );
    callback(null, true);
  },
}).single("image");

function receiveImage(req, res, next) {
  uploader(req, res, (error) => {
    if (!error) return next();
    if (error.code === "LIMIT_FILE_SIZE")
      return next(new AppError("The image must be 5 MB or smaller.", 413));
    next(
      error instanceof AppError
        ? error
        : new AppError("Unable to upload this image.", 422),
    );
  });
}

uploadRouter.post(
  "/images",
  requireAuth,
  requireRole("admin", "editor"),
  receiveImage,
  uploadImage,
);
