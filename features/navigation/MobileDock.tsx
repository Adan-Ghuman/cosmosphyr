"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { navCopy } from "@/content";
import { useActiveNavHref } from "./NavScrollSpyContext";

const SECTION_ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  "#horizon": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  "#cosmosphyr": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z" />
    </svg>
  ),
  "#capabilities": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "#selected-work": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  "#proof": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  "#process": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "#next-horizon": ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
};

function DockItem({
  href,
  label,
  mouseX,
  isActive,
}: {
  href: string;
  label: string;
  mouseX: MotionValue<number>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [38, 52, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 14 });

  const Icon = SECTION_ICONS[href] || SECTION_ICONS["#horizon"];

  return (
    <div className="relative flex flex-col items-center">
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          className="pointer-events-none absolute -top-8 z-30 rounded-md border border-white/10 bg-black/80 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-text-primary shadow-lg backdrop-blur-md whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}

      <motion.a
        ref={ref}
        href={href}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={label}
        aria-current={isActive ? "true" : undefined}
        className={`relative flex items-center justify-center rounded-xl border transition-colors ${
          isActive
            ? "border-accent-ice/50 bg-white/[0.12] text-accent-ice shadow-[0_0_12px_rgba(142,191,212,0.3)]"
            : "border-white/10 bg-white/[0.04] text-text-primary/70 hover:border-white/25 hover:bg-white/[0.08] hover:text-text-primary"
        }`}
      >
        <Icon className="size-4 shrink-0 transition-transform duration-200" />
      </motion.a>

      {/* Active Dot Indicator */}
      <span
        aria-hidden="true"
        className={`mt-1 size-1 rounded-full transition-all duration-300 ${
          isActive
            ? "bg-accent-ice shadow-[0_0_8px_var(--color-accent-ice)] scale-100 opacity-100"
            : "scale-0 opacity-0"
        }`}
      />
    </div>
  );
}

export function MobileDock() {
  const mouseX = useMotionValue(Infinity);
  const activeHref = useActiveNavHref();

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 min-[1100px]:hidden"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            mouseX.set(e.touches[0].clientX);
          }
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-2 rounded-2xl border border-white/15 bg-black/75 px-3 pt-2 pb-1 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_24px_rgba(142,191,212,0.12)] backdrop-blur-xl"
      >
        {navCopy.links.map((link) => (
          <DockItem
            key={link.href}
            href={link.href}
            label={link.label}
            mouseX={mouseX}
            isActive={activeHref === link.href}
          />
        ))}
      </motion.div>
    </nav>
  );
}
