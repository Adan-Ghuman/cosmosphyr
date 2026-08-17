"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { siteCopy } from "@/content";
import { Section } from "@/shared/ui/Section";
import { StarBorder } from "@/shared/ui/StarBorder";
import DotField from "@/components/DotField";
import { BrandStoryThreads } from "./BrandStoryThreads";
import { CosmosPanel } from "./CosmosPanel";
import { SphyrPanel } from "./SphyrPanel";

export function BrandStory() {
  const { wordmark, subtext, story } = siteCopy.brandStory;
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <Section id="cosmosphyr" ariaLabel="Cosmosphyr" className="relative px-6">
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        {/* Base Section Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="group/card cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-ice/50 rounded-3xl"
        >
          <StarBorder
            color="#8ebfd4"
            speed="7s"
            thickness={1.5}
            className="w-full rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(142,191,212,0.2)] hover:border-accent-ice/30"
            innerClassName="relative overflow-hidden rounded-3xl border border-(--color-nav-border) bg-(--color-nav-surface) px-6 py-12 md:px-14 md:py-16 backdrop-blur-xl"
          >
            {/* Reactive WebGL Threads */}
            <BrandStoryThreads />

            {/* Header Layout */}
            <div className="relative z-10 grid grid-cols-1 items-center gap-(--space-brand-gap) md:grid-cols-[1fr_minmax(0,1.4fr)_1fr] md:gap-(--space-brand-gap-desktop)">
              <div className="order-1 flex justify-center md:order-1 md:justify-end">
                <CosmosPanel />
              </div>

              <div className="order-3 flex flex-col items-center text-center md:order-2">
                <h2 className="font-display text-3xl tracking-tight text-text-primary transition-colors duration-300 group-hover/card:text-accent-ice md:text-5xl">
                  {wordmark}
                </h2>
                <p className="mt-3 max-w-md text-base text-text-primary/80 md:mt-4 md:text-lg">
                  {subtext}
                </p>
              </div>

              <div className="order-2 flex justify-center md:order-3 md:justify-start">
                <SphyrPanel />
              </div>
            </div>

            {/* Interactive Click / Tap Pill Cue */}
            <div className="relative z-10 mt-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-ice/30 bg-background/70 px-4 py-1.5 text-xs font-mono tracking-wider uppercase text-accent-ice shadow-[0_0_12px_rgba(142,191,212,0.15)] backdrop-blur-md transition-all duration-300 group-hover/card:border-accent-ice group-hover/card:bg-background/90 group-hover/card:scale-105">
                <span className="inline-block size-1.5 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-pulse" />
                <span className="hidden sm:inline">Click to explore our philosophy</span>
                <span className="inline sm:hidden">Tap to explore our philosophy</span>
              </span>
            </div>
          </StarBorder>
        </div>
      </div>

      {/* Fluid Spring Modal Dialog with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="story-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Brand Philosophy Story"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Backdrop Blur (Click to Dismiss) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
            />

            {/* Expanded Modal Card with 100% Theme Consistency */}
            <motion.div
              key="story-modal-card"
              initial={{ opacity: 0, scale: 0.88, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
                mass: 0.9,
              }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
            >
              <StarBorder
                color="#8ebfd4"
                speed="6s"
                thickness={1.5}
                className="w-full rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.9)]"
                innerClassName="relative overflow-hidden rounded-3xl border border-(--color-nav-border) bg-background/95 p-6 md:p-10 backdrop-blur-2xl"
              >
                {/* React Bits DotField Grid Covering 100% of Modal Canvas */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
                >
                  <DotField
                    dotRadius={1.5}
                    dotSpacing={14}
                    bulgeStrength={67}
                    glowRadius={160}
                    sparkle={true}
                    waveAmplitude={0.8}
                    cursorRadius={450}
                    cursorForce={0.1}
                    bulgeOnly={true}
                    gradientFrom="rgba(142, 191, 212, 0.45)"
                    gradientTo="rgba(174, 190, 210, 0.2)"
                    glowColor="var(--color-background)"
                  />
                </div>

                {/* Starlight Ambient Glow Mask */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(142,191,212,0.18),transparent_70%)]" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full border border-(--color-nav-border) bg-background/80 text-text-primary/90 backdrop-blur-md transition-all hover:border-accent-ice hover:bg-accent-ice/20 hover:text-accent-ice hover:scale-105 cursor-pointer shadow-lg"
                  aria-label="Close story modal"
                >
                  ✕
                </button>

                {/* Modal Content */}
                <div className="relative z-10">
                  {/* Top Wordmark & Subtext */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.3 }}
                    className="text-center pr-8 pl-8 md:px-0"
                  >
                    <span className="font-mono text-xs tracking-widest text-accent-ice uppercase">
                      Brand Philosophy
                    </span>
                    <h2 className="mt-2 font-display text-3xl tracking-tight text-text-primary md:text-4xl">
                      {wordmark}
                    </h2>
                    <p className="mt-1 text-sm text-accent-ice md:text-base">
                      {subtext}
                    </p>
                  </motion.div>

                  {/* 2-Column Duality Section Cards with StarBorder (Same Wrapper as Navbar) */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                    className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                  >
                    {/* Cosmos Card (StarBorder Wrapper) */}
                    <StarBorder
                      color="#8ebfd4"
                      speed="6s"
                      thickness={1}
                      className="w-full rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                      innerClassName="rounded-2xl border border-(--color-nav-border) bg-(--color-nav-surface) p-5 md:p-6 backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-widest text-accent-ice uppercase">
                          Origin 01 // Vision
                        </span>
                        <span className="size-2 rounded-full bg-accent-ice shadow-[0_0_8px_#8ebfd4]" />
                      </div>
                      <h3 className="mt-3 font-display text-xl tracking-tight text-text-primary md:text-2xl">
                        COSMOS
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-primary/80 md:text-sm">
                        {story?.cosmosDescription}
                      </p>
                    </StarBorder>

                    {/* Sphyr Card (StarBorder Wrapper) */}
                    <StarBorder
                      color="#8ebfd4"
                      speed="6s"
                      thickness={1}
                      className="w-full rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                      innerClassName="rounded-2xl border border-(--color-nav-border) bg-(--color-nav-surface) p-5 md:p-6 backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-widest text-accent-ice uppercase">
                          Origin 02 // Execution
                        </span>
                        <span className="size-2 rounded-full bg-accent-ice shadow-[0_0_8px_#8ebfd4]" />
                      </div>
                      <h3 className="mt-3 font-display text-xl tracking-tight text-text-primary md:text-2xl">
                        SPHYR
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-primary/80 md:text-sm">
                        {story?.sphyrDescription}
                      </p>
                    </StarBorder>
                  </motion.div>

                  {/* Central Manifesto Card (StarBorder Wrapper) */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                    className="mt-5"
                  >
                    <StarBorder
                      color="#8ebfd4"
                      speed="7s"
                      thickness={1}
                      className="w-full rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                      innerClassName="rounded-2xl border border-(--color-nav-border) bg-(--color-nav-surface) p-5 text-center md:p-7 backdrop-blur-md"
                    >
                      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-primary/90 md:text-base">
                        {story?.narrative}
                      </p>
                      <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-accent-ice/40" />
                        <span className="font-mono text-[11px] tracking-wider text-accent-ice uppercase">
                          {story?.tagline}
                        </span>
                        <span className="h-px w-8 bg-accent-ice/40" />
                      </div>
                    </StarBorder>
                  </motion.div>
                </div>
              </StarBorder>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
