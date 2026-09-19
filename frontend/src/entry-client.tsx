import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { InitialDataProvider } from "./ssr/InitialData";
import "./styles/index.css";
hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <InitialDataProvider data={window.__INITIAL_DATA__ || {}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InitialDataProvider>
  </React.StrictMode>,
);
const ga = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (ga) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
  document.head.appendChild(s);
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", ga);
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest(
      "[data-event]",
    ) as HTMLElement | null;
    if (el) gtag("event", el.dataset.event);
  });
}
