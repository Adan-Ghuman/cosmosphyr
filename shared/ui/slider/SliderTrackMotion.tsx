"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useSlider } from "./SliderContext";

gsap.registerPlugin(useGSAP);

const MOVE_SECONDS = 0.7;
const DRAG_THRESHOLD = 8;

type SliderTrackMotionProps = {
  children: ReactNode;
};

export function SliderTrackMotion({ children }: SliderTrackMotionProps) {
  const { index, perView, maxIndex, goTo, setDragging, reducedMotion } =
    useSlider();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [layoutTick, setLayoutTick] = useState(0);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    originX: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    active: boolean;
  } | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      setLayoutTick((tick) => tick + 1);
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      if (dragRef.current?.active) return;

      const slides = Array.from(track.children) as HTMLElement[];
      const styles = getComputedStyle(track);
      const gapRaw = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
      const gap = Number.parseFloat(gapRaw) || 0;
      const slideWidth = (viewport.clientWidth - gap * (perView - 1)) / perView;

      slides.forEach((slide) => {
        slide.style.flex = `0 0 ${slideWidth}px`;
        slide.style.width = `${slideWidth}px`;
      });

      const active = slides[index];
      if (!active) return;

      const x = -active.offsetLeft;

      if (reducedMotion) {
        gsap.set(track, { x });
        return;
      }

      const tween = gsap.to(track, {
        x,
        duration: MOVE_SECONDS,
        ease: "power2.out",
        overwrite: "auto",
      });

      return () => {
        tween.kill();
      };
    },
    { scope: viewportRef, dependencies: [index, perView, reducedMotion, layoutTick] },
  );

  function stepWidth() {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first) return 0;
    if (!second) return first.offsetWidth;
    return second.offsetLeft - first.offsetLeft;
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    gsap.killTweensOf(track);
    const currentX = Number(gsap.getProperty(track, "x")) || 0;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      originX: currentX,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      active: false,
    };
    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || event.pointerId !== drag.pointerId) return;

    const delta = event.clientX - drag.startX;
    if (!drag.active && Math.abs(delta) < DRAG_THRESHOLD) return;

    if (!drag.active) {
      drag.active = true;
      setDragging(true);
      document.body.style.userSelect = "none";
    }

    const now = performance.now();
    const dt = now - drag.lastTime;
    if (dt > 0) {
      drag.velocity = (event.clientX - drag.lastX) / dt;
    }
    drag.lastX = event.clientX;
    drag.lastTime = now;

    gsap.set(track, { x: drag.originX + delta });
  }

  function settleFromDrag() {
    const drag = dragRef.current;
    const track = trackRef.current;
    dragRef.current = null;
    if (!drag) return;

    if (drag.active) {
      setDragging(false);
      document.body.style.userSelect = "";
    }

    if (!track || !drag.active) return;

    const currentX = Number(gsap.getProperty(track, "x")) || 0;
    const width = stepWidth();
    if (width <= 0) return;

    const projected = currentX + drag.velocity * 180;
    const rawIndex = Math.round(-projected / width);
    goTo(Math.min(maxIndex, Math.max(0, rawIndex)));
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    settleFromDrag();
  }

  return (
    <div
      ref={viewportRef}
      className="cursor-grab overflow-hidden py-(--space-slider-inset) active:cursor-grabbing touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={trackRef}
        className="flex items-stretch will-change-transform select-none"
        style={{ gap: "var(--space-slider-gap)" }}
      >
        {children}
      </div>
    </div>
  );
}
