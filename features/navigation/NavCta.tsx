"use client";

import { navCopy } from "@/content";
import { useActiveNavHref } from "./NavScrollSpyContext";

type NavCtaProps = {
  className?: string;
  onNavigate?: () => void;
};

export function NavCta({ className = "", onNavigate }: NavCtaProps) {
  const activeHref = useActiveNavHref();
  const isActive = activeHref === navCopy.ctaHref;

  return (
    <a
      href={navCopy.ctaHref}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`group relative inline-flex min-h-9 items-center justify-center rounded-full border px-4.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase backdrop-blur-md transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice ${
        isActive
          ? "border-accent-ice bg-accent-ice text-background shadow-[0_0_24px_rgba(142,191,212,0.6)]"
          : "border-accent-ice/50 bg-accent-ice/[0.12] text-accent-ice shadow-[0_0_18px_rgba(142,191,212,0.2)] hover:border-accent-ice/80 hover:bg-accent-ice/[0.22] hover:text-white hover:shadow-[0_0_26px_rgba(142,191,212,0.38)]"
      } ${className}`.trim()}
    >
      <span className="relative z-10">{navCopy.ctaLabel}</span>
    </a>
  );
}
