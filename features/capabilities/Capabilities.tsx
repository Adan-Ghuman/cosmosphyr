import { capabilities } from "@/content";
import { Section } from "@/shared/ui/Section";
import { CapabilityCard } from "./CapabilityCard";

export function Capabilities() {
  return (
    <Section id="capabilities" ariaLabel="What We Build">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          What We Build
        </h2>
        <ul className="mt-10 grid list-none gap-10 p-0 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
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
