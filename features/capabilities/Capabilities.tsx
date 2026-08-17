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
      className="relative px-6 !py-6 sm:!py-8 md:!py-10"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <StarBorder
          color="#8ebfd4"
          speed="8s"
          thickness={1.5}
          className="w-full rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          innerClassName="relative overflow-hidden rounded-3xl border border-(--color-nav-border) bg-(--color-nav-surface) p-5 sm:p-7 md:p-8 backdrop-blur-xl"
        >
          {/* Interactive Dot Grid Atmosphere */}
          <CapabilitiesField />

          <div className="relative z-10">
            {/* Section Header: Compact Single-Row Flex on Desktop */}
            <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-ice/30 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-accent-ice uppercase shadow-[0_0_8px_rgba(142,191,212,0.15)] backdrop-blur-md">
                  <span className="size-1 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-pulse" />
                  <span>04 // Capabilities</span>
                </div>
                <h2 className="font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                  What We Build
                </h2>
              </div>
              <p className="max-w-xs text-xs text-text-primary/70 sm:text-right md:max-w-sm md:text-[13px]">
                Engineered systems moving from concept across the horizon into production.
              </p>
            </div>

            {/* 2x2 Capabilities Grid */}
            <ul className="mt-4 sm:mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:gap-3.5 md:grid-cols-2 md:gap-4">
              {capabilities.map((item, index) => (
                <li key={item.id} className="h-full">
                  <CapabilityCard capability={item} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </StarBorder>
      </div>
    </Section>
  );
}



