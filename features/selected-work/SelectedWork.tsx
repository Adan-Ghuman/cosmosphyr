import { projects, siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import AccordionGallery from "@/components/AccordionGallery";
import { SelectedWorkReveal } from "./SelectedWorkReveal";

export function SelectedWork() {
  const { headline } = siteCopy.selectedWork;

  const items = projects.map((project) => ({
    image: `/projects/${project.id}.jpg`,
    label: project.title,
    link: project.isNDA ? undefined : project.demoUrl,
    alt: `${project.title} — ${project.solution}`,
  }));

  return (
    <Section
      id="selected-work"
      ariaLabel="Selected Work"
      className="relative px-6 !py-6 sm:!py-8 md:!py-10"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <SelectedWorkReveal>
          {/* Section Header: Compact Single-Row Flex on Desktop */}
          <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-ice/30 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-accent-ice uppercase shadow-[0_0_8px_rgba(142,191,212,0.15)] backdrop-blur-md">
                <span className="size-1 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-pulse" />
                <span>05 // Selected Work</span>
              </div>
              <h2 className="font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                {headline}
              </h2>
            </div>
          </div>
        </SelectedWorkReveal>

        {/* Interactive React Bits Accordion Gallery */}
        <div className="mt-5 sm:mt-6">
          <AccordionGallery
            items={items}
            defaultIndex={0}
            expandRatio={0.48}
            trigger="hover"
            accentColor="#8ebfd4"
            overlayColor="#030014"
            textColor="#ffffff"
            grayscale={false}
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={6}
            stagger={0.06}
            height={460}
            gap={12}
            radius={20}
            orientation="horizontal"
          />
        </div>
      </div>
    </Section>
  );
}
