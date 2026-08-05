"use client";

import { NavBrand } from "./NavBrand";
import { NavCta } from "./NavCta";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";
import { NavScrollSpyProvider } from "./NavScrollSpyContext";

export function SiteNav() {
  return (
    <NavScrollSpyProvider>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-(--space-nav-inset-x) pt-(--space-nav-inset-y)">
        <div className="pointer-events-auto mx-auto flex h-(--size-nav-height) max-w-6xl items-center justify-between gap-4 rounded-(--radius-nav) border border-(--color-nav-border) bg-(--color-nav-surface) px-4 backdrop-blur-md md:px-5">
          <NavBrand />

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 justify-center md:flex"
          >
            <NavLinks variant="desktop" />
          </nav>

          <div className="flex items-center gap-3">
            <NavCta className="hidden md:inline-flex" />
            <NavMobileMenu />
          </div>
        </div>
      </header>
    </NavScrollSpyProvider>
  );
}
