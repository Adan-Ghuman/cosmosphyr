"use client";

import { navCopy } from "@/content";
import { useActiveNavHref } from "./NavScrollSpyContext";

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function NavLinks({
  className = "",
  onNavigate,
  variant = "desktop",
}: NavLinksProps) {
  const activeHref = useActiveNavHref();
  const isMobile = variant === "mobile";

  return (
    <ul
      className={`${
        isMobile
          ? "flex list-none flex-col gap-0 p-0"
          : "flex list-none flex-nowrap items-center justify-center gap-x-(--space-nav-link-gap) p-0"
      } ${className}`.trim()}
    >
      {navCopy.links.map((link) => {
        const isActive = activeHref === link.href;

        return (
          <li
            key={link.href}
            className={
              isMobile
                ? "border-b border-(--color-nav-border) last:border-b-0"
                : undefined
            }
          >
            <a
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={
                isMobile
                  ? "nav-link group relative flex min-h-14 w-full items-center justify-between text-base tracking-wide text-text-primary/85 uppercase"
                  : "nav-link group relative inline-flex min-h-11 items-center text-xs tracking-[0.14em] text-text-primary/80 uppercase transition-[color,text-shadow] duration-200"
              }
            >
              {!isMobile ? (
                <>
                  <span aria-hidden="true" className="nav-link-aura" />
                  <span className="relative z-10">{link.label}</span>
                </>
              ) : (
                <span className="relative z-10">{link.label}</span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
