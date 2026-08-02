import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    id: "curiosity",
    label: "Curiosity",
    description: "Clarify the real constraint behind the request.",
  },
  {
    id: "exploration",
    label: "Exploration",
    description: "Map options, risks, and the narrowest useful path.",
  },
  {
    id: "engineering",
    label: "Engineering",
    description: "Build durable systems with clear interfaces and ownership.",
  },
  {
    id: "impact",
    label: "Impact",
    description: "Ship outcomes that hold up in production, not demos alone.",
  },
];
