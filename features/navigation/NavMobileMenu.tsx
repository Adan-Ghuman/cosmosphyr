"use client";

import { navCopy } from "@/content";
import { useEffect, useId, useState } from "react";
import { NavCta } from "./NavCta";
import { NavLinks } from "./NavLinks";

export function NavMobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 items-center text-sm text-text-primary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? navCopy.menuCloseLabel : navCopy.menuOpenLabel}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-(--size-nav-height) border-b border-(--color-nav-border) bg-(--color-nav-surface) px-6 py-4 backdrop-blur-md"
        >
          <NavLinks
            className="flex-col items-start gap-1"
            onNavigate={() => setOpen(false)}
          />
          <div className="mt-4 border-t border-(--color-nav-border) pt-4">
            <NavCta onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
