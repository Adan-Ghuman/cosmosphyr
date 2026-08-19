"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./ParticleText.css";

export interface ParticleTextProps {
  text?: string;
  texts?: string[];
  particleSize?: number;
  color?: string;
  highlightColor?: string;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  letterSpacing?: string | number;
  glow?: boolean;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

type Rgb = { r: number; g: number; b: number };
type Target = { x: number; y: number; color?: string; alpha: number };

type Particle = {
  x: number;
  y: number;
  logoX: number;
  logoY: number;
  textX: number;
  textY: number;
  logoColor: string;
  textColor: string;
  size: number;
  seed: number;
  depth: number;
  speed: number;
};

const hexToRgb = (hex: string): Rgb => {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return { r: 255, g: 255, b: 255 };
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb: Rgb): string => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function ParticleText({
  text: singleText,
  texts,
  particleSize = 1.8,
  color = "#ffffff",
  highlightColor = "#8ebfd4",
  pointerRepel = 45,
  repelRadius = 100,
  idleDrift = 0.45,
  fontSize = "clamp(1.25rem, 3vw, 2.15rem)",
  fontWeight = 500,
  fontFamily = '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing = "0.06em",
  glow = true,
  onActiveIndexChange,
  className = "",
  style,
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const phraseList = texts && texts.length > 0 ? texts : [singleText || "Cosmosphyr"];
  const [currentTextIdx, setCurrentTextIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame: number | null = null;
    
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reducedMotion = mediaQuery?.matches ?? false;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    mediaQuery?.addEventListener("change", handleMotionChange);

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    };

    const PARTICLE_COUNT = 1800;
    const baseRgb = hexToRgb(color);
    const highlightRgb = hexToRgb(highlightColor);

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const seed = ((i * 9301 + 49297) % 233280) / 233280;
      const depth = 0.4 + (((i * 233 + 97) % 1000) / 1000) * 0.9;
      const blend = clamp((seed * 1.3) % 1, 0, 1);
      const textColor = rgbToCss(mixRgb(baseRgb, highlightRgb, blend));

      particles.push({
        x: 0,
        y: 0,
        logoX: 0,
        logoY: 0,
        textX: 0,
        textY: 0,
        logoColor: "#8ebfd4",
        textColor,
        size: Math.max(0.75, particleSize * (0.7 + seed * 0.5)),
        seed,
        depth,
        speed: 0.7 + seed * 0.6,
      });
    }

    // 4-Phase Lifecycle:
    // Phase 0: LOGO (Cosmosphyr Logo Silhouette with orbital breathing & photon sweep) -> 1900ms
    // Phase 1: FORM_TEXT (Burst gather into text) -> 1200ms
    // Phase 2: HOLD_TEXT (Text held, readable, reactive) -> 2500ms
    // Phase 3: RETURN_TO_LOGO (Smooth return into living logo) -> 1100ms
    const TIME_LOGO = 1900;
    const TIME_FORM = 1200;
    const TIME_HOLD = 2500;
    const TIME_RETURN = 1100;
    const TOTAL_CYCLE = TIME_LOGO + TIME_FORM + TIME_HOLD + TIME_RETURN;

    let cycleStartTime = performance.now();
    let currentIdx = 0;
    let logoLoaded = false;
    let logoImage: HTMLImageElement | null = null;

    // Single persistent offscreen canvas & context for zero-allocation sampling
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    const phraseCache = new Map<string, Target[]>();

    // Sample logo pixels from /logo.png
    const sampleLogoTargets = (img: HTMLImageElement, targetWidth: number, targetHeight: number): Target[] => {
      if (!offCtx) return [];

      // Desired logo display dimensions (centered, optimal scale)
      const logoDiameter = Math.min(targetWidth * 0.38, targetHeight * 0.88, 200);
      const offW = 360;
      const offH = 360;
      offscreen.width = offW;
      offscreen.height = offH;

      const drawX = (offW - logoDiameter) / 2;
      const drawY = (offH - logoDiameter) / 2;

      offCtx.clearRect(0, 0, offW, offH);
      offCtx.drawImage(img, drawX, drawY, logoDiameter, logoDiameter);

      const imgData = offCtx.getImageData(0, 0, offW, offH);
      const targets: Target[] = [];
      const cx = targetWidth / 2;
      const cy = targetHeight / 2;
      const step = 2;

      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          const idx = (y * offW + x) * 4;
          const r = imgData.data[idx];
          const g = imgData.data[idx + 1];
          const b = imgData.data[idx + 2];
          const a = imgData.data[idx + 3];

          const dx = x - offW / 2;
          const dy = y - offH / 2;
          const distFromCenter = Math.hypot(dx, dy);

          // Keep clean logo silhouette and eliminate stray horizontal line
          if (a > 35 && distFromCenter <= logoDiameter * 0.52) {
            const brightness = (r + g + b) / 3;
            let pColor = rgbToCss({ r, g, b });
            if (brightness < 60) {
              pColor = rgbToCss(mixRgb({ r, g, b }, highlightRgb, 0.7));
            } else if (brightness > 200) {
              pColor = "#ffffff";
            }

            targets.push({
              x: dx + cx,
              y: dy + cy,
              color: pColor,
              alpha: a / 255,
            });
          }
        }
      }

