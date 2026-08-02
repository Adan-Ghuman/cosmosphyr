"use client";

import { useEffect, useState, type RefObject } from "react";

type ScrollProgressOptions = {
  clamp?: boolean;
};

export function useScrollProgress(
  target: RefObject<HTMLElement | null>,
  options: ScrollProgressOptions = {},
): number {
  const { clamp = true } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const raw = 1 - rect.bottom / (view + rect.height);
      const next = clamp ? Math.min(1, Math.max(0, raw)) : raw;
      setProgress(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [clamp, target]);

  return progress;
}
