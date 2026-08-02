import { processSteps } from "@/content";
import { ProcessConnector } from "./ProcessConnector";
import { ProcessStep } from "./ProcessStep";

export function ProcessJourney() {
  return (
    <ol className="mt-10 flex list-none flex-col gap-(--space-process-gap) p-0 md:flex-row md:items-start md:gap-0">
      {processSteps.map((step, index) => {
        const isLast = index === processSteps.length - 1;

        return (
          <li
            key={step.id}
            className="flex flex-col md:flex-1 md:flex-row md:items-start"
          >
            <div className="min-w-0 flex-1">
              <ProcessStep step={step} />
            </div>
            {!isLast ? <ProcessConnector /> : null}
          </li>
        );
      })}
    </ol>
  );
}
