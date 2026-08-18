import React from "react";

interface GlyphProps {
  className?: string;
  size?: number;
}

export function CuriosityGlyph({ className = "text-accent-ice", size = 44 }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 3" />
      <circle cx="22" cy="22" r="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx="22" cy="22" r="2.5" fill="currentColor" />
      <line x1="22" y1="2" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="36" x2="22" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="22" x2="8" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="31.8" cy="12.2" r="1.5" fill="currentColor" className="animate-ping opacity-75" />
    </svg>
  );
}

export function ExplorationGlyph({ className = "text-accent-ice", size = 44 }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central anchor node */}
      <circle cx="10" cy="34" r="3" fill="currentColor" />
      {/* Branch vectors */}
      <path
        d="M10 34 C 18 34, 16 18, 34 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      <path
        d="M10 34 C 22 34, 26 26, 34 26"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        strokeOpacity="0.5"
      />
      {/* Target nodes */}
      <circle cx="34" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="#000" />
      <circle cx="34" cy="10" r="1.5" fill="currentColor" />
      <circle cx="34" cy="26" r="2" fill="currentColor" strokeOpacity="0.5" />
      {/* Trajectory radar arcs */}
      <path
        d="M26 6 A 20 20 0 0 1 38 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />
      {/* Corner crosshairs */}
      <path d="M4 8 H8 V4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <path d="M40 36 H36 V40" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

export function EngineeringGlyph({ className = "text-accent-ice", size = 44 }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Isometric structural lattice */}
      <path
        d="M22 6 L36 14 V30 L22 38 L8 30 V14 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <path
        d="M22 6 V22 M36 14 L22 22 L8 14 M22 22 V38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.8"
        strokeLinecap="round"
      />
      <circle cx="22" cy="22" r="3" fill="currentColor" />
      <circle cx="22" cy="6" r="1.5" fill="currentColor" />
      <circle cx="36" cy="14" r="1.5" fill="currentColor" />
      <circle cx="36" cy="30" r="1.5" fill="currentColor" />
      <circle cx="22" cy="38" r="1.5" fill="currentColor" />
      <circle cx="8" cy="30" r="1.5" fill="currentColor" />
      <circle cx="8" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ImpactGlyph({ className = "text-accent-ice", size = 44 }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Radiant horizon wave & core impact burst */}
      <ellipse cx="22" cy="22" rx="19" ry="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" transform="rotate(-20 22 22)" />
      <ellipse cx="22" cy="22" rx="14" ry="5" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.6" transform="rotate(-20 22 22)" />
      <circle cx="22" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" fill="#000" />
      <circle cx="22" cy="22" r="2.5" fill="currentColor" />
      {/* Horizon rays */}
      <line x1="4" y1="22" x2="13" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      <line x1="31" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      <line x1="22" y1="4" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      <line x1="22" y1="31" x2="22" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    </svg>
  );
}

export function getProcessGlyph(id: string, className?: string, size?: number) {
  switch (id) {
    case "curiosity":
      return <CuriosityGlyph className={className} size={size} />;
    case "exploration":
      return <ExplorationGlyph className={className} size={size} />;
    case "engineering":
      return <EngineeringGlyph className={className} size={size} />;
    case "impact":
      return <ImpactGlyph className={className} size={size} />;
    default:
      return <CuriosityGlyph className={className} size={size} />;
  }
}
