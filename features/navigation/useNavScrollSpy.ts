"use client";

import { useEffect, useState } from "react";

function hrefToId(href: string): string {
  return href.startsWith("#") ? href.slice(1) : href;
}

/** Tracks which nav section hash is most in view near the top of the viewport. */
export function useNavScrollSpy(hrefs: string[]): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(hrefs[0] ?? null);

  useEffect(() => {
    if (hrefs.length === 0) return;

    const elements = hrefs
      .map((href) => {
        const el = document.getElementById(hrefToId(href));
        return el ? { href, el } : null;
      })
      .filter((entry): entry is { href: string; el: HTMLElement } => entry !== null);

    if (elements.length === 0) return;

    const clearancePx = 72; // Standard nav clearance
    const ratios = new Map<string, number>();
    const tops = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const match = elements.find((item) => item.el === entry.target);
          if (!match) continue;
          ratios.set(match.href, entry.isIntersecting ? entry.intersectionRatio : 0);
          tops.set(match.href, entry.boundingClientRect.top);
        }

        let bestHref: string | null = null;
        let bestRatio = 0;
        for (const { href } of elements) {
          const ratio = ratios.get(href) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestHref = href;
          }
        }

        if (bestHref) {
          setActiveHref(bestHref);
          return;
        }

        let fallback = elements[0]?.href ?? null;
        let minTop = Number.POSITIVE_INFINITY;
        for (const { href } of elements) {
          const topVal = tops.get(href);
          if (topVal !== undefined) {
            const diff = Math.abs(topVal - clearancePx);
            if (diff < minTop) {
              minTop = diff;
              fallback = href;
            }
          }
        }
        if (fallback) setActiveHref(fallback);
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: `-${clearancePx}px 0px -45% 0px`,
      },
    );

    for (const { el } of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [hrefs]);

  return activeHref;
}
