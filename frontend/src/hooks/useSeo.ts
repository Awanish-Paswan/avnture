import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoFor } from "../seo/seo";
export function useSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = seoFor(pathname);
    document.title = seo.title;
    const upsert = (selector: string, attrs: Record<string, string>) => {
      let node = document.head.querySelector(selector) as HTMLElement | null;
      if (!node) {
        node = document.createElement(attrs.rel ? "link" : "meta");
        document.head.appendChild(node);
      }
      Object.entries(attrs).forEach(([key, value]) =>
        node!.setAttribute(key, value),
      );
    };
    upsert('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    upsert('meta[name="robots"]', {
      name: "robots",
      content: seo.robots || "index,follow",
    });
    upsert('link[rel="canonical"]', { rel: "canonical", href: seo.canonical });
  }, [pathname]);
}
