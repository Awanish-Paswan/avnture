import { ArrowRight, Check, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { primaryServices, process, secondaryServices } from "../data/site";
export function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading mt-5">{title}</h2>
      {copy && <p className="copy mt-6 max-w-2xl">{copy}</p>}
    </div>
  );
}
export function ServicesGrid({ all = false }: { all?: boolean }) {
  const items = all
    ? [...primaryServices, ...secondaryServices]
    : primaryServices;
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {items.map((service, index) => {
        const Icon = service.icon;
        return (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className={`group card p-7 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft ${index > 3 ? "bg-surface" : ""}`}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold text-slate-400">
                {service.number}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon size={22} />
              </span>
            </div>
            <h3 className="mt-10 text-2xl font-bold tracking-[-.03em]">
              {service.title}
            </h3>
            <p className="mt-3 leading-7 text-slate-600">{service.short}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand">
              Explore service{" "}
              <ArrowRight
                className="transition group-hover:translate-x-1"
                size={16}
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function Process() {
  return (
    <section className="section-pad bg-ink text-white">
      <div className="container-shell">
        <SectionIntro
          eyebrow="How we work"
          title="A clear path from idea to dependable product."
          copy="Good delivery starts with shared understanding. Each stage keeps decisions visible and the work tied to the original business goal."
        />
        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {process.map(([n, title, copy]) => (
            <div
              key={n}
              className="grid gap-3 py-7 sm:grid-cols-[80px_220px_1fr] sm:items-center"
            >
              <span className="text-sm font-bold text-accent">{n}</span>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="max-w-xl text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="bg-brand text-white">
      <div className="container-shell flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.15em] text-white/65">
            Have a project in mind?
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] md:text-5xl">
            Let’s build something valuable.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Tell us what you need. We’ll help you understand the right technical
            approach.
          </p>
        </div>
        <Link
          to="/contact"
          className="button-secondary shrink-0 border-white bg-white text-ink"
        >
          Discuss your project <MoveRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function Breadcrumbs({ items }: { items: [string, string][] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap gap-2">
        {items.map(([label, to], i) => (
          <li className="flex items-center gap-2" key={to}>
            {i > 0 && <span>/</span>}
            <Link to={to} className="hover:text-brand">
              {label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-slate-600">
          <Check className="mt-1 shrink-0 text-brand" size={17} />
          {item}
        </li>
      ))}
    </ul>
  );
}
