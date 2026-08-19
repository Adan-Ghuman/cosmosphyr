"use client";

import { useRef } from "react";
import DotField from "@/components/DotField";
import { useCanvasInView } from "@/shared/hooks/useCanvasInView";

export function CapabilitiesField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useCanvasInView(containerRef);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
    >
      <div
        className={`h-full w-full transition-opacity duration-700 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={true}
          waveAmplitude={0.8}
          cursorRadius={450}
          cursorForce={0.1}
          bulgeOnly={true}
          gradientFrom="rgba(142, 191, 212, 0.45)"
          gradientTo="rgba(174, 190, 210, 0.2)"
          glowColor="var(--color-background)"
        />
      </div>
      {/* Subtle radial center ambient mask */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(5,5,7,0.55),transparent_90%)]" />
    </div>
  );
}


