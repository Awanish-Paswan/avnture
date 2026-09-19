import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contactHref } from "../config/company";
import { Brand } from "./Brand";
const links = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/blog", "Insights"],
  ["/contact", "Contact"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Brand />
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition hover:text-brand ${isActive ? "text-brand" : "text-slate-600"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href={contactHref.freeConsultation}
            target="_blank"
            rel="noreferrer"
            data-event="whatsapp_click"
            className="button-primary"
          >
            <MessageCircle size={17} /> Get a Free Consultation
            <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          className="grid h-10 w-10 shrink-0 touch-manipulation place-items-center rounded-full border border-slate-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <div
        className={`fixed inset-x-0 top-[77px] h-[calc(100dvh-77px)] overflow-hidden overscroll-contain transition-colors duration-300 lg:hidden ${
          open
            ? "visible bg-slate-950/35"
            : "pointer-events-none invisible bg-transparent"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <nav
          className={`ml-auto flex h-full w-[88vw] max-w-[360px] flex-col overflow-y-auto bg-white px-6 py-8 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          {links.map(([to, label], i) => (
            <NavLink
              key={to}
              to={to}
              className="border-b border-slate-200 py-4 text-2xl font-bold"
            >
              <span className="mr-4 text-sm text-slate-400">0{i + 1}</span>
              {label}
            </NavLink>
          ))}
          <a
            href={contactHref.freeConsultation}
            target="_blank"
            rel="noreferrer"
            data-event="whatsapp_click"
            className="mt-6 inline-flex min-h-11 self-start items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
          >
            <MessageCircle size={16} /> Get a Free Consultation
            <ArrowUpRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}
