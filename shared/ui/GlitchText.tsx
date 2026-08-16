"use client";

import { useState } from "react";
import "./GlitchText.css";

type GlitchTextProps = {
  text: string;
  className?: string;
};

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      data-text={text}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      className={`glitch-text-wrapper relative inline-block font-display select-none ${
        isGlitching ? "is-glitching" : ""
      } ${className}`.trim()}
    >
      <span className="glitch-text-main relative z-10">{text}</span>
      <span
        aria-hidden="true"
        data-text={text}
        className="glitch-copy glitch-copy-1 absolute inset-0 z-0 pointer-events-none"
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        data-text={text}
        className="glitch-copy glitch-copy-2 absolute inset-0 z-0 pointer-events-none"
      >
        {text}
      </span>
    </span>
  );
}
