import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "./Brand";
import { company, contactHref } from "../config/company";
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-6 max-w-sm leading-7 text-slate-400">
            Websites, applications and custom software built around real
            business needs.
          </p>
        </div>
        <FooterColumn
          title="Company"
          links={[
            ["About", "/about"],
            ["Work", "/work"],
            ["Contact", "/contact"],
            ["Industries", "/industries"],
          ]}
        />
        <FooterColumn
          title="Services"
          links={[
            ["Website development", "/services/website-development"],
            ["Web applications", "/services/web-application-development"],
            ["Mobile apps", "/services/mobile-app-development"],
            ["Custom software", "/services/custom-software-development"],
          ]}
        />
        <FooterColumn
          title="Resources"
          links={[
            ["Insights", "/blog"],
            ["Technologies", "/technologies"],
            ["Privacy policy", "/privacy-policy"],
            ["Terms", "/terms"],
          ]}
        />
      </div>
      <div className="container-shell flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </span>
        <div className="flex gap-5">
          {company.email && (
            <a data-event="email_click" href={contactHref.email}>
              {company.email}
            </a>
          )}
          {company.phone && (
            <a data-event="phone_click" href={contactHref.phone}>
              {company.phone}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-[.14em] text-white/50">
        {title}
      </h2>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link
              className="group inline-flex items-center gap-1 text-sm text-slate-300 hover:text-white"
              to={to}
            >
              {label}
              <ArrowUpRight
                className="opacity-0 transition group-hover:opacity-100"
                size={13}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
