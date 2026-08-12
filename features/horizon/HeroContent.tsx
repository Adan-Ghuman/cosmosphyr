import { siteCopy } from "@/content";

export function HeroContent() {
  const { headline, subhead, ctaLabel, ctaHref } = siteCopy.hero;

  return (
    <div className="flex max-w-xl flex-col gap-(--space-hero-stack-gap)">
      <h1
        data-hero-reveal
        className="font-display text-4xl leading-tight tracking-tight text-text-primary md:text-6xl"
      >
        {headline}
      </h1>
      <span
        data-hero-reveal
        aria-hidden="true"
        className="block h-(--size-hero-divider-height) w-(--size-hero-divider-width) bg-accent-ice"
      />
      <p data-hero-reveal className="text-lg text-text-primary/80">
        {subhead}
      </p>
      <a data-hero-reveal href={ctaHref} className="cta-button">
        {ctaLabel}
      </a>
    </div>
  );
}
