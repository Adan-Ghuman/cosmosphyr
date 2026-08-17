"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDeviceTier } from "@/shared/device/useDeviceTier";

const Galaxy = dynamic(() => import("@/components/Galaxy"), {
  ssr: false,
});

export function GalaxyBackground() {
  const tier = useDeviceTier();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = () => setReducedMotion(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background"
    >
      {tier === "full" ? (
        <div className="absolute inset-0 opacity-90 transition-opacity duration-1000">
          <Galaxy
            transparent={true}
            hueShift={140}
            density={0.45}
            speed={reducedMotion ? 0 : 0.45}
            starSpeed={reducedMotion ? 0 : 0.35}
            glowIntensity={0.22}
            rotationSpeed={reducedMotion ? 0 : 0.05}
            mouseInteraction={!reducedMotion}
            mouseRepulsion={true}
            repulsionStrength={0.55}
            twinkleIntensity={0.25}
            autoCenterRepulsion={0}
            disableAnimation={reducedMotion}
          />

        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(142,191,212,0.15),transparent_70%)]" />
      )}
      {/* Subtle bottom fade to seamlessly blend into deep obsidian background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
    </div>
  );
}

