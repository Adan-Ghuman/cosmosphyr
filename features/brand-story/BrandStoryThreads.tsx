"use client";

import { useRef } from "react";
import Threads from "@/components/Threads";
import { useCanvasInView } from "@/shared/hooks/useCanvasInView";

export function BrandStoryThreads() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useCanvasInView(containerRef);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className={`h-full w-full mix-blend-screen transition-opacity duration-700 ${
          isInView ? "opacity-90" : "opacity-0"
        }`}
      >
        <Threads
          color={[0.7, 0.92, 1.0]}
          amplitude={2.2}
          distance={0.35}
          enableMouseInteraction={true}
        />
      </div>
    </div>
  );
}
