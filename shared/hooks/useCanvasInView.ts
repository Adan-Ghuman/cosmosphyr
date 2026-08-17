"use client";

import { useEffect, useState, type RefObject } from "react";

export function useCanvasInView(
  targetRef: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = { threshold: 0.05 }
): boolean {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry) {
        setIsInView(entry.isIntersecting);
      }
    }, options);

    observer.observe(el);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsInView(false);
      } else if (el) {
        const rect = el.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(inView);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [targetRef, options]);

  return isInView;
}
