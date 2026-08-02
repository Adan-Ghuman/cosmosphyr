import type { ProcessStep as ProcessStepData } from "@/content";
import { OrbitAccent } from "@/shared/ui/OrbitAccent";

type ProcessStepProps = {
  step: ProcessStepData;
};

export function ProcessStep({ step }: ProcessStepProps) {
  return (
    <article className="flex flex-col gap-3">
      <OrbitAccent />
      <h3 className="font-display text-lg tracking-tight text-text-primary md:text-xl">
        {step.label}
      </h3>
      <p className="text-base text-text-primary/80">{step.description}</p>
    </article>
  );
}
