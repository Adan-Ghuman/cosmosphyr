"use client";

import BlurText from "@/components/BlurText";
import Orb from "@/components/Orb";
import ParticleText from "@/components/ParticleText";
import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { FinalCtaReveal } from "./FinalCtaReveal";

export function FinalCta() {
  const { eyebrow, headline, rotatingPhrases, subtext } = siteCopy.finalCta;

  const phrases = rotatingPhrases && rotatingPhrases.length > 0 ? rotatingPhrases : [headline];

  return (
    <Section
      id="next-horizon"
      ariaLabel="The Next Horizon"
      className="relative min-h-[520px] md:min-h-[620px] overflow-hidden flex items-center justify-center py-12 md:py-20"
    >
      {/* Background Interactive WebGL Orb - Centered Celestial Halo with Token-Aligned Colors */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative size-[360px] min-[420px]:size-[400px] sm:size-[500px] md:size-[580px] lg:size-[640px] pointer-events-auto opacity-90 md:opacity-100 transition-opacity duration-700">
          <Orb
            hue={0}
            hoverIntensity={0.35}
            rotateOnHover={true}
            forceHoverState={false}
            backgroundColor="#000000"
            color1="#8ebfd4"
            color2="#52a8d8"
            color3="#061326"
            scale={1.1}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Foreground Content - Perfectly Centered Inside Celestial Orb */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 flex flex-col items-center text-center">
        <FinalCtaReveal>
          <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
            {/* Telemetry Section Eyebrow */}
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-accent-ice/35 bg-surface-dark/80 text-accent-ice text-[10px] sm:text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(142,191,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-ice animate-ping opacity-75" />
                <span>{eyebrow}</span>
              </div>
            )}

            {/* Semantic Heading for SEO / Screen Readers */}
            <h2 className="sr-only">{headline}</h2>

            {/* Cosmosphyr Logo Emblem <-> Particle Text Stage */}
            <div className="w-full max-w-[300px] min-[420px]:max-w-[340px] sm:max-w-[460px] md:max-w-[540px] h-[85px] sm:h-[110px] md:h-[130px] flex items-center justify-center my-0.5">
              <ParticleText
                texts={phrases}
                particleSize={1.8}
                color="#f8fafc"
                highlightColor="#8ebfd4"
                pointerRepel={45}
                repelRadius={100}
                idleDrift={0.45}
                fontSize="clamp(1.1rem, 2.3vw, 1.85rem)"
                fontWeight={500}
                letterSpacing="0.06em"
                glow
              />
            </div>

            {/* Subtext description with React Bits BlurText - Constrained to Lower Circle Chord */}
            <div className="max-w-[240px] min-[420px]:max-w-[270px] sm:max-w-[340px] md:max-w-[390px]">
              <BlurText
                text={subtext}
                delay={35}
                animateBy="words"
                direction="bottom"
                className="text-xs sm:text-sm md:text-[15px] text-text-primary/75 leading-relaxed"
              />
            </div>
          </div>
        </FinalCtaReveal>
      </div>
    </Section>
  );
}
