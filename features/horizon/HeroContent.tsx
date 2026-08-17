"use client";

import RotatingText from "@/components/RotatingText";
import { siteCopy } from "@/content";

export function HeroContent() {
  const { headline, subhead, ctaLabel, ctaHref } = siteCopy.hero;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center gap-(--space-hero-stack-gap)">
      <h1
        data-hero-reveal
        className="flex flex-col items-center font-display text-4xl leading-tight tracking-tight text-text-primary md:text-6xl"
      >
        <span>{headline}</span>
        <span className="mt-2 flex items-center justify-center text-2xl font-normal text-accent-ice md:text-3xl">
          <RotatingText
            texts={[
              "Engineering Serious AI",
              "Architecting Cloud Systems",
              "Crafting High-Scale Web & Mobile",
              "Moving Ideas to Production",
            ]}
            mainClassName="inline-flex justify-center text-center text-accent-ice"
            splitLevelClassName="inline-flex"
            elementLevelClassName="text-accent-ice"
            rotationInterval={3400}
            staggerDuration={0.015}
          />
        </span>
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

