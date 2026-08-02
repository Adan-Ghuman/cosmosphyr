import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { FinalCtaReveal } from "./FinalCtaReveal";

export function FinalCta() {
  const { headline, subtext, ctaLabel, ctaHref } = siteCopy.finalCta;

  return (
    <Section id="next-horizon" ariaLabel="The Next Horizon">
      <div className="mx-auto max-w-5xl px-6">
        <FinalCtaReveal>
          <div className="flex max-w-2xl flex-col gap-6">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              {headline}
            </h2>
            <p className="text-lg text-text-primary/80">{subtext}</p>
            <a
              href={ctaHref}
              className="inline-flex min-h-11 w-fit items-center text-accent-ice underline-offset-4 hover:underline"
            >
              {ctaLabel}
            </a>
          </div>
        </FinalCtaReveal>
      </div>
    </Section>
  );
}
