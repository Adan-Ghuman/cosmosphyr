"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./BlurText.css";

export interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text,
  delay = 55,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.15,
  rootMargin = "0px",
  style,
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const fromTransform =
    direction === "top" ? "translate3d(0, -14px, 0)" : "translate3d(0, 14px, 0)";

  return (
    <p ref={ref} className={`blur-text ${className}`} style={style}>
      {elements.map((element, index) => (
        <span
          key={`${element}-${index}`}
          className="blur-text__segment inline-block transition-all duration-700 ease-out will-change-[transform,filter,opacity]"
          style={{
            transitionDelay: `${index * delay}ms`,
            opacity: inView ? 1 : 0,
            filter: inView ? "blur(0px)" : "blur(8px)",
            transform: inView ? "translate3d(0, 0, 0)" : fromTransform,
          }}
          onTransitionEnd={() => {
            animatedCount.current += 1;
            if (animatedCount.current === elements.length) {
              onAnimationComplete?.();
            }
          }}
        >
          {element}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </p>
  );
}
