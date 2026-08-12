"use client";

import type { Project } from "@/content";
import { MetaLabel } from "@/shared/ui/MetaLabel";
import { WorkCardArt } from "./WorkCardArt";

type WorkCardProps = {
  project: Project;
  index: number;
};

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function WorkCard({ project, index }: WorkCardProps) {
  return (
    <article className="work-card flex h-full min-h-(--size-work-card-min) flex-col p-5">
      <p className="font-display text-sm tracking-wide text-accent-ice">
        {padIndex(index)}
      </p>
      <MetaLabel className="mt-3">{project.technology[0] ?? "Work"}</MetaLabel>
      <h3 className="mt-3 font-display text-xl tracking-tight text-text-primary md:text-2xl">
        {project.title}
      </h3>
      {project.isNDA ? (
        <p className="mt-2 text-sm text-accent-ice">NDA — anonymized</p>
      ) : null}
      <p className="mt-3 text-sm text-text-primary/80 md:text-base">
        {project.problem}
      </p>
      <WorkCardArt project={project} />
    </article>
  );
}
