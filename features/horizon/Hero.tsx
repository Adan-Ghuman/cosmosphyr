"use client";

import { useHorizon } from "@/shared/motion";
import { useRef } from "react";
import { HeroContent } from "./HeroContent";
import { HorizonHeroImage } from "./HorizonHeroImage";
import { HorizonScene } from "./HorizonScene";
import { MobileHorizonScene } from "./MobileHorizonScene";
import { ScrollCue } from "./ScrollCue";
import { useIgnitionAbsent } from "./useIgnitionAbsent";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ignitionAbsent = useIgnitionAbsent();

  useHorizon(contentRef, {
    enabled: ignitionAbsent,
    trigger: sectionRef,
    xPercent: -8,
    start: "top 75%",
    end: "bottom 45%",
  });

  return (
    <section
      ref={sectionRef}
      id="horizon"
      aria-label="The Horizon"
      className="relative flex min-h-(--size-hero-min-block) flex-col"
    >
      <div className="absolute inset-0">
        <MobileHorizonScene className="h-full">
          <HorizonScene className="h-full">
            <HorizonHeroImage />
          </HorizonScene>
        </MobileHorizonScene>
        <div className="hero-scrim pointer-events-none absolute inset-0" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-(--space-hero-content-top-mobile) pb-16 md:pt-(--space-hero-content-top-desktop) md:pb-(--space-hero-content-bottom-desktop)"
      >
        <div className="mx-auto w-full max-w-5xl">
          <HeroContent />
        </div>
      </div>

      <div className="relative z-10 flex justify-center px-6 pb-6 md:absolute md:inset-x-0 md:bottom-4 md:pb-0">
        <ScrollCue />
      </div>
    </section>
  );
}
