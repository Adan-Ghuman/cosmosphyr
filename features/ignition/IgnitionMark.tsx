import type { Ref } from "react";

type IgnitionMarkProps = {
  leftRef: Ref<SVGGElement | null>;
  rightRef: Ref<SVGGElement | null>;
};

export function IgnitionMark({ leftRef, rightRef }: IgnitionMarkProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      width="160"
      height="160"
      aria-hidden="true"
      focusable="false"
      className="text-accent-ice"
    >
      <defs>
        <filter
          id="ignition-glow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g ref={leftRef} filter="url(#ignition-glow)">
        <path
          d="M78 28c-26 10-44 34-44 52s18 42 44 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="52" cy="80" r="3.5" fill="currentColor" />
      </g>

      <g ref={rightRef} filter="url(#ignition-glow)">
        <path
          d="M82 28c26 10 44 34 44 52s-18 42-44 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="108" cy="80" r="3.5" fill="currentColor" />
      </g>
    </svg>
  );
}
