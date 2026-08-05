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
                  ? "group relative flex min-h-14 w-full items-center justify-between text-base tracking-wide text-text-primary/85 uppercase transition-colors hover:text-accent-ice focus-visible:text-accent-ice aria-current:text-accent-ice"
                  : "group relative inline-flex min-h-11 items-center text-xs tracking-[0.14em] text-text-primary/80 uppercase transition-colors hover:text-accent-ice focus-visible:text-accent-ice aria-current:text-accent-ice"
              }
            >
              <span className="relative">
                {link.label}
                {!isMobile ? (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-full left-1/2 mt-1 size-(--size-nav-dot) -translate-x-1/2 rounded-full bg-accent-ice shadow-(--shadow-nav-dot) transition-opacity ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  />
                ) : null}
              </span>
              {isMobile ? (
                <span
                  aria-hidden="true"
                  className={`size-(--size-nav-dot) shrink-0 rounded-full bg-accent-ice shadow-(--shadow-nav-dot) transition-opacity ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
