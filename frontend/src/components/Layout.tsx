import { Outlet } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { company, contactHref } from "../config/company";
import { useSeo } from "../hooks/useSeo";
export function Layout() {
  useSeo();
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3"
        href="#main"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {company.whatsapp && (
        <a
          href={contactHref.whatsapp}
          target="_blank"
          rel="noreferrer"
          data-event="whatsapp_click"
          aria-label="Chat with Avnture Technologies on WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#18a957] text-white shadow-lg transition hover:-translate-y-1"
        >
          <MessageCircle />
        </a>
      )}
    </>
  );
}
