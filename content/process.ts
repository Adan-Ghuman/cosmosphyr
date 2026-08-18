import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    id: "curiosity",
    phase: "01",
    label: "Curiosity",
    tagline: "Constraint Discovery",
    description: "Clarify the real constraints, scope, and architectural requirements behind the request.",
    deliverables: ["Root-Cause Analysis", "Boundary Mapping", "Core Requirements"],
  },
  {
    id: "exploration",
    phase: "02",
    label: "Exploration",
    tagline: "Architecture & Design Doc",
    description: "Author comprehensive design documents and architectural blueprints before any code is written.",
    deliverables: ["System Design Doc", "Architecture Blueprint", "Threat & Risk Spec"],
  },
  {
    id: "engineering",
    phase: "03",
    label: "Engineering",
    tagline: "Spec-Driven Execution",
    description: "Implement strictly against approved design documents with hardened interfaces and verified contracts.",
    deliverables: ["Document-Driven Code", "Interface Contracts", "Automated Test Suites"],
  },
  {
    id: "impact",
    phase: "04",
    label: "Impact",
    tagline: "Production Hardening",
    description: "Ship outcomes that hold up in production environments with continuous verification, not demos alone.",
    deliverables: ["Zero-Downtime Releases", "SLA Verification", "Compounding Value"],
  },
];


