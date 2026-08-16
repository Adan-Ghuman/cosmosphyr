"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import "./GooeyNav.css";

type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  activeHref?: string | null;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  onNavigate?: () => void;
};

export function GooeyNav({
  items,
  activeHref,
  animationTime = 420,
  particleCount = 14,
  particleDistances = [46, 10],
  particleR = 60,
  timeVariance = 180,
  colors = [1, 2, 3, 1, 2, 4],
  initialActiveIndex = 0,
  onNavigate,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const isClickLockedRef = useRef(false);
  const clickLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const matchedIndex = activeHref
    ? items.findIndex((item) => item.href === activeHref)
    : -1;

  const [activeIndex, setActiveIndex] = useState(
    matchedIndex >= 0 ? matchedIndex : initialActiveIndex
  );

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = useCallback(
    (element: HTMLElement) => {
      const d = particleDistances;
      const r = particleR;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty("--time", `${bubbleTime}ms`);

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const p = createParticle(i, t, d, r);
        element.classList.remove("active");

        setTimeout(() => {
          const particle = document.createElement("span");
          const point = document.createElement("span");
          particle.classList.add("particle");
          particle.style.setProperty("--start-x", `${p.start[0]}px`);
          particle.style.setProperty("--start-y", `${p.start[1]}px`);
          particle.style.setProperty("--end-x", `${p.end[0]}px`);
          particle.style.setProperty("--end-y", `${p.end[1]}px`);
          particle.style.setProperty("--time", `${p.time}ms`);
          particle.style.setProperty("--scale", `${p.scale}`);
          particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
          particle.style.setProperty("--rotate", `${p.rotate}deg`);

          point.classList.add("point");
          particle.appendChild(point);
          element.appendChild(particle);

          requestAnimationFrame(() => {
            element.classList.add("active");
          });

          setTimeout(() => {
            try {
              element.removeChild(particle);
            } catch {
              // Ignore removal if unmounted
            }
          }, t);
        }, 20);
      }
    },
    [animationTime, colors, particleCount, particleDistances, particleR, timeVariance]
  );

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const triggerGooey = useCallback(
    (index: number, liEl: HTMLElement, withParticles = true) => {
      setActiveIndex(index);
      updateEffectPosition(liEl);

      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll(".particle");
        particles.forEach((p) => filterRef.current?.removeChild(p));
      }

      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }

      if (filterRef.current && withParticles) {
        makeParticles(filterRef.current);
      }
    },
    [makeParticles, updateEffectPosition]
  );

  // Synchronize when scroll-spy activeHref changes, unless user just clicked
  useEffect(() => {
    if (!activeHref || !navRef.current) return;
    if (isClickLockedRef.current) return;

    const idx = items.findIndex((item) => item.href === activeHref);
    if (idx >= 0 && idx !== activeIndex) {
      const activeLi = navRef.current.querySelectorAll("li")[idx];
      if (activeLi) {
        triggerGooey(idx, activeLi as HTMLElement, true);
      }
    }
  }, [activeHref, activeIndex, items, triggerGooey]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi as HTMLElement);
      textRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi as HTMLElement);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, updateEffectPosition]);

  // Clean up lock timeout on unmount
  useEffect(() => {
    return () => {
      if (clickLockTimeoutRef.current) {
        clearTimeout(clickLockTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = e.currentTarget.closest("li");
    if (!liEl || activeIndex === index) return;

    // Lock scroll-spy updates while smooth scrolling so intermediate sections don't jump the pill
    isClickLockedRef.current = true;
    if (clickLockTimeoutRef.current) {
      clearTimeout(clickLockTimeoutRef.current);
    }
    clickLockTimeoutRef.current = setTimeout(() => {
      isClickLockedRef.current = false;
    }, 850);

    triggerGooey(index, liEl as HTMLElement, true);
    onNavigate?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.closest("li");
      if (liEl) {
        isClickLockedRef.current = true;
        if (clickLockTimeoutRef.current) {
          clearTimeout(clickLockTimeoutRef.current);
        }
        clickLockTimeoutRef.current = setTimeout(() => {
          isClickLockedRef.current = false;
        }, 850);

        triggerGooey(index, liEl as HTMLElement, true);
        onNavigate?.();
      }
    }
  };

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav aria-label="Desktop Nav">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.href}
              className={activeIndex === index ? "active" : ""}
            >
              <a
                href={item.href}
                onClick={(e) => handleClick(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}
