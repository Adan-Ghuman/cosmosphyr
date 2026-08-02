"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProofStaggerProps = {
  children: ReactNode;
  className?: string;
};

function shouldReduceMotion(scope: Element | null): boolean {
  if (!scope) return true;
  if (scope.closest('[data-reduced-motion="true"]')) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProofStagger({ children, className = "" }: ProofStaggerProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>(
        list.querySelectorAll("[data-proof-item]"),
      );
      if (items.length === 0) return;

      if (shouldReduceMotion(list)) {
        gsap.set(items, { clearProps: "opacity,transform" });
        return;
      }

      const tween = gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            once: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(items, { clearProps: "opacity,transform" });
      };
    },
    { scope: listRef },
  );

  return (
    <ul
      ref={listRef}
      className={`mt-10 grid list-none gap-(--space-proof-gap) p-0 md:grid-cols-3 ${className}`.trim()}
    >
      {children}
    </ul>
  );
}
