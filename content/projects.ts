import type { Project } from "./types";

// Outcomes/demo URLs are draft — do not invent metrics; keep NDA entries anonymized.
export const projects: Project[] = [
  {
    id: "dreamspace",
    title: "DreamSpace",
    problem:
      "Interior design decisions are hard to visualize before purchase, and multi-vendor commerce adds friction.",
    solution:
      "An AR-enhanced interior design platform paired with a multi-vendor e-commerce mobile app.",
    technology: ["Mobile", "AR", "E-commerce"],
    outcome: "DRAFT — verify public outcome before launch.",
    isNDA: false,
    demoUrl: "https://example.com/dreamspace",
  },
  {
    id: "pingly",
    title: "Pingly",
    problem:
      "Teams need dependable real-time messaging across platforms without fragile sync.",
    solution: "A real-time cross-platform chat application.",
    technology: ["Realtime", "Mobile", "Web"],
    outcome: "DRAFT — verify public outcome before launch.",
    isNDA: false,
    demoUrl: "https://example.com/pingly",
  },
  {
    id: "echomind",
    title: "EchoMind",
    problem:
      "Organizations need conversational access to their own knowledge without hallucinated answers.",
    solution: "A RAG-powered AI conversation and knowledge assistant.",
    technology: ["AI", "RAG", "Web"],
    outcome: "DRAFT — verify public outcome before launch.",
    isNDA: false,
    demoUrl: "https://example.com/echomind",
  },
  {
    id: "aura-arq",
    title: "Aura & Arq",
    problem:
      "An e-commerce brand needed storefront and admin operations with multi-language support.",
    solution:
      "An e-commerce website with an admin dashboard and multi-language support.",
    technology: ["Web", "Admin", "i18n"],
    outcome: "DRAFT — verify public outcome before launch.",
    isNDA: false,
    demoUrl: "https://example.com/aura-arq",
  },
  {
    id: "workforce-tracking",
    title: "Workforce / field tracking system",
    problem:
      "A commercial equipment company needed visibility into technician location and field activity.",
    solution:
      "GPS-based technician tracking for field teams with a manager and admin web dashboard.",
    technology: ["Mobile", "GPS", "Web dashboard"],
    outcome: "DRAFT — verify anonymized outcome before launch.",
    isNDA: true,
  },
  {
    id: "order-operations",
    title: "Order & operations management system",
    problem:
      "A machinery manufacturing business needed clearer inventory and order operations.",
    solution:
      "An inventory and order management platform tailored to manufacturing workflows.",
    technology: ["Web", "Operations", "Inventory"],
    outcome: "DRAFT — verify anonymized outcome before launch.",
    isNDA: true,
  },
  {
    id: "factory-management",
    title: "Factory management system",
    problem:
      "A manufacturing organization required confidential operations tooling with limited public disclosure.",
    solution:
      "A manufacturing operations platform delivered under NDA with minimal disclosable detail.",
    technology: ["Web", "Operations"],
    outcome: "DRAFT — verify anonymized outcome before launch.",
    isNDA: true,
  },
];
