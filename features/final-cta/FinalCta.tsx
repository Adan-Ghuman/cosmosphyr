import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { FinalCtaReveal } from "./FinalCtaReveal";
import { MagicRings } from "./MagicRings";

export function FinalCta() {
  const { headline, subtext, ctaLabel, ctaHref } = siteCopy.finalCta;

  return (
    <Section id="next-horizon" ariaLabel="The Next Horizon" className="relative overflow-hidden">
      <MagicRings />
      <div className="relative z-10 mx-auto max-w-5xl px-6">

        <FinalCtaReveal>
          <div className="flex max-w-2xl flex-col gap-6">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              {headline}
            </h2>
            <p className="text-lg text-text-primary/80">{subtext}</p>
            <a href={ctaHref} className="cta-text text-lg">
              {ctaLabel}
            </a>
          </div>
        </FinalCtaReveal>
      </div>
    </Section>
  );
}
