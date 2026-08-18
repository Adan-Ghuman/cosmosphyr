"use client";

import React, { useEffect, useState } from "react";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "speedUp" | "slowDown" | "pause" | "goBonkers";
  className?: string;
  radius?: number;
}

export function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  radius = 60,
}: CircularTextProps) {
  const [currentDuration, setCurrentDuration] = useState(spinDuration);
  const [isPaused, setIsPaused] = useState(false);

  const letters = Array.from(text);
  const size = radius * 2 + 30;

  const handleMouseEnter = () => {
    switch (onHover) {
      case "speedUp":
        setCurrentDuration(spinDuration / 4);
        break;
      case "slowDown":
        setCurrentDuration(spinDuration * 2);
        break;
      case "pause":
        setIsPaused(true);
        break;
      case "goBonkers":
        setCurrentDuration(spinDuration / 10);
        break;
    }
  };

  const handleMouseLeave = () => {
    setCurrentDuration(spinDuration);
    setIsPaused(false);
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 flex items-center justify-center transition-[animation-duration] duration-500"
        style={{
          animation: isPaused
            ? "none"
            : `spin ${currentDuration}s linear infinite`,
        }}
      >
        {letters.map((letter, i) => {
          const deg = (360 / letters.length) * i;
          return (
            <span
              key={i}
              className="absolute text-[10px] font-mono tracking-widest text-accent-ice/70 uppercase transition-colors hover:text-accent-ice"
              style={{
                transform: `rotate(${deg}deg) translate(${radius}px) rotate(90deg)`,
                transformOrigin: "center center",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
