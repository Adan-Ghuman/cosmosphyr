import { siteCopy } from "@/content";

export function HeroContent() {
  const { headline, subhead, ctaLabel, ctaHref } = siteCopy.hero;

  return (
    <div className="flex max-w-xl flex-col gap-(--space-hero-stack-gap)">
      <h1 className="font-display text-4xl leading-tight tracking-tight text-text-primary md:text-6xl">
        {headline}
      </h1>
      <span
        aria-hidden="true"
        className="block h-(--size-hero-divider-height) w-(--size-hero-divider-width) bg-accent-ice"
      />
      <p className="text-lg text-text-primary/80">{subhead}</p>
      <a
        href={ctaHref}
        className="inline-flex min-h-11 w-fit items-center rounded-(--radius-cta) border border-(--color-cta-border) px-5 text-accent-ice shadow-(--shadow-cta-glow) underline-offset-4 transition-colors hover:bg-accent-ice/10 hover:underline"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
