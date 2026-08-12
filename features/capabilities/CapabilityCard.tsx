import type { Capability } from "@/content";
import { CapabilityGlyph } from "./CapabilityGlyph";

type CapabilityCardProps = {
  capability: Capability;
};

export function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <article className="flex items-center gap-(--space-capability-card-gap)">
      <CapabilityGlyph icon={capability.icon} />
      <span
        aria-hidden="true"
        className="relative hidden h-(--size-capability-connector-height) w-(--size-capability-connector) shrink-0 bg-accent-ice/70 sm:block"
      >
        <span className="capability-connector-node absolute top-1/2 left-0 size-(--size-capability-node) -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-ice" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-xl tracking-tight text-text-primary md:text-2xl">
          {capability.title}
        </h3>
        <p className="mt-2 text-base text-text-primary/80 md:text-lg">
          {capability.description}
        </p>
      </div>
    </article>
  );
}
