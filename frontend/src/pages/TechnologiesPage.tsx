import { CTA, SectionIntro } from "../components/Sections";
import { technologies } from "../data/site";
export function TechnologiesPage() {
  return (
    <>
      <section className="section-pad bg-surface">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Technology"
            title="A modern MERN foundation, selected with purpose."
            copy="Tools matter when they improve usability, delivery, security and maintainability. The stack remains flexible around the product rather than becoming the product."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(technologies).map(([group, items]) => (
              <article className="card p-7" key={group}>
                <h2 className="text-xl font-bold">{group}</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {items.map((x) => (
                    <span
                      className="rounded-full border border-slate-200 bg-surface px-3 py-2 text-sm font-semibold"
                      key={x}
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
