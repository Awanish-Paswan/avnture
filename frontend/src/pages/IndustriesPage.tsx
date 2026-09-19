import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CTA, SectionIntro } from "../components/Sections";
import { industries } from "../data/site";
export function IndustriesPage() {
  return (
    <>
      <section className="section-pad">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Industries"
            title="Digital products shaped by business context."
            copy="The right solution depends on how customers decide, how teams work and what information needs to move. We learn that context before recommending an approach."
          />
          <div className="mt-14 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((x, i) => (
              <div
                key={x}
                className="min-h-48 border-b border-r border-slate-200 p-7"
              >
                <span className="text-xs font-bold text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-12 text-2xl font-bold">{x}</h2>
              </div>
            ))}
          </div>
          <Link to="/contact" className="button-primary mt-10">
            Discuss your requirements <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
