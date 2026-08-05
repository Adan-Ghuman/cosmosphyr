"use client";

import { navCopy } from "@/content";
import { useEffect, useId, useRef, useState } from "react";
import { NavBrand } from "./NavBrand";
import { NavCta } from "./NavCta";
import { NavLinks } from "./NavLinks";

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function NavMobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      openButtonRef.current?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={openButtonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center text-text-primary"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={navCopy.menuOpenLabel}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 z-40 flex flex-col bg-(--color-nav-overlay) backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={navCopy.menuOpenLabel}
        >
          <div className="flex h-(--size-nav-height) items-center justify-between px-6">
            <NavBrand onNavigate={close} />
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center text-text-primary"
              aria-label={navCopy.menuCloseLabel}
              onClick={close}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-1 flex-col px-6 pt-4 pb-8">
            <NavLinks
              variant="mobile"
              className="flex-1"
              onNavigate={close}
            />
            <div className="mt-8">
              <NavCta className="w-full" onNavigate={close} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
