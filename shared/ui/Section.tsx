"use client";

import {
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type SectionProps = {
  id: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "id" | "children" | "className">;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Section({
  id,
  ariaLabel,
  children,
  className = "",
  ...rest
}: SectionProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      data-reduced-motion={reducedMotion || prefersReducedMotion() ? "true" : "false"}
      className={`relative py-(--space-section-y) ${className}`.trim()}
      {...rest}
    >
      {children}
    </section>
  );
}
