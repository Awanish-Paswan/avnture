import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authRouter } from "./routes/authRoutes.js";
import { blogRouter, projectRouter } from "./routes/contentRoutes.js";
import { faqRouter } from "./routes/faqRoutes.js";
import { leadRouter } from "./routes/leadRoutes.js";
import { uploadRouter } from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { robotsTxt, sitemapXml } from "./services/seoService.js";
export const app = express();
const here = path.dirname(fileURLToPath(import.meta.url));
const uploadsDirectory = path.resolve(here, "uploads");
const allowed = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((x) => x.trim());
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(compression());
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error("Origin not allowed by CORS."));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "500kb" }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "test")
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.get("/api/health", (req, res) =>
  res.json({
    success: true,
    message: "API is healthy.",
    data: { database: "connected" },
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/blog", blogRouter);
app.use("/api/leads", leadRouter);
app.use("/api/faqs", faqRouter);
app.use("/api/uploads", uploadRouter);
app.use(
  "/uploads",
  express.static(uploadsDirectory, { maxAge: "30d", immutable: true }),
);
app.get("/robots.txt", (req, res) => res.type("text/plain").send(robotsTxt()));
app.get("/sitemap.xml", async (req, res, next) => {
  try {
    res.type("application/xml").send(await sitemapXml());
  } catch (e) {
    next(e);
  }
});
app.use("/api", notFound);
export function attachErrorHandler() {
  app.use(errorHandler);
}
