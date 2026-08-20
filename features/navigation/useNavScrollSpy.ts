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

    const clearancePx = 80;
    const ratios = new Map<string, number>();

    const checkScrollEdges = () => {
      if (window.scrollY < 100) {
        setActiveHref(elements[0].href);
        return;
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isAtBottom) {
        setActiveHref(elements[elements.length - 1].href);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 100) {
          setActiveHref(elements[0].href);
          return;
        }

        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100;

        if (isAtBottom) {
          setActiveHref(elements[elements.length - 1].href);
          return;
        }

        for (const entry of entries) {
          const match = elements.find((item) => item.el === entry.target);
          if (!match) continue;
          ratios.set(match.href, entry.isIntersecting ? entry.intersectionRatio : 0);
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
        }
      },
      {
        root: null,
        threshold: [0.05, 0.2, 0.4, 0.6, 0.8],
        rootMargin: `-${clearancePx}px 0px -40% 0px`,
      },
    );

    for (const { el } of elements) observer.observe(el);
    window.addEventListener("scroll", checkScrollEdges, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkScrollEdges);
    };
  }, [hrefs]);

  return activeHref;
}
