import { CTA, SectionIntro, ServicesGrid } from "../components/Sections";
export function ServicesPage() {
  return (
    <>
      <section className="section-pad bg-surface">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Services"
            title="From business website to custom software."
            copy="Choose the right level of technology for the problem. Every engagement starts with understanding the users, workflow and outcome—not forcing a prebuilt template."
          />
          <ServicesGrid all />
        </div>
      </section>
      <CTA />
    </>
  );
}
