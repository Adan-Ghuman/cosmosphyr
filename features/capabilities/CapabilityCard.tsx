"use client";

import type { Capability } from "@/content";
import SpotlightCard from "@/components/SpotlightCard";
import { CapabilityGlyph } from "./CapabilityGlyph";

type CapabilityCardProps = {
  capability: Capability;
};

export function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(142, 191, 212, 0.2)"
      className="group h-full rounded-2xl border border-white/10 bg-(--color-nav-surface) p-6 transition-all duration-300 hover:border-accent-ice/40 hover:shadow-[0_8px_30px_rgba(142,191,212,0.12)] md:p-8 backdrop-blur-md"
    >
      <article className="flex flex-col sm:flex-row sm:items-center gap-(--space-capability-card-gap)">
        <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
          <CapabilityGlyph icon={capability.icon} />
        </div>
        <span
          aria-hidden="true"
          className="relative hidden h-(--size-capability-connector-height) w-(--size-capability-connector) shrink-0 bg-accent-ice/40 group-hover:bg-accent-ice transition-colors duration-300 sm:block"
        >
          <span className="capability-connector-node absolute top-1/2 left-0 size-(--size-capability-node) -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-ice shadow-[0_0_8px_#8ebfd4]" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-xl tracking-tight text-text-primary group-hover:text-accent-ice transition-colors duration-200 md:text-2xl">
            {capability.title}
          </h3>
          <p className="mt-2 text-base text-text-primary/80 md:text-lg">
            {capability.description}
          </p>
        </div>
      </article>
    </SpotlightCard>
  );
}
