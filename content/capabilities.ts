import type { Capability } from "./types";

export const capabilities: Capability[] = [
  {
    id: "ai",
    icon: "ai",
    title: "AI & Intelligent Systems",
    description:
      "Retrieval-augmented assistants, applied ML workflows, and decision systems grounded in real product constraints.",
    tags: ["LLM Agents", "Applied ML", "RAG Workflows"],
  },
  {
    id: "software",
    icon: "software",
    title: "Software Engineering",
    description:
      "Reliable application architecture, APIs, and platforms built for maintainability and scale.",
    tags: ["Distributed APIs", "Architecture", "High Scale"],
  },
  {
    id: "web-mobile",
    icon: "web-mobile",
    title: "Web & Mobile",
    description:
      "Product-grade web and mobile experiences with performance, accessibility, and conversion in mind.",
    tags: ["Next.js / React", "Performance-First", "Fluid UI"],
  },
  {
    id: "cloud",
    icon: "cloud",
    title: "Cloud & Automation",
    description:
      "Cloud infrastructure, automation, and operational tooling that keep systems deployable and observable.",
    tags: ["IaC & CI/CD", "Observability", "Cloud Native"],
  },
];
