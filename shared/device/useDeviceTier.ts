"use client";

import { useLayoutEffect, useState } from "react";

export type DeviceTier = "full" | "fallback";

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "fallback";

  try {
    const nav = navigator as NavigatorWithMemory;
    const cores = nav.hardwareConcurrency ?? 0;
    const memory = nav.deviceMemory;
    const saveData =
      "connection" in nav &&
      Boolean(
        (nav as Navigator & { connection?: { saveData?: boolean } }).connection
          ?.saveData,
      );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const smallViewport = window.matchMedia("(max-width: 768px)").matches;

    if (reducedMotion || saveData) return "fallback";
    if (memory !== undefined && memory < 4) return "fallback";
    if (cores > 0 && cores < 4) return "fallback";
    if (
      coarsePointer &&
      smallViewport &&
      (memory === undefined || memory < 6)
    ) {
      return "fallback";
    }

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return "fallback";

    return "full";
  } catch {
    return "fallback";
  }
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("fallback");

  useLayoutEffect(() => {
    setTier(detectTier());
  }, []);

  return tier;
}
