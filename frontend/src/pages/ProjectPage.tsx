import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import type { Project } from "../types";
import { Breadcrumbs, CTA } from "../components/Sections";
import { useInitialData } from "../ssr/InitialData";
export function ProjectPage() {
  const { slug = "" } = useParams();
  const initial = useInitialData();
  const [item, setItem] = useState<Project | null>(
    initial.project?.slug === slug ? initial.project : null,
  );
  const [error, setError] = useState("");
  useEffect(() => {
    if (item) return;
    api
      .project(slug)
      .then(setItem)
      .catch((e) => setError(e.message));
  }, [slug, item]);
  if (error)
    return (
      <main className="container-shell section-pad">
        <h1 className="heading">Project not found.</h1>
        <Link className="button-primary mt-8" to="/work">
          View selected work
        </Link>
      </main>
    );
  if (!item)
    return (
      <div className="container-shell section-pad">
        <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    );
  return (
    <>
      <section className="section-pad bg-ink text-white">
        <div className="container-shell">
          <Breadcrumbs
            items={[
              ["Home", "/"],
              ["Work", "/work"],
              [item.title, `/work/${item.slug}`],
            ]}
          />
          <p className="eyebrow text-accent">{item.industry || "Case study"}</p>
          <h1 className="display mt-6">{item.title}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-300">
            {item.shortDescription}
          </p>
        </div>
      </section>
      <article className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="prose-avnture">
            <h2>Project overview</h2>
            <p>{item.fullDescription || item.shortDescription}</p>
            {item.challenge && (
              <>
                <h2>Business problem</h2>
                <p>{item.challenge}</p>
              </>
            )}
            {item.solution && (
              <>
                <h2>Solution</h2>
                <p>{item.solution}</p>
              </>
            )}
            {item.features?.length && (
              <>
                <h2>Important features</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  {item.features.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            )}
            {item.results && (
              <>
                <h2>Verified results</h2>
                <p>{item.results}</p>
              </>
            )}
          </div>
          <aside className="card h-fit p-7">
            <Meta label="Industry" value={item.industry} />
            <Meta label="Services" value={item.services?.join(", ")} />
            <Meta label="Technology" value={item.technologies?.join(", ")} />
          </aside>
        </div>
        {item.gallery?.length ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {item.gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${item.title} screen ${i + 1}`}
                width="800"
                height="500"
                loading="lazy"
                className="rounded-3xl border border-slate-200"
              />
            ))}
          </div>
        ) : null}
      </article>
      <CTA />
    </>
  );
}
function Meta({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-b border-slate-200 py-4 first:pt-0 last:border-0">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
