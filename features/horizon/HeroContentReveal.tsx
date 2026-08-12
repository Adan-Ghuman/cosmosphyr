"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";
import { useIgnitionAbsent } from "./useIgnitionAbsent";

gsap.registerPlugin(useGSAP);

type HeroContentRevealProps = {
  children: ReactNode;
  className?: string;
};

function shouldReduceMotion(scope: Element | null): boolean {
  if (!scope) return true;
  if (scope.closest('[data-reduced-motion="true"]')) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Ignition-gated staggered Horizon entrance for hero copy. */
export function HeroContentReveal({
  children,
  className = "",
}: HeroContentRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ignitionAbsent = useIgnitionAbsent();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const items = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-hero-reveal]"),
      );
      if (items.length === 0) return;

      if (!ignitionAbsent) {
        gsap.set(items, { opacity: 0, y: 28, xPercent: -6 });
        return;
      }

      if (shouldReduceMotion(root)) {
        gsap.set(items, { clearProps: "opacity,transform" });
        return;
      }

      const tween = gsap.fromTo(
        items,
        { opacity: 0, y: 28, xPercent: -6 },
        {
          opacity: 1,
          y: 0,
          xPercent: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power2.out",
          immediateRender: false,
        },
      );

      return () => {
        tween.kill();
        gsap.set(items, { clearProps: "opacity,transform" });
      };
    },
    { scope: rootRef, dependencies: [ignitionAbsent] },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
