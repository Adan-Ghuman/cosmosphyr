"use client";

import { motion, AnimatePresence } from "motion/react";
import { navCopy } from "@/content";
import { useActiveNavHref } from "./NavScrollSpyContext";
import {
  Home,
  Info,
  Layers,
  Briefcase,
  Workflow,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const SECTION_ICONS: Record<string, LucideIcon> = {
  "#horizon": Home,
  "#cosmosphyr": Info,
  "#capabilities": Layers,
  "#selected-work": Briefcase,
  "#process": Workflow,
  "#next-horizon": Sparkles,
};

export function MobileDock() {
  const activeHref = useActiveNavHref();

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 flex justify-center px-3 min-[1100px]:hidden"
    >
      <div className="pointer-events-auto relative flex items-center gap-1 sm:gap-1.5 rounded-2xl border border-white/12 border-t-white/25 bg-black/80 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(142,191,212,0.12)] backdrop-blur-2xl">
        {/* Top Specular Sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {navCopy.links.map((link) => {
          const isActive = activeHref === link.href;
          const Icon = SECTION_ICONS[link.href] || Home;

          return (
            <motion.a
              key={link.href}
              layout
              whileTap={{ scale: 0.9 }}
              transition={{
                layout: { type: "spring", stiffness: 400, damping: 32 },
              }}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(
                  link.href.replace("#", "")
                );
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex h-9 items-center justify-center rounded-xl px-2.5 transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice/60 ${
                isActive
                  ? "text-accent-ice"
                  : "text-text-primary/60 hover:bg-white/[0.06] hover:text-text-primary"
              }`}
            >
              {/* Active Morphing Pill Backdrop */}
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-xl border border-accent-ice/40 bg-accent-ice/[0.14] shadow-[0_0_16px_rgba(142,191,212,0.22)]"
                />
              )}

              {/* Icon & Morphing Micro-Label */}
              <span className="relative z-10 flex items-center">
                <Icon
                  className="size-4 shrink-0 transition-transform duration-200"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                        marginLeft: 6,
                        transition: {
                          width: {
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          },
                          opacity: { duration: 0.2, delay: 0.05 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        marginLeft: 0,
                        transition: {
                          width: {
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden whitespace-nowrap text-[11px] font-semibold tracking-wider text-accent-ice uppercase"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
