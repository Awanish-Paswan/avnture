import { useParams } from "react-router-dom";
import {
  Breadcrumbs,
  BulletList,
  CTA,
  Process,
  SectionIntro,
} from "../components/Sections";
import { locations } from "../data/site";
export function LocationPage() {
  const { city = "" } = useParams();
  const location = locations[city as keyof typeof locations];
  if (!location) return <div />;
  return (
    <>
      <section className="section-pad bg-surface">
        <div className="container-shell">
          <Breadcrumbs
            items={[
              ["Home", "/"],
              [
                `Web development in ${location.name}`,
                `/web-development-company-${city}`,
              ],
            ]}
          />
          <span className="eyebrow">Serving businesses in {location.name}</span>
          <h1 className="display mt-6 max-w-5xl">
            Web development for {location.name} businesses ready to move
            forward.
          </h1>
          <p className="copy mt-7 max-w-3xl">
            {location.context} Avnture Technologies works remotely with
            organisations in {location.name} and across India—without claiming a
            local office.
          </p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <SectionIntro
            eyebrow="Relevant services"
            title="Websites and applications with a clear commercial purpose."
            copy="We build professional websites, customer-facing applications and internal systems with responsive design, crawlable content and maintainable MERN architecture."
          />
          <div className="card p-8">
            <h2 className="text-2xl font-bold">
              Business contexts in {location.name}
            </h2>
            <BulletList
              items={[
                ...location.industries,
                "Startups and growing teams",
                "Customer and internal platforms",
              ]}
            />
          </div>
        </div>
      </section>
      <Process />
      <section className="section-pad bg-surface">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Frequently asked questions"
            title={`Planning a digital project in ${location.name}`}
          />
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {[
              [
                `Do you need an office in ${location.name} to work with us?`,
                `No. We work with businesses remotely and keep communication, reviews and delivery structured throughout the project.`,
              ],
              [
                "Can the website be prepared for search visibility?",
                "Yes. We build meaningful server-rendered HTML, metadata, internal links, performance foundations and technical SEO into the website.",
              ],
              [
                "Can you build more than a marketing website?",
                "Yes. The same MERN foundation supports customer portals, dashboards, booking flows and custom business software.",
              ],
            ].map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="cursor-pointer list-none text-lg font-bold">
                  {q}
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
