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
    return () => {
      document.body.style.overflow = "";
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
        <a
          href={contactHref.talkToExpert}
          target="_blank"
          rel="noreferrer"
          data-event="whatsapp_click"
          className="button-primary hidden lg:inline-flex"
        >
          <MessageCircle size={17} /> Talk to an Expert
          <ArrowUpRight size={16} />
        </a>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-x-0 top-[77px] h-[calc(100vh-77px)] bg-white lg:hidden">
          <nav
            className="container-shell flex h-full flex-col py-8"
            aria-label="Mobile navigation"
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
              href={contactHref.talkToExpert}
              target="_blank"
              rel="noreferrer"
              data-event="whatsapp_click"
              className="button-primary mt-8"
            >
              <MessageCircle size={18} /> Talk to an Expert
              <ArrowUpRight size={17} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
