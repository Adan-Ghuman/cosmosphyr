import { capabilities } from "@/content";
import { Section } from "@/shared/ui/Section";
import { CapabilitiesField } from "./CapabilitiesField";
import { CapabilityCard } from "./CapabilityCard";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      ariaLabel="What We Build"
      className="overflow-hidden"
    >
      <CapabilitiesField />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          What We Build
        </h2>
        <ul className="mt-10 grid list-none gap-(--space-capability-gap) p-0 md:grid-cols-2">
          {capabilities.map((item) => (
            <li key={item.id}>
              <CapabilityCard capability={item} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
