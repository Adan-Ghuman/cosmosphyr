"use client";

import { useHorizon } from "@/shared/motion";
import { useRef } from "react";
import { HeroContent } from "./HeroContent";
import { HorizonFallbackField } from "./HorizonFallbackField";
import { HorizonScene } from "./HorizonScene";
import { MobileHorizonScene } from "./MobileHorizonScene";
import { ScrollCue } from "./ScrollCue";
import { useIgnitionAbsent } from "./useIgnitionAbsent";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const ignitionAbsent = useIgnitionAbsent();

  useHorizon(streakRef, {
    enabled: ignitionAbsent,
    trigger: sectionRef,
    start: "top 75%",
    end: "bottom 45%",
  });

  return (
    <section
      ref={sectionRef}
      id="horizon"
      aria-label="The Horizon"
      className="relative flex flex-col md:min-h-(--size-hero-min-block)"
    >
      <div className="relative z-10 order-1 px-6 pt-(--space-hero-content-top-mobile) pb-8 md:absolute md:inset-x-0 md:top-auto md:bottom-(--space-hero-content-bottom-desktop) md:order-0 md:mx-auto md:w-full md:max-w-5xl md:px-6 md:pt-0 md:pb-0">
        <HeroContent />
      </div>

      <div className="relative order-2 h-(--size-hero-band-mobile) w-full md:absolute md:inset-0 md:order-0 md:h-auto">
        <MobileHorizonScene className="h-full">
          <HorizonScene className="h-full">
            <HorizonFallbackField streakRef={streakRef} />
          </HorizonScene>
        </MobileHorizonScene>
      </div>

      <div className="relative z-10 order-3 flex justify-center px-6 py-6 md:absolute md:inset-x-0 md:bottom-4 md:order-0 md:py-0">
        <ScrollCue />
      </div>
    </section>
  );
}
