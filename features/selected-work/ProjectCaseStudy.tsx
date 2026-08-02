import type { ReactNode } from "react";
import type { Project } from "@/content";
import { MetaLabel } from "@/shared/ui/MetaLabel";

type ProjectCaseStudyProps = {
  project: Project;
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <MetaLabel>{label}</MetaLabel>
      <div className="mt-1 text-text-primary/80">{children}</div>
    </div>
  );
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const showDemo = !project.isNDA && Boolean(project.demoUrl);

  return (
    <article className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-xl tracking-tight md:text-2xl">
          {project.title}
        </h3>
        {project.isNDA ? (
          <p className="text-sm text-accent-ice">NDA — anonymized</p>
        ) : null}
      </div>

      <Field label="Problem">
        <p>{project.problem}</p>
      </Field>

      <Field label="Solution">
        <p>{project.solution}</p>
      </Field>

      <Field label="Technology">
        <ul className="flex list-none flex-wrap gap-x-3 gap-y-1 p-0">
          {project.technology.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Field>

      <Field label="Outcome">
        <p>{project.outcome}</p>
      </Field>

      {showDemo && project.demoUrl ? (
        <a
          href={project.demoUrl}
          className="inline-flex w-fit text-sm text-accent-ice underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Live demo: {project.title}
        </a>
      ) : null}
    </article>
  );
}
