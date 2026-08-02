import { projects } from "@/content";
import { Section } from "@/shared/ui/Section";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { SelectedWorkReveal } from "./SelectedWorkReveal";

export function SelectedWork() {
  return (
    <Section id="selected-work" ariaLabel="Selected Work">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Selected Work
        </h2>
        <SelectedWorkReveal>
          <ul className="mt-10 list-none space-y-(--space-case-study-y) p-0">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCaseStudy project={project} />
              </li>
            ))}
          </ul>
        </SelectedWorkReveal>
      </div>
    </Section>
  );
}
