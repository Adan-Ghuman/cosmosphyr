"use client";

import React from "react";
import type { ProcessStep as ProcessStepData } from "@/content";
import { SpotlightCard } from "@/components/SpotlightCard";
import { getProcessGlyph } from "./ProcessGlyphs";

type ProcessStepProps = {
  step: ProcessStepData;
  index: number;
  isActive?: boolean;
};

export function ProcessStep({ step, index, isActive = false }: ProcessStepProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(142, 191, 212, 0.22)"
      className={`group relative flex h-full min-h-[340px] sm:min-h-[370px] lg:min-h-[410px] flex-col justify-between rounded-2xl border bg-surface-card/40 p-5 sm:p-6 lg:p-6 xl:p-7 backdrop-blur-md transition-all duration-300 ${
        isActive
          ? "border-accent-ice/60 shadow-[0_0_28px_rgba(142,191,212,0.15)] bg-surface-card/70"
          : "border-surface-border/70 hover:border-accent-ice/40 hover:bg-surface-card/60"
      }`}
    >
      {/* Top Header: Phase Badge & Holographic Glyph */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-surface-border/80 bg-surface-elevated/80 font-mono text-xs font-bold text-accent-ice shadow-inner group-hover:border-accent-ice/50 group-hover:shadow-[0_0_10px_rgba(142,191,212,0.2)]">
              {step.phase || `0${index + 1}`}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-text-primary/50 uppercase">
              PHASE
            </span>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border/60 bg-surface-base/90 p-2 text-accent-ice transition-transform duration-300 group-hover:scale-105 group-hover:border-accent-ice/50 group-hover:text-accent-ice">
            {getProcessGlyph(step.id, "w-full h-full text-accent-ice")}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mt-5">
          {step.tagline && (
            <p className="font-mono text-xs tracking-wider text-accent-ice/85 uppercase">
              {step.tagline}
            </p>
          )}
          <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent-ice sm:text-2xl">
            {step.label}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-primary/80">
            {step.description}
          </p>
        </div>
      </div>

      {/* Deliverable Matrix Chips */}
      {step.deliverables && step.deliverables.length > 0 && (
        <div className="mt-6 border-t border-surface-border/50 pt-4">
          <div className="mb-2 font-mono text-[10px] tracking-wider text-text-primary/45 uppercase">
            Deliverables
          </div>
          <ul className="flex flex-wrap gap-1.5 p-0 list-none">
            {step.deliverables.map((item, dIdx) => (
              <li
                key={dIdx}
                className="rounded-md border border-surface-border/60 bg-surface-base/70 px-2 py-0.5 font-mono text-[10px] text-text-primary/85 transition-colors group-hover:border-accent-ice/35 group-hover:text-text-primary sm:text-[11px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SpotlightCard>
  );
}
