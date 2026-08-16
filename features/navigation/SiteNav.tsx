"use client";

import { NavBrand } from "./NavBrand";
import { NavCta } from "./NavCta";
import { NavLinks } from "./NavLinks";
import { MobileDock } from "./MobileDock";
import { StarBorder } from "@/shared/ui/StarBorder";
import { NavScrollSpyProvider } from "./NavScrollSpyContext";

export function SiteNav() {
  return (
    <NavScrollSpyProvider>
      {/* Top Header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-(--space-nav-inset-x) pt-(--space-nav-inset-y)">
        {/* Desktop Header Capsule (>= 1100px) */}
        <StarBorder
          color="#8ebfd4"
          speed="6s"
          thickness={1}
          className="pointer-events-auto mx-auto hidden max-w-5xl rounded-(--radius-nav) shadow-[0_4px_24px_rgba(0,0,0,0.4)] min-[1100px]:flex"
          innerClassName="flex h-(--size-nav-height) items-center justify-between gap-4 rounded-(--radius-nav) border border-(--color-nav-border) bg-(--color-nav-surface) px-5 backdrop-blur-md"
        >
          <NavBrand />

          <nav
            aria-label="Primary Navigation"
            className="flex min-w-0 flex-1 items-center justify-center"
          >
            <NavLinks />
          </nav>

          <div className="flex items-center">
            <NavCta />
          </div>
        </StarBorder>

        {/* Mobile Header (< 1100px): Single Unified Glass Card */}
        <StarBorder
          color="#8ebfd4"
          speed="6s"
          thickness={1}
          className="pointer-events-auto mx-auto w-full max-w-lg rounded-(--radius-nav) shadow-[0_4px_24px_rgba(0,0,0,0.4)] min-[1100px]:hidden"
          innerClassName="flex h-(--size-nav-height) w-full items-center justify-between gap-3 rounded-(--radius-nav) border border-(--color-nav-border) bg-(--color-nav-surface) px-4 backdrop-blur-md"
        >
          <NavBrand />
          <NavCta />
        </StarBorder>
      </header>

      {/* Floating Mobile Dock */}
      <MobileDock />
    </NavScrollSpyProvider>
  );
}
