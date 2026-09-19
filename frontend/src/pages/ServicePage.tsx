import { useParams } from "react-router-dom";
import {
  Breadcrumbs,
  BulletList,
  CTA,
  Process,
  SectionIntro,
} from "../components/Sections";
import { primaryServices, secondaryServices } from "../data/site";
const details: Record<string, { lead: string; outcomes: string[] }> = {
  "website-development": {
    lead: "Professional websites that explain your value clearly, load quickly and give search engines meaningful content from the first response.",
    outcomes: [
      "Responsive business websites",
      "Crawlable server-rendered pages",
      "Conversion-focused contact paths",
      "Accessible component systems",
      "Performance and analytics readiness",
      "Maintainable content architecture",
    ],
  },
  "web-application-development": {
    lead: "Secure browser-based products for customers, teams and day-to-day business operations.",
    outcomes: [
      "Admin dashboards",
      "Customer and management portals",
      "Booking platforms",
      "Marketplaces",
      "Internal business systems",
      "REST API integrations",
    ],
  },
  "mobile-app-development": {
    lead: "Mobile experiences shaped around the job users need to complete, with a reliable API and scalable product foundation.",
    outcomes: [
      "Product discovery",
      "Mobile-first interface design",
      "Backend and API development",
      "Authentication and roles",
      "Testing and launch support",
      "Ongoing feature development",
    ],
  },
  "custom-software-development": {
    lead: "Software designed for workflows that generic tools cannot handle well.",
    outcomes: [
      "Workflow mapping",
      "Role-based systems",
      "Operational dashboards",
      "Data and third-party integrations",
      "Secure architecture",
      "Phased product delivery",
    ],
  },
  "ui-ux-design": {
    lead: "Clear interfaces and user journeys for websites, mobile apps and business software.",
    outcomes: [
      "User-flow planning",
      "Wireframes",
      "Responsive UI design",
      "Design systems",
      "Interactive prototypes",
      "Developer-ready specifications",
    ],
  },
  "creative-design": {
    lead: "Focused visual support that complements a digital product or business presence.",
    outcomes: [
      "Logo design",
      "Brand identity support",
      "Poster design",
      "Marketing creatives",
      "Digital campaign assets",
      "Consistent visual direction",
    ],
  },
};
export function ServicePage() {
  const { slug = "" } = useParams();
  const service = [...primaryServices, ...secondaryServices].find(
    (x) => x.slug === slug,
  );
  const detail = details[slug];
  if (!service || !detail) return <div />;
  const Icon = service.icon;
  return (
    <>
      <section className="section-pad bg-ink text-white">
        <div className="container-shell">
          <Breadcrumbs
            items={[
              ["Home", "/"],
              ["Services", "/services"],
              [service.title, `/services/${slug}`],
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-[1fr_260px] lg:items-end">
            <div>
              <span className="eyebrow text-accent">
                {service.number} / Service
              </span>
              <h1 className="display mt-6 max-w-5xl">{service.title}</h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-300">
                {detail.lead}
              </p>
            </div>
            <div className="grid aspect-square place-items-center rounded-[2rem] border border-white/10 bg-white/5">
              <Icon className="text-accent" size={78} strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-14 lg:grid-cols-2">
          <SectionIntro
            eyebrow="What we build"
            title="A capable product, not a collection of disconnected features."
            copy="We define the scope around what the product must help its users and the business accomplish."
          />
          <div className="card p-8">
            <h2 className="text-2xl font-bold">Typical deliverables</h2>
            <BulletList items={detail.outcomes} />
          </div>
        </div>
      </section>
      <Process />
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            provider: { "@type": "Organization", name: "Avnture Technologies" },
            areaServed: "India",
            description: detail.lead,
          }),
        }}
      />
    </>
  );
}
