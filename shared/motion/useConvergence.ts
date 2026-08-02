"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type RefObject } from "react";

gsap.registerPlugin(useGSAP);

export type ConvergenceOptions = {
  duration?: number;
  stagger?: number;
  onComplete?: () => void;
  enabled?: boolean;
};

function shouldReduceMotion(scope: Element | null): boolean {
  if (!scope) return true;
  if (scope.closest('[data-reduced-motion="true"]')) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useConvergence(
  targets: RefObject<Element | null>[],
  options: ConvergenceOptions = {},
) {
  const {
    duration = 1.6,
    stagger = 0.08,
    onComplete,
    enabled = true,
  } = options;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const localScope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!enabled) return;

      const elements = targets
        .map((ref) => ref.current)
        .filter((node): node is Element => Boolean(node));

      if (elements.length === 0) return;

      const root = elements[0];
      if (shouldReduceMotion(root)) {
        gsap.set(elements, { x: 0, y: 0, opacity: 1 });
        onCompleteRef.current?.();
        return;
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          onCompleteRef.current?.();
        },
      });

      timeline.fromTo(
        elements,
        { x: (i: number) => (i % 2 === 0 ? -64 : 64), opacity: 0.25 },
        {
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.out",
        },
      );

      return () => {
        timeline.kill();
      };
    },
    {
      scope: localScope,
      dependencies: [duration, stagger, enabled],
    },
  );
}
