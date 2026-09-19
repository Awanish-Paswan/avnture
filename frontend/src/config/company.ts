export const company = {
  name: "Avnture Technologies",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://avnture.example",
  email: import.meta.env.VITE_PUBLIC_EMAIL || "",
  phone: import.meta.env.VITE_PHONE_NUMBER || "",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "918114071968",
  serviceArea: "India",
};

export const contactHref = {
  email: company.email ? `mailto:${company.email}` : "/contact",
  phone: company.phone
    ? `tel:${company.phone.replace(/[^+\d]/g, "")}`
    : "/contact",
  whatsapp: company.whatsapp
    ? `https://wa.me/${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Avnture Technologies, I'm interested in discussing a project.")}`
    : "/contact",
  talkToExpert: company.whatsapp
    ? `https://wa.me/${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Avnture Technologies, I'd like to talk to an expert about my project.")}`
    : "/contact",
};
