"use client";

import React, { useState } from "react";
import { processSteps } from "@/content";
import { ProcessConnector } from "./ProcessConnector";
import { ProcessStep } from "./ProcessStep";

export function ProcessJourney() {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {/* Desktop Horizontal Pipeline Layout */}
      <ol className="hidden list-none items-stretch p-0 lg:flex lg:gap-0">
        {processSteps.map((step, index) => {
          const isLast = index === processSteps.length - 1;
          const isHovered = activeStepId === step.id;

          return (
            <React.Fragment key={step.id}>
              <li
                className="flex-1 transition-all duration-300"
                onMouseEnter={() => setActiveStepId(step.id)}
                onMouseLeave={() => setActiveStepId(null)}
              >
                <ProcessStep
                  step={step}
                  index={index}
                  isActive={isHovered}
                />
              </li>

              {!isLast && <ProcessConnector orientation="horizontal" />}
            </React.Fragment>
          );
        })}
      </ol>

      {/* Mobile & Tablet Vertical Timeline Layout */}
      <ol className="flex list-none flex-col p-0 lg:hidden">
        {processSteps.map((step, index) => {
          const isLast = index === processSteps.length - 1;

          return (
            <li key={step.id} className="flex flex-col">
              <ProcessStep step={step} index={index} />
              {!isLast && <ProcessConnector orientation="vertical" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
