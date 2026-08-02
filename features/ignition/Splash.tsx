"use client";

import { useConvergence } from "@/shared/motion";
import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IgnitionMark } from "./IgnitionMark";
import { getIgnitionSeen, setIgnitionSeen } from "./useIgnitionGate";

type Phase = "checking" | "play" | "done";

const CONVERGE_DURATION = 1.65;
const CONVERGE_STAGGER = 0.1;
const EXIT_DURATION = 0.35;
const REDUCED_EXIT_DURATION = 0.25;

function lockScroll() {
  const root = document.documentElement;
  root.dataset.ignitionScrollLock = "true";
  root.style.overflow = "hidden";
}

function unlockScroll() {
  const root = document.documentElement;
  if (root.dataset.ignitionScrollLock === "true") {
    delete root.dataset.ignitionScrollLock;
    root.style.overflow = "";
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Splash() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [marksReady, setMarksReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<SVGGElement>(null);
  const rightRef = useRef<SVGGElement>(null);
  const dismissedRef = useRef(false);
  const targets = useRef([leftRef, rightRef]).current;

  const dismiss = useCallback((reduced: boolean) => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setIgnitionSeen();

    const overlay = overlayRef.current;
    if (!overlay) {
      unlockScroll();
      setPhase("done");
      return;
    }

    gsap.to(overlay, {
      opacity: 0,
      duration: reduced ? REDUCED_EXIT_DURATION : EXIT_DURATION,
      ease: "power2.out",
      onComplete: () => {
        unlockScroll();
        setPhase("done");
      },
    });
  }, []);

  useLayoutEffect(() => {
    if (getIgnitionSeen()) {
      setPhase("done");
      return;
    }
    setPhase("play");
  }, []);

  useLayoutEffect(() => {
    if (phase !== "play") {
      setMarksReady(false);
      return;
    }
    if (leftRef.current && rightRef.current) {
      setMarksReady(true);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "play") return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "play") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      dismiss(prefersReducedMotion());
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, dismiss]);

  useConvergence(targets, {
    enabled: phase === "play" && marksReady,
    duration: CONVERGE_DURATION,
    stagger: CONVERGE_STAGGER,
    onComplete: () => {
      dismiss(prefersReducedMotion());
    },
  });

  if (phase === "checking" || phase === "done") {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      inert
      data-reduced-motion={prefersReducedMotion() ? "true" : "false"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <IgnitionMark leftRef={leftRef} rightRef={rightRef} />
    </div>
  );
}