      return targets;
    };

    const updateLogoTargets = () => {
      if (!logoImage || !logoLoaded) return;
      const logoTargets = sampleLogoTargets(logoImage, width, height);
      if (logoTargets.length === 0) return;

      const stride = Math.max(1, Math.floor(logoTargets.length / PARTICLE_COUNT));

      particles.forEach((p, index) => {
        const tIdx = (index * stride) % logoTargets.length;
        const t = logoTargets[tIdx];
        p.logoX = t.x + (p.seed - 0.5) * 1.5;
        p.logoY = t.y + (p.seed - 0.5) * 1.5;
        if (t.color) p.logoColor = t.color;
      });
    };

    // Accurate Text Pixel Sampling with memoization
    const samplePhraseTargets = (phrase: string, targetWidth: number, targetHeight: number): Target[] => {
      if (phraseCache.has(phrase)) {
        return phraseCache.get(phrase)!;
      }
      if (!offCtx) return [];

      const offW = 1200;
      const offH = 260;
      offscreen.width = offW;
      offscreen.height = offH;

      let pxSize = 32;
      const letterSpaceStr = typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing;

      if (typeof fontSize === "number") {
        pxSize = fontSize;
      } else {
        const probe = document.createElement("span");
        probe.textContent = phrase;
        probe.style.position = "absolute";
        probe.style.visibility = "hidden";
        probe.style.fontSize = fontSize;
        probe.style.fontWeight = String(fontWeight);
        probe.style.fontFamily = fontFamily;
        probe.style.letterSpacing = letterSpaceStr;
        container.appendChild(probe);
        pxSize = parseFloat(window.getComputedStyle(probe).fontSize) || 32;
        probe.remove();
      }

      const maxAllowed = Math.min(targetWidth * 0.82, 580);
      offCtx.font = `${fontWeight} ${pxSize}px ${fontFamily}`;
      try {
        (offCtx as any).letterSpacing = letterSpaceStr;
      } catch {}
      let metrics = offCtx.measureText(phrase);
      if (metrics.width > maxAllowed && metrics.width > 0) {
        pxSize = Math.max(16, Math.floor(pxSize * (maxAllowed / metrics.width)));
        offCtx.font = `${fontWeight} ${pxSize}px ${fontFamily}`;
      }

      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(phrase, offW / 2, offH / 2);

      const imgData = offCtx.getImageData(0, 0, offW, offH);
      const targets: Target[] = [];
      const step = 2;

      const cx = targetWidth / 2;
      const cy = targetHeight / 2;

      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          const alpha = imgData.data[(y * offW + x) * 4 + 3];
          if (alpha > 45) {
            targets.push({
              x: x - offW / 2 + cx,
              y: y - offH / 2 + cy,
              alpha: alpha / 255,
            });
          }
        }
      }

      phraseCache.set(phrase, targets);
      return targets;
    };

    const updatePhraseTargets = (phraseIdx: number) => {
      const phrase = phraseList[phraseIdx % phraseList.length];
      const targets = samplePhraseTargets(phrase, width, height);
      if (targets.length === 0) return;

      const stride = Math.max(1, Math.floor(targets.length / PARTICLE_COUNT));

      particles.forEach((p, index) => {
        const targetIdx = (index * stride) % targets.length;
        const t = targets[targetIdx];
        p.textX = t.x + (p.seed - 0.5) * 1.5;
        p.textY = t.y + (p.seed - 0.5) * 1.5;
      });

      const nextIdx = phraseIdx % phraseList.length;
      setCurrentTextIdx(nextIdx);
      onActiveIndexChange?.(nextIdx);
    };

    const getDpr = () => {
      if (typeof window === "undefined") return 1;
      const dpr = window.devicePixelRatio || 1;
      return window.innerWidth < 768 ? Math.min(dpr, 1.5) : Math.min(dpr, 2.0);
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;

      dpr = getDpr();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      phraseCache.clear();
      updateLogoTargets();
      updatePhraseTargets(currentIdx);
    };

    // Load logo image
    logoImage = new Image();
    logoImage.crossOrigin = "anonymous";
    logoImage.onload = () => {
      logoLoaded = true;
      updateLogoTargets();
    };
    logoImage.src = "/logo.png";
    if (logoImage.complete) {
      logoLoaded = true;
    }

    let isVisible = false;

    const startLoop = () => {
      if (animationFrame === null && isVisible && !document.hidden) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
          if (isVisible) {
            startLoop();
          } else {
            stopLoop();
          }
        }
      },
      { threshold: 0, rootMargin: "100px" }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (container) {
        const rect = container.getBoundingClientRect();
        isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("resize", handleResize);
    handleResize();

    // Render loop
    const render = (now: number) => {
      if (!isVisible || document.hidden) {
        animationFrame = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.15;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.15;

      const elapsed = (now - cycleStartTime) % TOTAL_CYCLE;
      const activePhraseIdx = Math.floor((now - cycleStartTime) / TOTAL_CYCLE);

      if (activePhraseIdx !== currentIdx) {
        currentIdx = activePhraseIdx;
        updatePhraseTargets(currentIdx);
      }

      let state = 0; // 0: Logo, 1: Form Text, 2: Hold Text, 3: Return to Logo
      let stateProgress = 0;

      if (elapsed < TIME_LOGO) {
        state = 0;
        stateProgress = clamp(elapsed / TIME_LOGO, 0, 1);
      } else if (elapsed < TIME_LOGO + TIME_FORM) {
        state = 1;
        stateProgress = clamp((elapsed - TIME_LOGO) / TIME_FORM, 0, 1);
      } else if (elapsed < TIME_LOGO + TIME_FORM + TIME_HOLD) {
        state = 2;
        stateProgress = clamp((elapsed - TIME_LOGO - TIME_FORM) / TIME_HOLD, 0, 1);
      } else {
        state = 3;
        stateProgress = clamp((elapsed - TIME_LOGO - TIME_FORM - TIME_HOLD) / TIME_RETURN, 0, 1);
      }

      const cx = width / 2;
      const cy = height / 2;

      // Global logo dynamics (slow celestial precession & harmonic breathing pulse)
      const rotAngle = Math.sin(now * 0.0009) * 0.07;
      const cosR = Math.cos(rotAngle);
      const sinR = Math.sin(rotAngle);
      const pulse = 1.0 + Math.sin(now * 0.0022) * 0.035;

      particles.forEach((p) => {
        // Calculate animated position on the logo mark
        const ldx = (p.logoX || cx) - cx;
        const ldy = (p.logoY || cy) - cy;
        const angle = Math.atan2(ldy, ldx);

        // Precession + breathing
        const rldx = (ldx * cosR - ldy * sinR) * pulse;
        const rldy = (ldx * sinR + ldy * cosR) * pulse;
        const animatedLogoX = cx + rldx;
        const animatedLogoY = cy + rldy;

        // Photon gleam wave along the "S" wing contours
        const photonWave = Math.sin(angle * 2.0 - now * 0.003 + p.seed * 2.5);
        const isGleam = photonWave > 0.72;
        const dynamicLogoColor = isGleam ? "#ffffff" : p.logoColor;

        let targetX = animatedLogoX;
        let targetY = animatedLogoY;
        let pColor = dynamicLogoColor;

        if (reducedMotion) {
          targetX = p.textX;
          targetY = p.textY;
          pColor = p.textColor;
        } else {
          switch (state) {
            case 0: {
              // LOGO STATE: Living celestial logo with subtle organic drift & cursor repulsion
              const shimmerTime = now * 0.001;
              const shimmerX = Math.sin(shimmerTime * 1.2 + p.seed * 8) * 0.9 * p.depth;
              const shimmerY = Math.cos(shimmerTime * 1.0 + p.seed * 8) * 0.9 * p.depth;
              targetX = animatedLogoX + shimmerX;
              targetY = animatedLogoY + shimmerY;
              pColor = dynamicLogoColor;

              if (pointer.active && pointerRepel > 0) {
                const dx = targetX - pointer.smoothX;
                const dy = targetY - pointer.smoothY;
                const dist = Math.hypot(dx, dy);
                if (dist > 0 && dist < repelRadius * 1.1) {
                  const force = Math.pow(1 - dist / (repelRadius * 1.1), 2) * (pointerRepel * 0.85);
                  targetX += (dx / dist) * force;
                  targetY += (dy / dist) * force;
                }
              }
              break;
            }
            case 1: {
              // FORM TEXT: Particles burst out from animated logo into text
              const delayedProgress = clamp(
                (stateProgress - (1 - p.depth) * 0.2) / 0.8,
                0,
                1
              );
              const eased = easeOutCubic(delayedProgress);
              targetX = animatedLogoX * (1 - eased) + p.textX * eased;
              targetY = animatedLogoY * (1 - eased) + p.textY * eased;
              pColor = p.textColor;
              break;
            }
            case 2: {
              // HOLD TEXT: Readable text with gentle idle drift and cursor repulsion
              const driftTime = now * 0.001;
              const driftX = Math.sin(driftTime * 0.8 + p.seed * 7) * idleDrift * p.depth;
              const driftY = Math.cos(driftTime * 0.7 + p.seed * 7) * idleDrift * p.depth;
              targetX = p.textX + driftX;
              targetY = p.textY + driftY;
              pColor = p.textColor;

              if (pointer.active && pointerRepel > 0) {
                const dx = targetX - pointer.smoothX;
                const dy = targetY - pointer.smoothY;
                const dist = Math.hypot(dx, dy);
                if (dist > 0 && dist < repelRadius) {
                  const force = Math.pow(1 - dist / repelRadius, 2) * pointerRepel;
                  targetX += (dx / dist) * force;
                  targetY += (dy / dist) * force;
                }
              }
              break;
            }
            case 3: {
              // RETURN TO LOGO: Particles accelerate smoothly back into the living logo
              const eased = easeInOutCubic(stateProgress);
              targetX = p.textX * (1 - eased) + animatedLogoX * eased;
              targetY = p.textY * (1 - eased) + animatedLogoY * eased;
              pColor = stateProgress > 0.5 ? dynamicLogoColor : p.textColor;
              break;
            }
          }
        }

        const easeFollow = reducedMotion ? 1 : 0.22;
        p.x += (targetX - p.x) * easeFollow;
        p.y += (targetY - p.y) * easeFollow;

        ctx.fillStyle = pColor;
        const size = p.size;
        if (size <= 2.0) {
          ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(render);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stopLoop();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery?.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    phraseList,
    color,
    highlightColor,
    fontSize,
    fontWeight,
    fontFamily,
    letterSpacing,
    particleSize,
    glow,
    pointerRepel,
    repelRadius,
    idleDrift,
    onActiveIndexChange,
  ]);

  const activePhrase = phraseList[currentTextIdx % phraseList.length];

  return (
    <div
      ref={containerRef}
      className={`particle-text ${className}`}
      style={style}
      aria-label={activePhrase}
    >
      <canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" />
      <span className="particle-text__sr" aria-live="polite">
        {activePhrase}
      </span>
    </div>
  );
}
