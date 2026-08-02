"use client";

import { useHorizon } from "@/shared/motion";
import { useRef, type ReactNode } from "react";

type FinalCtaRevealProps = {
  children: ReactNode;
};

export function FinalCtaReveal({ children }: FinalCtaRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useHorizon(revealRef, {
    trigger: revealRef,
    xPercent: -10,
    start: "top 90%",
    end: "top 40%",
  });

  return <div ref={revealRef}>{children}</div>;
}
