import { Section } from "@/shared/ui/Section";
import { PixelBlastField } from "./PixelBlastField";
import { ProcessJourney } from "./ProcessJourney";

export function Process() {
  return (
    <Section id="process" ariaLabel="How We Think" className="relative overflow-hidden">
      <PixelBlastField />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          How We Think
        </h2>
        <ProcessJourney />
      </div>
    </Section>
  );
}

