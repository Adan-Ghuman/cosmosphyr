"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type HorizonOptions = {
  xPercent?: number;
  enabled?: boolean;
  trigger?: RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
};

function shouldReduceMotion(scope: Element | null): boolean {
  if (!scope) return true;
  if (scope.closest('[data-reduced-motion="true"]')) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useHorizon(
  target: RefObject<Element | null>,
  options: HorizonOptions = {},
) {
  const {
    xPercent = -12,
    enabled = true,
    trigger,
    start = "top 80%",
    end = "bottom 40%",
  } = options;
  const localScope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = target.current;
      if (!el) return;

      const setFinal = () => {
        gsap.set(el, { xPercent: 0, opacity: 1 });
      };

      if (!enabled || shouldReduceMotion(el)) {
        setFinal();
        return;
      }

      const triggerEl = trigger?.current ?? el.parentElement;
      if (!triggerEl) {
        setFinal();
        return;
      }

      const tween = gsap.fromTo(
        el,
        { xPercent, opacity: 0.35 },
        {
          xPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      scope: localScope,
      dependencies: [enabled, xPercent, start, end, trigger],
    },
  );
}
