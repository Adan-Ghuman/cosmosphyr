"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SliderContext } from "./SliderContext";

type SliderProps = {
  children: ReactNode;
  count: number;
  label: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
};

const AUTOPLAY_MS = 5500;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Slider({
  children,
  count,
  label,
  autoPlay = true,
  loop = true,
  className = "",
}: SliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [perView, setPerView] = useState(3);
  const [dragging, setDragging] = useState(false);

  const maxIndex = Math.max(0, count - perView);

  const wrap = useCallback(
    (value: number) => {
      if (count <= 0) return 0;
      return Math.min(maxIndex, Math.max(0, value));
    },
    [count, maxIndex],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(wrap(nextIndex));
    },
    [wrap],
  );

  const next = useCallback(() => {
    setIndex((current) => {
      if (loop && current >= maxIndex) return 0;
      return wrap(current + 1);
    });
  }, [loop, maxIndex, wrap]);

  const prev = useCallback(() => {
    setIndex((current) => {
      if (loop && current <= 0) return maxIndex;
      return wrap(current - 1);
    });
  }, [loop, maxIndex, wrap]);

  const pause = useCallback(() => {
    setHovering(true);
  }, []);

  const resume = useCallback(() => {
    setHovering(false);
  }, []);

  const setPaused = useCallback((value: boolean | ((current: boolean) => boolean)) => {
    setHovering((current) =>
      typeof value === "function" ? value(current) : value,
    );
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches || prefersReducedMotion());
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const token = (name: string, fallback: number) => {
      const raw = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(name),
      );
      return Number.isFinite(raw) && raw > 0 ? raw : fallback;
    };
    const sync = () => {
      setPerView(
        media.matches
          ? token("--size-slider-per-view-desktop", 3)
          : token("--size-slider-per-view-mobile", 1),
      );
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = hovering || focused || pageHidden || dragging;

  useEffect(() => {
    if (!autoPlay || reducedMotion || paused || !inView || count < 2) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoPlay, reducedMotion, paused, inView, count, next]);

  const value = useMemo(
    () => ({
      index,
      count,
      perView,
      maxIndex,
      dragging,
      setDragging,
      goTo,
      next,
      prev,
      pause,
      resume,
      setPaused,
      reducedMotion,
    }),
    [
      index,
      count,
      perView,
      maxIndex,
      dragging,
      goTo,
      next,
      prev,
      pause,
      resume,
      setPaused,
      reducedMotion,
    ],
  );

  return (
    <SliderContext.Provider value={value}>
      <div
        ref={rootRef}
        className={`relative ${className}`.trim()}
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            next();
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            prev();
          }
        }}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocused(false);
          }
        }}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
}
