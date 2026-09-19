import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CTA, SectionIntro } from "../components/Sections";
import { api } from "../services/api";
import { useInitialData } from "../ssr/InitialData";
import type { BlogPost } from "../types";
export function BlogPage() {
  const initial = useInitialData();
  const [items, setItems] = useState<BlogPost[]>(initial.posts || []);
  const [loading, setLoading] = useState(!initial.posts);
  useEffect(() => {
    if (initial.posts) return;
    api
      .posts()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [initial.posts]);
  return (
    <>
      <section className="section-pad bg-surface">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Insights"
            title="Useful thinking for better digital decisions."
            copy="Clear guides about websites, applications, custom software and the choices businesses face when investing in technology."
          />
          {loading ? (
            <div className="mt-12 h-72 animate-pulse rounded-3xl bg-white" />
          ) : items.length ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((post) => (
                <Link
                  className="group card p-7"
                  key={post._id}
                  to={`/blog/${post.slug}`}
                >
                  <p className="text-sm font-bold text-brand">
                    {post.category || "Technology"}
                  </p>
                  <h2 className="mt-8 text-2xl font-bold tracking-[-.03em]">
                    {post.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                    {post.excerpt}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-bold">
                    Read insight <ArrowUpRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-12 card p-9">
              <h2 className="text-2xl font-bold">
                Thoughtful articles, published when they are ready.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                The publishing system is ready, but it does not manufacture thin
                articles to fill a page. Useful, reviewed guidance will appear
                here.
              </p>
            </div>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}
