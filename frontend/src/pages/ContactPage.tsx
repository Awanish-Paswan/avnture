import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { api } from "../services/api";
import { company, contactHref } from "../config/company";
const services = [
  "Website Development",
  "Web Application",
  "Mobile Application",
  "Custom Software",
  "UI/UX",
  "Creative Design",
  "Other",
];
export function ContactPage() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    try {
      await api.createLead(data);
      form.reset();
      setState("success");
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof Error ? err.message : "Unable to send your enquiry.",
      );
    }
  }
  return (
    <section className="section-pad bg-surface">
      <div className="container-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <span className="eyebrow">Start a project</span>
          <h1 className="heading mt-6">Tell us what you want to build.</h1>
          <p className="copy mt-6">
            Share the goal, the problem and where you are today. We’ll use those
            details to make the first conversation useful.
          </p>
          {company.whatsapp && (
            <a
              data-event="whatsapp_click"
              href={contactHref.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="button-secondary mt-8"
            >
              <MessageCircle size={18} /> WhatsApp us
            </a>
          )}
          <a href="mailto:technologiesavnture@gmail.com" className="button-secondary mt-8">
            <MessageCircle size={18} /> Email us: technologiesavnture@gmail.com
          </a>
        </div>
        <div className="card p-6 sm:p-9">
          {state === "success" ? (
            <div className="grid min-h-[520px] place-items-center text-center">
              <div>
                <CheckCircle2 className="mx-auto text-green-600" size={52} />
                <h2 className="mt-5 text-3xl font-bold">Enquiry received.</h2>
                <p className="mt-3 text-slate-600">
                  Thank you. Avnture Technologies will review your project
                  details and follow up using your preferred contact method.
                </p>
                <button
                  className="button-secondary mt-7"
                  onClick={() => setState("idle")}
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <Input name="name" label="Name" required />
              <Input name="phone" label="Phone number" type="tel" required />
              <Input name="email" label="Email" type="email" required />
              <Input name="company" label="Company / business name" />
              <Select
                name="service"
                label="Service required"
                options={services}
              />
              <Select
                name="budget"
                label="Budget range"
                options={[
                  "Not decided yet",
                  "Under ₹50,000",
                  "₹50,000–₹1,50,000",
                  "₹1,50,000–₹5,00,000",
                  "₹5,00,000+",
                ]}
              />
              <Select
                name="contactPreference"
                label="Preferred contact"
                options={["Phone", "Email", "WhatsApp"]}
              />
              <div className="hidden">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-bold">
                  Project description
                </span>
                <textarea
                  className="min-h-36 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                  name="message"
                  minLength={20}
                  required
                  placeholder="What should the product help your business or users accomplish?"
                />
              </label>
              {state === "error" && (
                <p
                  role="alert"
                  className="sm:col-span-2 text-sm font-semibold text-red-700"
                >
                  {message}
                </p>
              )}
              <button
                disabled={state === "loading"}
                data-event="contact_submit"
                className="button-primary sm:col-span-2 sm:justify-self-start"
                type="submit"
              >
                {state === "loading" ? "Sending…" : "Send Project Enquiry"}{" "}
                <ArrowUpRight size={17} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function Input({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4"
        name={name}
        type={type}
        required={required}
      />
    </label>
  );
}
function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <select
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4"
        name={name}
        required
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}
