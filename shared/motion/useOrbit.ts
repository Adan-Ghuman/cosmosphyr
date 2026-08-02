"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type RefObject } from "react";

gsap.registerPlugin(useGSAP);

type OrbitOptions = {
  amount?: number;
  duration?: number;
  paused?: boolean;
};

function shouldReduceMotion(scope: HTMLElement | null): boolean {
  if (!scope) return true;
  if (scope.closest('[data-reduced-motion="true"]')) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useOrbit(
  target: RefObject<HTMLElement | null>,
  options: OrbitOptions = {},
) {
  const { amount = 360, duration = 48, paused = false } = options;
  const localScope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = target.current;
      if (!el || paused) return;

      if (shouldReduceMotion(el)) {
        gsap.set(el, { rotate: 0 });
        return;
      }

      const tween = gsap.to(el, {
        rotate: amount,
        duration,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: localScope, dependencies: [amount, duration, paused, target] },
  );
}
