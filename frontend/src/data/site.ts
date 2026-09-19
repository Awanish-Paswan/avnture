import {
  Code2,
  Globe2,
  LayoutDashboard,
  Palette,
  PanelsTopLeft,
  Smartphone,
} from "lucide-react";

export const primaryServices = [
  {
    number: "01",
    slug: "website-development",
    title: "Website Development",
    short:
      "Fast, responsive and SEO-conscious websites built around business goals.",
    icon: Globe2,
    bullets: [
      "Corporate and business websites",
      "E-commerce and service websites",
      "Landing pages and custom builds",
    ],
  },
  {
    number: "02",
    slug: "web-application-development",
    title: "Web Application Development",
    short:
      "Purpose-built web platforms that simplify customer and internal workflows.",
    icon: PanelsTopLeft,
    bullets: [
      "Admin dashboards and portals",
      "Booking and management platforms",
      "Marketplaces and business applications",
    ],
  },
  {
    number: "03",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short:
      "Modern mobile products designed around real users and operational needs.",
    icon: Smartphone,
    bullets: [
      "Product strategy and UX",
      "API-connected applications",
      "Launch-ready mobile experiences",
    ],
  },
  {
    number: "04",
    slug: "custom-software-development",
    title: "Custom Software Development",
    short:
      "Maintainable software designed for the way your business actually works.",
    icon: Code2,
    bullets: [
      "Workflow systems",
      "Operational software",
      "Secure integrations and APIs",
    ],
  },
];

export const secondaryServices = [
  {
    number: "05",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short: "Clear user journeys and responsive product interfaces.",
    icon: LayoutDashboard,
  },
  {
    number: "06",
    slug: "creative-design",
    title: "Creative & Design Services",
    short: "Supporting identity, logo, poster and marketing creative work.",
    icon: Palette,
  },
];

export const industries = [
  "Education",
  "Healthcare",
  "Real Estate",
  "Jewellery & Retail",
  "Travel & Hospitality",
  "Construction",
  "Interior Design",
  "Professional Services",
  "E-commerce",
  "Local Businesses",
  "Startups",
];
export const process = [
  [
    "01",
    "Discovery",
    "Understand the business goal, users and technical requirements.",
  ],
  [
    "02",
    "Planning",
    "Define functionality, architecture, technology and execution strategy.",
  ],
  ["03", "UI/UX", "Design responsive interfaces and clear user journeys."],
  [
    "04",
    "Development",
    "Build the frontend, backend, database and integrations.",
  ],
  [
    "05",
    "Testing",
    "Test functionality, responsiveness, security and performance.",
  ],
  ["06", "Launch", "Deploy and configure reliable production services."],
  ["07", "Support", "Maintain, improve and extend the product after launch."],
];

export const technologies = {
  Frontend: [
    "React.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
  ],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["MongoDB", "MongoDB Atlas"],
  Security: ["JWT", "HTTP-only cookies", "Role-based access"],
  "Cloud & tools": [
    "Git",
    "GitHub",
    "Vercel",
    "Render",
    "Cloudinary",
    "Postman",
  ],
};

export const locations = {
  delhi: {
    name: "Delhi",
    context:
      "From established service businesses to fast-moving teams, Delhi organisations need digital products that are clear, dependable and ready to scale.",
    industries: ["Professional services", "Education", "Retail and e-commerce"],
  },
  lucknow: {
    name: "Lucknow",
    context:
      "Lucknow businesses are building stronger digital operations and customer experiences across retail, education, healthcare and professional services.",
    industries: ["Education", "Healthcare", "Local businesses"],
  },
  gorakhpur: {
    name: "Gorakhpur",
    context:
      "Growing businesses and institutions in Gorakhpur can use well-built digital products to reach customers, manage work and support long-term expansion.",
    industries: ["Education", "Healthcare", "Local businesses"],
  },
  noida: {
    name: "Noida",
    context:
      "Noida’s technology, services and startup ecosystem calls for performant websites and software that can evolve with ambitious teams.",
    industries: ["Startups", "Professional services", "Real estate"],
  },
  gurgaon: {
    name: "Gurugram",
    context:
      "Gurugram businesses often need polished customer experiences and internal software that can support demanding, fast-changing operations.",
    industries: ["Startups", "Professional services", "Travel and hospitality"],
  },
} as const;
