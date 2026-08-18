"use client";

import BlurText from "@/components/BlurText";
import Orb from "@/components/Orb";
import ParticleText from "@/components/ParticleText";
import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { FinalCtaReveal } from "./FinalCtaReveal";

export function FinalCta() {
  const { eyebrow, headline, rotatingPhrases, subtext, ctaLabel, ctaHref } = siteCopy.finalCta;

  const phrases = rotatingPhrases && rotatingPhrases.length > 0 ? rotatingPhrases : [headline];

  return (
    <Section
      id="next-horizon"
      ariaLabel="The Next Horizon"
      className="relative min-h-[540px] md:min-h-[640px] overflow-hidden flex items-center justify-center py-16 md:py-24"
    >
      {/* Background Interactive WebGL Orb - Centered Celestial Halo with Token-Aligned Colors */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative size-[420px] sm:size-[520px] md:size-[620px] pointer-events-auto opacity-90 md:opacity-100 transition-opacity duration-700">
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

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 flex flex-col items-center text-center">
        <FinalCtaReveal>
          <div className="flex flex-col items-center gap-5 md:gap-6">
            {/* Telemetry Section Eyebrow */}
            {eyebrow && (
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-accent-ice/35 bg-surface-dark/80 text-accent-ice text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(142,191,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-ice animate-ping opacity-75" />
                <span>{eyebrow}</span>
              </div>
            )}

            {/* Semantic Heading for SEO / Screen Readers */}
            <h2 className="sr-only">{headline}</h2>

            {/* Cosmosphyr Logo Emblem <-> Particle Text Stage */}
            <div className="w-full max-w-2xl h-[120px] sm:h-[140px] md:h-[160px] flex items-center justify-center my-1">
              <ParticleText
                texts={phrases}
                particleSize={1.8}
                color="#f8fafc"
                highlightColor="#8ebfd4"
                pointerRepel={45}
                repelRadius={100}
                idleDrift={0.45}
                fontSize="clamp(1.2rem, 2.8vw, 2.05rem)"
                fontWeight={500}
                letterSpacing="0.06em"
                glow
              />
            </div>

            {/* Subtext description with React Bits BlurText */}
            <div className="max-w-lg">
              <BlurText
                text={subtext}
                delay={40}
                animateBy="words"
                direction="bottom"
                className="text-sm sm:text-base md:text-lg text-text-primary/80 leading-relaxed"
              />
            </div>

            {/* Cosmic Call to Action */}
            <div className="pt-2">
              <a
                href={ctaHref}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-medium text-text-primary bg-accent-ice/10 border border-accent-ice/40 backdrop-blur-xl shadow-[0_0_25px_rgba(142,191,212,0.2)] hover:bg-accent-ice/20 hover:border-accent-ice/75 hover:shadow-[0_0_45px_rgba(142,191,212,0.45)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{ctaLabel}</span>
                <span className="flex items-center justify-center size-6 rounded-full bg-accent-ice/15 group-hover:bg-accent-ice/30 transition-colors duration-300">
                  <svg
                    className="w-3.5 h-3.5 text-accent-ice transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </FinalCtaReveal>
      </div>
    </Section>
  );
}
