"use client";

import React from "react";
import { Section } from "@/shared/ui/Section";
import { StarBorder } from "@/shared/ui/StarBorder";
import DecryptedText from "@/components/DecryptedText";
import LetterGlitch from "@/components/LetterGlitch";
import { ProcessJourney } from "./ProcessJourney";

export function Process() {
  return (
    <Section
      id="process"
      ariaLabel="How We Think"
      className="relative px-6 !py-8 sm:!py-12 md:!py-14"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <StarBorder
          color="#8ebfd4"
          speed="8s"
          thickness={1.5}
          className="w-full rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          innerClassName="relative overflow-hidden rounded-3xl border border-(--color-nav-border) bg-(--color-nav-surface) p-6 sm:p-8 md:p-10 lg:p-11 min-h-[560px] md:min-h-[590px] flex flex-col justify-between backdrop-blur-xl"
        >
          {/* React Bits LetterGlitch Atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-25"
          >
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth
              speed={10}
              colors={["#2b4539", "#61dca3", "#61b3dc"]}
              showCenterVignette
              showOuterVignette={false}
            />
          </div>

          <div className="relative z-10">
            {/* Section Header: Compact Header with Telemetry Eyebrow & Headline */}
            <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-ice/30 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-accent-ice uppercase shadow-[0_0_8px_rgba(142,191,212,0.15)] backdrop-blur-md">
                  <span className="size-1 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-pulse" />
                  <DecryptedText
                    text="07 // Process"
                    animateOn="view"
                    speed={35}
                    maxIterations={10}
                    characters="0123456789ABCDEF!@#$%"
                    className="font-mono text-[10px] tracking-widest text-accent-ice uppercase"
                  />
                </div>
                <h2 className="font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                  How We Think
                </h2>
              </div>
            </div>

            {/* 4-Stage Interactive Process Pipeline */}
            <div className="mt-6 sm:mt-8">
              <ProcessJourney />
            </div>
          </div>
        </StarBorder>
      </div>
    </Section>
  );
}
