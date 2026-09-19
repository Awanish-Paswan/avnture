import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CTA, SectionIntro } from "../components/Sections";
import { api } from "../services/api";
import { useInitialData } from "../ssr/InitialData";
import type { Project } from "../types";
export function WorkPage() {
  const initial = useInitialData();
  const [items, setItems] = useState<Project[]>(initial.projects || []);
  const [loading, setLoading] = useState(!initial.projects);
  useEffect(() => {
    if (initial.projects) return;
    api
      .projects()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [initial.projects]);
  return (
    <>
      <section className="section-pad">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Selected work"
            title="Digital products with the thinking left visible."
            copy="Case studies are published only when the work and project details can be presented accurately."
          />
          {loading ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {[1, 2].map((x) => (
                <div
                  key={x}
                  className="h-80 animate-pulse rounded-3xl bg-slate-100"
                />
              ))}
            </div>
          ) : items.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {items.map((project) => {
                const card = <ProjectCard project={project} />;
                return project.liveUrl ? (
                  <a
                    data-event="portfolio_interaction"
                    className="group card overflow-hidden"
                    key={project._id}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live project in a new tab`}
                  >
                    {card}
                  </a>
                ) : (
                  <Link
                    data-event="portfolio_interaction"
                    className="group card overflow-hidden"
                    key={project._id}
                    to={`/work/${project.slug}`}
                  >
                    {card}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-surface p-10">
              <h2 className="text-2xl font-bold">
                Genuine case studies are being prepared.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                No placeholder clients or invented outcomes are shown here.
                Approved projects can be published through the content dashboard
                as soon as their details and visuals are ready.
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 font-bold text-brand"
                to="/contact"
              >
                Discuss what we can build for you <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <>
      <div className="aspect-[16/10] overflow-hidden bg-surface">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} project preview`}
            width="720"
            height="450"
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm font-bold uppercase tracking-widest text-slate-400">
            Project visual
          </div>
        )}
      </div>
      <div className="p-7">
        <p className="text-sm font-bold text-brand">
          {project.industry || "Digital product"}
        </p>
        <h2 className="mt-3 flex items-center justify-between text-2xl font-bold">
          {project.title}
          <ArrowUpRight />
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          {project.shortDescription}
        </p>
        <p className="mt-5 text-sm font-semibold text-slate-500">
          {project.liveUrl ? "Open live project ↗" : "View case study"}
        </p>
      </div>
    </>
  );
}
