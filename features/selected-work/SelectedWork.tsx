import { projects, siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { Slider, SliderSlide, SliderTrack } from "@/shared/ui/slider";
import { SelectedWorkField } from "./SelectedWorkField";
import { SelectedWorkReveal } from "./SelectedWorkReveal";
import { WorkCard } from "./WorkCard";

export function SelectedWork() {
  const { eyebrow, headline, intro } = siteCopy.selectedWork;

  return (
    <Section id="selected-work" ariaLabel="Selected Work">
      <SelectedWorkField />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SelectedWorkReveal>
          <p className="text-sm tracking-wide text-accent-ice uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-text-primary/80 md:text-lg">
            {intro}
          </p>
        </SelectedWorkReveal>

        <div className="mt-10">
          <Slider count={projects.length} label="Selected work">
            <SliderTrack>
              {projects.map((project, index) => (
                <SliderSlide key={project.id} label={project.title}>
                  <WorkCard project={project} index={index} />
                </SliderSlide>
              ))}
            </SliderTrack>
          </Slider>
        </div>
      </div>
    </Section>
  );
}
