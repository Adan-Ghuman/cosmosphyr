"use client";

import { useHorizon } from "@/shared/motion";
import { useRef, type ReactNode } from "react";

type SelectedWorkRevealProps = {
  children: ReactNode;
};

export function SelectedWorkReveal({ children }: SelectedWorkRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useHorizon(revealRef, {
    trigger: revealRef,
    xPercent: -10,
    start: "top 90%",
    end: "top 40%",
  });

  return <div ref={revealRef}>{children}</div>;
}
