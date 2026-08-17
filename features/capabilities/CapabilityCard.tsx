"use client";

import type { Capability } from "@/content";
import SpotlightCard from "@/components/SpotlightCard";
import { CapabilityGlyph } from "./CapabilityGlyph";

type CapabilityCardProps = {
  capability: Capability;
  index: number;
};

export function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <SpotlightCard
      spotlightColor="rgba(142, 191, 212, 0.15)"
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-(--color-nav-surface)/80 p-4 sm:p-5 md:p-5.5 backdrop-blur-xl transition-all duration-300 hover:border-accent-ice/40 hover:bg-(--color-nav-surface) hover:shadow-[0_4px_24px_rgba(142,191,212,0.1)]"
    >
      <article className="flex h-full flex-col justify-between">
        <div>
          {/* Top Bar: Icon + Title on left, Index on right */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <CapabilityGlyph icon={capability.icon} />
              <h3 className="truncate font-display text-base sm:text-lg md:text-xl font-medium tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent-ice">
                {capability.title}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-text-primary/40 transition-colors duration-200 group-hover:text-accent-ice">
              <span>// {formattedIndex}</span>
              <span className="size-1 rounded-full bg-accent-ice/40 transition-all duration-200 group-hover:bg-accent-ice group-hover:shadow-[0_0_6px_#8ebfd4]" />
            </div>
          </div>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-text-primary/75 line-clamp-2">
            {capability.description}
          </p>
        </div>

        {/* Technical Scope Tags */}
        {capability.tags && capability.tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06] pt-2.5">
            {capability.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] sm:text-[11px] tracking-wide text-text-primary/60 transition-colors duration-200 group-hover:border-accent-ice/20 group-hover:text-text-primary/85"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </SpotlightCard>
  );
}

