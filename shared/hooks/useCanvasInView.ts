"use client";

import { useEffect, useState, type RefObject } from "react";

export function useCanvasInView(
  targetRef: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false);

  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin ?? "120px";
  const threshold = options?.threshold ?? 0.05;

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsInView(false);
      } else if (el) {
        const rect = el.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight + 120 && rect.bottom > -120;
        setIsInView(inView);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [targetRef, root, rootMargin, threshold]);

  return isInView;
}
