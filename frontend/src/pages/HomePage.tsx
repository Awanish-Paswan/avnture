import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  MoveUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CTA } from "../components/Sections";
import { company, contactHref } from "../config/company";
import { primaryServices } from "../data/site";

export function HomePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-[#06142b] text-white lg:min-h-[calc(100vh-76px)]">
        <img
          src="/avnture-abstract-blue-hero.jpg"
          alt=""
          width="1600"
          height="900"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,25,.84)_0%,rgba(3,10,25,.53)_52%,rgba(3,10,25,.08)_100%)]" />
        <div className="container-shell relative flex min-h-[720px] items-center py-24 lg:min-h-[calc(100vh-76px)]">
          <div className="max-w-[760px]">
            <p className="text-sm font-medium uppercase tracking-[.2em] text-blue-100/80">
              Web, app & software development
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7.2vw,6.8rem)] font-medium leading-[.96] tracking-[-.065em]">
              Digital products built to move business forward.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-normal leading-8 text-blue-50/80">
              We design and develop websites, applications and custom software
              for businesses across India.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-blue-50"
                to="/contact"
                data-event="start_project"
              >
                Start a Project <ArrowUpRight size={18} />
              </Link>
              <Link
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                to="/work"
              >
                View Our Work <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[.18em] text-brand">
                What we build
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-.045em] md:text-5xl">
                The right technology for the work.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-normal leading-8 text-slate-600">
              From a professional company website to operational software, each
              product is planned around the people using it and the result it
              needs to create.
            </p>
          </div>

          <div className="grid md:grid-cols-2">
            {primaryServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group grid min-h-64 grid-cols-[auto_1fr_auto] gap-5 border-b border-slate-200 py-9 md:odd:border-r md:odd:pr-8 md:even:pl-8"
                >
                  <Icon
                    className="mt-1 text-brand"
                    size={23}
                    strokeWidth={1.7}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      {service.number}
                    </p>
                    <h3 className="mt-3 text-2xl font-medium tracking-[-.03em]">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-md font-normal leading-7 text-slate-600">
                      {service.short}
                    </p>
                  </div>
                  <MoveUpRight
                    className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                    size={20}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f5f8ff]">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[.18em] text-brand">
              Selected work
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-[-.045em] md:text-6xl">
              See how ideas become useful digital products.
            </h2>
          </div>
          <div>
            <p className="text-lg font-normal leading-8 text-slate-600">
              Explore genuine case studies covering the challenge, approach,
              technology and finished experience.
            </p>
            <Link
              to="/work"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-brand"
            >
              Explore selected work <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-7 py-12 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[.18em] text-blue-200/70">
              Prefer WhatsApp?
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-.04em]">
              Start with a simple conversation.
            </h2>
          </div>
          <a
            href={contactHref.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-event="whatsapp_click"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#19b866] px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#139a54]"
          >
            <MessageCircle size={19} /> WhatsApp Us
          </a>
        </div>
      </section>

      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            url: company.siteUrl,
            telephone: company.phone || undefined,
            areaServed: "IN",
          }),
        }}
      />
    </>
  );
}
