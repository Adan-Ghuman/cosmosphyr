"use client";

import { navCopy } from "@/content";
import { GooeyNav } from "./GooeyNav";
import { useActiveNavHref } from "./NavScrollSpyContext";

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

export function NavLinks({ className = "", onNavigate }: NavLinksProps) {
  const activeHref = useActiveNavHref();

  return (
    <GooeyNav
      items={navCopy.links}
      activeHref={activeHref}
      onNavigate={onNavigate}
      particleCount={14}
      particleDistances={[46, 10]}
      particleR={60}
      animationTime={420}
      timeVariance={180}
      colors={[1, 2, 3, 1, 2, 4]}
    />
  );
}
