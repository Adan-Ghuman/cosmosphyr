import { Section } from "@/shared/ui/Section";
import { ProcessJourney } from "./ProcessJourney";

export function Process() {
  return (
    <Section id="process" ariaLabel="How We Think">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          How We Think
        </h2>
        <ProcessJourney />
      </div>
    </Section>
  );
}
