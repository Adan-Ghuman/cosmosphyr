"use client";

import { type CSSProperties } from "react";
import "./ShinyText.css";

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4.5,
  className = "",
  style,
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{
        ...style,
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
