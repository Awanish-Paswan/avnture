import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import { app, attachErrorHandler } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { Project } from "./models/Project.js";
import { BlogPost } from "./models/BlogPost.js";
const here = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(here, "../frontend");
async function initialDataFor(pathname) {
  if (pathname === "/work")
    return {
      projects: await Project.find({ status: "published" })
        .sort({ featured: -1, createdAt: -1 })
        .lean(),
    };
  if (pathname === "/blog")
    return {
      posts: await BlogPost.find({ status: "published" })
        .sort({ publishedAt: -1 })
        .lean(),
    };
  const projectSlug = pathname.match(/^\/work\/([^/]+)$/)?.[1];
  if (projectSlug)
    return {
      project:
        (await Project.findOne({ slug: projectSlug, status: "published" }).lean()) ||
        undefined,
    };
  const postSlug = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
  if (postSlug)
    return {
      post:
        (await BlogPost.findOne({ slug: postSlug, status: "published" }).lean()) ||
        undefined,
    };
  return {};
}
async function start() {
  await connectDatabase();
  if (process.env.NODE_ENV === "production") {
    const client = path.join(frontendRoot, "dist/client");
    const template = await fs.readFile(path.join(client, "index.html"), "utf8");
    const renderer = await import(
      pathToFileURL(path.join(frontendRoot, "dist/server/entry-server.js")).href
    );
    app.use(
      express.static(client, { index: false, maxAge: "1y", immutable: true }),
    );
    app.use(async (req, res, next) => {
      try {
        if (req.method !== "GET") return next();
        const initialData = await initialDataFor(req.path);
        const rendered = renderer.render(req.originalUrl, initialData);
        const serialized = JSON.stringify(initialData).replace(/</g, "\\u003c");
        res
          .status(rendered.status || 200)
          .type("html")
          .send(
            template
              .replace("<!--app-head-->", rendered.head)
              .replace("<!--app-html-->", rendered.html)
              .replace(
                "</body>",
                `<script>window.__INITIAL_DATA__=${serialized}</script></body>`,
              ),
          );
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.get("/", (req, res) =>
      res.json({
        success: true,
        message:
          "Avnture Technologies API. Use the Vite development server for the website.",
        data: null,
      }),
    );
  }
  attachErrorHandler();
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`),
  );
}
start().catch((error) => {
  console.error("Unable to start server:", error.message);
  process.exit(1);
});
