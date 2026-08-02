import type { Ref } from "react";

type HorizonFallbackFieldProps = {
  streakRef?: Ref<HTMLDivElement | null>;
  className?: string;
};

export function HorizonFallbackField({
  streakRef,
  className = "",
}: HorizonFallbackFieldProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-background ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 60%, var(--color-glow), transparent 70%)",
        }}
      />
      <div
        ref={streakRef}
        className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-1/2"
      >
        <svg
          className="h-8 w-full text-accent-ice"
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id="horizon-streak" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="45%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="55%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="14"
            width="1200"
            height="2"
            fill="url(#horizon-streak)"
          />
          <circle cx="600" cy="15" r="3" fill="currentColor" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}
