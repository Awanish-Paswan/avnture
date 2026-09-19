import { company } from "../config/company";
import { locations, primaryServices, secondaryServices } from "../data/site";
export type Seo = {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
};
const descriptions: Record<string, [string, string]> = {
  "/": [
    "Web & Software Development Company in India | Avnture Technologies",
    "Avnture Technologies builds professional websites, web applications, mobile apps and custom software for businesses across India.",
  ],
  "/services": [
    "Software & Web Development Services | Avnture Technologies",
    "Explore website, web application, mobile app, custom software and product design services from Avnture Technologies.",
  ],
  "/work": [
    "Selected Work | Avnture Technologies",
    "Explore selected digital products, websites and software developed by Avnture Technologies.",
  ],
  "/about": [
    "About Avnture Technologies | Technology Built for Business",
    "Learn how Avnture Technologies approaches websites, applications and custom software with clarity, performance and long-term maintainability.",
  ],
  "/technologies": [
    "Technologies We Use | Avnture Technologies",
    "Explore the modern frontend, backend, database, security and cloud technologies used by Avnture Technologies.",
  ],
  "/industries": [
    "Industries We Support | Avnture Technologies",
    "Digital product and software development for organisations across education, healthcare, retail, services and other growing industries.",
  ],
  "/blog": [
    "Insights on Web, Apps & Software | Avnture Technologies",
    "Practical insights about website development, applications, software, technology decisions and digital growth.",
  ],
  "/contact": [
    "Start a Project | Avnture Technologies",
    "Tell Avnture Technologies about your website, application or software project and get a clear next-step conversation.",
  ],
  "/privacy-policy": [
    "Privacy Policy | Avnture Technologies",
    "How Avnture Technologies handles information submitted through this website.",
  ],
  "/terms": [
    "Website Terms | Avnture Technologies",
    "Terms governing use of the Avnture Technologies website.",
  ],
};
export function seoFor(pathname: string): Seo {
  const clean = pathname.replace(/\/$/, "") || "/";
  const serviceSlug = clean.match(/^\/services\/([^/]+)$/)?.[1];
  const service = [...primaryServices, ...secondaryServices].find(
    (item) => item.slug === serviceSlug,
  );
  const locationSlug = clean.match(
    /^\/web-development-company-([^/]+)$/,
  )?.[1] as keyof typeof locations | undefined;
  const location = locationSlug ? locations[locationSlug] : undefined;
  let title: string;
  let description: string;
  if (service) {
    title = `${service.title} Services | ${company.name}`;
    description = `${service.short} Discuss a ${service.title.toLowerCase()} project with ${company.name}.`;
  } else if (location) {
    title = `Web Development Company in ${location.name} | ${company.name}`;
    description = `Web development services for businesses in ${location.name}. Build a professional website or application with ${company.name}.`;
  } else {
    [title, description] = descriptions[clean] || [
      `Page not found | ${company.name}`,
      "The page you requested could not be found. Explore our services or return to the homepage.",
    ];
  }
  const canonical = `${company.siteUrl.replace(/\/$/, "")}${clean === "/" ? "" : clean}`;
  return {
    title,
    description,
    canonical,
    robots: clean.startsWith("/admin") ? "noindex,nofollow" : "index,follow",
  };
}
export function renderHead(seo: Seo) {
  const esc = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return `<title>${esc(seo.title)}</title><meta name="description" content="${esc(seo.description)}" /><meta name="robots" content="${seo.robots || "index,follow"}" /><link rel="canonical" href="${esc(seo.canonical)}" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(seo.title)}" /><meta property="og:description" content="${esc(seo.description)}" /><meta property="og:url" content="${esc(seo.canonical)}" /><meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${esc(seo.title)}" /><meta name="twitter:description" content="${esc(seo.description)}" />`;
}
