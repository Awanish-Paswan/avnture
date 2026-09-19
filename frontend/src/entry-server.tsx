import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { renderHead, seoFor } from "./seo/seo";
import { InitialDataProvider, type InitialData } from "./ssr/InitialData";
import "./styles/index.css";
export function render(url: string, data: InitialData = {}) {
  const pathname = new URL(url, "https://avnture.example").pathname;
  const seo = seoFor(pathname);
  const record = data.project || data.post;
  if (record) {
    seo.title = record.seoTitle || `${record.title} | Avnture Technologies`;
    seo.description =
      record.seoDescription ||
      ("shortDescription" in record ? record.shortDescription : record.excerpt);
  }
  return {
    html: renderToString(
      <React.StrictMode>
        <InitialDataProvider data={data}>
          <StaticRouter location={pathname}>
            <App />
          </StaticRouter>
        </InitialDataProvider>
      </React.StrictMode>,
    ),
    head: renderHead(seo),
  };
}
