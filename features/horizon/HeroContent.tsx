import Image from "next/image";
import { siteCopy } from "@/content";

export function HeroContent() {
  const { headline, subhead, ctaLabel, ctaHref } = siteCopy.hero;

  return (
    <div className="flex max-w-xl flex-col gap-5 md:gap-6">
      <div className="relative h-16 w-16 md:h-20 md:w-20">
        <Image
          src="/cosmosphyr-mark.png"
          alt="Cosmosphyr mark"
          fill
          sizes="80px"
          className="object-contain"
          priority
        />
      </div>
      <h1 className="font-display text-4xl leading-tight tracking-tight text-text-primary md:text-6xl">
        {headline}
      </h1>
      <p className="text-lg text-text-primary/80">{subhead}</p>
      <a
        href={ctaHref}
        className="inline-flex min-h-11 w-fit items-center text-accent-ice underline-offset-4 hover:underline"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
