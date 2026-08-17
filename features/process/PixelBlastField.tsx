"use client";

import { useEffect, useRef } from "react";
import { useCanvasInView } from "@/shared/hooks/useCanvasInView";

interface PixelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export function PixelBlastField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useCanvasInView(containerRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    let particles: PixelParticle[] = [];
    const colors = ["#8ebfd4", "#60a5fa", "#ffffff", "#38bdf8"];

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const spawnBlast = (x: number, y: number, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() < 0.6 ? 2 : 3.5,
          alpha: 0.85 + Math.random() * 0.15,
          decay: 0.012 + Math.random() * 0.018,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      const now = performance.now();
      if (now - lastMoveTime < 45) return; // Throttled burst spawn
      lastMoveTime = now;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnBlast(x, y, 6);
    };

    const handleClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnBlast(x, y, 28);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    // Periodic ambient digital pixel twitches
    let timer = 0;
    function render() {
      if (!isInView || document.hidden || !ctx) {
        animationFrameId = 0;
        return;
      }

      timer++;
      if (timer % 35 === 0 && particles.length < 50) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        spawnBlast(rx, ry, 4);
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        // Pixel block shape
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    }

    if (isInView) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isInView]);


  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-55" />
    </div>
  );
}
