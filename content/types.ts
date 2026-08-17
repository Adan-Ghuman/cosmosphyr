export type Project = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  technology: string[];
  outcome: string;
  isNDA: boolean;
  demoUrl?: string;
};

export type ProofItem = {
  id: string;
  label: string;
  value: string;
  type: "fact" | "capability" | "delivery";
  sourceProjectId: string;
};

export type CapabilityIcon = "ai" | "software" | "web-mobile" | "cloud";

export type Capability = {
  id: string;
  icon: CapabilityIcon;
  title:
    | "AI & Intelligent Systems"
    | "Software Engineering"
    | "Web & Mobile"
    | "Cloud & Automation";
  description: string;
};

export type ProcessStep = {
  id: string;
  label: "Curiosity" | "Exploration" | "Engineering" | "Impact";
  description: string;
};

export type SiteCopy = {
  hero: {
    headline: string;
    subhead: string;
    ctaLabel: string;
    ctaHref: string;
  };
  brandStory: {
    cosmos: string;
    sphyr: string;
    wordmark: string;
    subtext: string;
    story?: {
      cosmosDescription: string;
      sphyrDescription: string;
      narrative: string;
      tagline: string;
    };
  };

  finalCta: {
    headline: string;
    subtext: string;
    ctaLabel: string;
    ctaHref: string;
  };
  contact: {
    heading: string;
    intro: string;
    submitLabel: string;
    deliveryPendingHelper: string;
  };
  selectedWork: {
    eyebrow: string;
    headline: string;
    intro: string;
    demoLabel: string;
  };
  isDraft: boolean;
};

export type ProjectTypeOption =
  | "AI & Intelligent Systems"
  | "Software Engineering"
  | "Web & Mobile"
  | "Cloud & Automation"
  | "Other";

export const projectTypeOptions: ProjectTypeOption[] = [
  "AI & Intelligent Systems",
  "Software Engineering",
  "Web & Mobile",
  "Cloud & Automation",
  "Other",
];