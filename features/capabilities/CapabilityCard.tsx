import type { Capability } from "@/content";
import { OrbitAccent } from "@/shared/ui/OrbitAccent";

type CapabilityCardProps = {
  capability: Capability;
};

export function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <article className="flex flex-col gap-4">
      <OrbitAccent />
      <h3 className="font-display text-xl tracking-tight text-text-primary md:text-2xl">
        {capability.title}
      </h3>
      <p className="text-base text-text-primary/80 md:text-lg">
        {capability.description}
      </p>
    </article>
  );
}
