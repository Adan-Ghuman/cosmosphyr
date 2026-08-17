import { capabilities } from "@/content";
import { Section } from "@/shared/ui/Section";
import { StarBorder } from "@/shared/ui/StarBorder";
import { CapabilitiesField } from "./CapabilitiesField";
import { CapabilityCard } from "./CapabilityCard";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      ariaLabel="What We Build"
      className="relative px-6"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <StarBorder
          color="#8ebfd4"
          speed="8s"
          thickness={1.5}
          className="w-full rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          innerClassName="relative overflow-hidden rounded-3xl border border-(--color-nav-border) bg-(--color-nav-surface) px-6 py-10 md:px-12 md:py-16 backdrop-blur-xl"
        >

          {/* Constellation Grid embedded inside the isolated card surface */}
          <CapabilitiesField />

          <div className="relative z-10">
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
        </StarBorder>
      </div>
    </Section>
  );
}
