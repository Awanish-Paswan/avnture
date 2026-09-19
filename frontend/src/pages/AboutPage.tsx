import { CTA, Process, SectionIntro } from "../components/Sections";
export function AboutPage() {
  return (
    <>
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="eyebrow">About Avnture</span>
            <h1 className="display mt-6">
              Technology built around real business needs.
            </h1>
          </div>
          <div className="self-end">
            <p className="copy">
              Avnture Technologies helps businesses transform ideas and
              operational challenges into modern digital products.
            </p>
            <p className="copy mt-5">
              We design and develop websites, web applications, mobile
              applications and custom software with an emphasis on usability,
              performance, scalability and long-term maintainability.
            </p>
          </div>
        </div>
      </section>
      <section className="section-pad bg-surface">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Our approach"
            title="Useful technology starts with a clear understanding of the work."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                "Clarity before code",
                "We make goals, scope and trade-offs visible before development begins.",
              ],
              [
                "Built for people",
                "Interfaces should feel straightforward to customers and internal teams.",
              ],
              [
                "Ready for change",
                "Clean systems make future capabilities easier to add without a complete rebuild.",
              ],
            ].map(([t, c]) => (
              <article key={t} className="card p-8">
                <h2 className="text-2xl font-bold">{t}</h2>
                <p className="mt-4 leading-7 text-slate-600">{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <CTA />
    </>
  );
}
