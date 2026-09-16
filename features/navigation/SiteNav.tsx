"use client";

import { useEffect } from "react";
import { NavBrand } from "./NavBrand";
import { NavCta } from "./NavCta";
import { NavLinks } from "./NavLinks";
import { MobileDock } from "./MobileDock";
import { StarBorder } from "@/shared/ui/StarBorder";
import { NavScrollSpyProvider } from "./NavScrollSpyContext";

export function SiteNav() {
  useEffect(() => {
    // Clean any pre-existing hash from address bar on load without jumping
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length <= 1) return;

      e.preventDefault();

      const elementId = href.slice(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

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
