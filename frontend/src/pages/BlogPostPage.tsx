import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, CTA } from "../components/Sections";
import { api } from "../services/api";
import { useInitialData } from "../ssr/InitialData";
import type { BlogPost } from "../types";
export function BlogPostPage() {
  const { slug = "" } = useParams();
  const initial = useInitialData();
  const [post, setPost] = useState<BlogPost | null>(
    initial.post?.slug === slug ? initial.post : null,
  );
  const [error, setError] = useState("");
  useEffect(() => {
    if (post) return;
    api
      .post(slug)
      .then(setPost)
      .catch((e) => setError(e.message));
  }, [slug, post]);
  if (error)
    return (
      <div className="container-shell section-pad">
        <h1 className="heading">Article not found.</h1>
        <Link to="/blog" className="button-primary mt-8">
          View insights
        </Link>
      </div>
    );
  if (!post)
    return (
      <div className="container-shell section-pad">
        <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    );
  return (
    <>
      <article>
        <header className="section-pad bg-surface">
          <div className="container-shell max-w-4xl">
            <Breadcrumbs
              items={[
                ["Home", "/"],
                ["Insights", "/blog"],
                [post.title, `/blog/${post.slug}`],
              ]}
            />
            <p className="eyebrow">{post.category || "Insight"}</p>
            <h1 className="heading mt-6">{post.title}</h1>
            <p className="copy mt-6">{post.excerpt}</p>
            {post.publishedAt && (
              <time
                className="mt-5 block text-sm text-slate-500"
                dateTime={post.publishedAt}
              >
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  dateStyle: "long",
                })}
              </time>
            )}
          </div>
        </header>
        <div className="container-shell prose-avnture max-w-3xl section-pad whitespace-pre-line">
          {post.content}
        </div>
      </article>
      <CTA />
    </>
  );
}
