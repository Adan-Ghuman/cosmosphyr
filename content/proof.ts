import { projects } from "./projects";
import type { ProofItem } from "./types";

// Traceable to projects only — do not invent metrics or testimonials.
export const proofItems: ProofItem[] = [
  {
    id: "proof-public-shipped",
    label: "Public products shipped",
    value: "4 live case studies",
    type: "delivery",
    sourceProjectId: projects[0].id,
  },
  {
    id: "proof-ai",
    label: "Applied AI delivery",
    value: "RAG-powered knowledge assistant (EchoMind)",
    type: "capability",
    sourceProjectId: "echomind",
  },
  {
    id: "proof-ops",
    label: "Operations systems",
    value: "Field, order, and factory platforms under NDA",
    type: "fact",
    sourceProjectId: "workforce-tracking",
  },
];
