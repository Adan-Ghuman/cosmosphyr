import type { CapabilityIcon } from "@/content";

type CapabilityGlyphProps = {
  icon: CapabilityIcon;
};

function Pictogram({ icon }: CapabilityGlyphProps) {
  if (icon === "ai") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a8 8 0 0 0-8 8c0 2.8 1.4 5.3 3.6 6.7V19a1 1 0 0 0 1 1h6.8a1 1 0 0 0 1-1v-2.3c2.2-1.4 3.6-3.9 3.6-6.7a8 8 0 0 0-8-8z" />
        <path d="M9 22h6" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M9.5 14a3.5 3.5 0 0 0 5 0" />
      </svg>
    );
  }

  if (icon === "software") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    );
  }

  if (icon === "web-mobile") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="14" height="11" rx="2" />
        <path d="M6 18h6" />
        <path d="M9 14v4" />
        <rect x="15" y="8" width="7" height="13" rx="1.5" />
        <path d="M18.5 18h.01" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="M12 12v4" />
      <path d="m10 14 2 2 2-2" />
    </svg>
  );
}

export function CapabilityGlyph({ icon }: CapabilityGlyphProps) {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent-ice/25 bg-accent-ice/10 text-accent-ice shadow-[0_0_12px_rgba(142,191,212,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:border-accent-ice/60 group-hover:bg-accent-ice/20 group-hover:shadow-[0_0_18px_rgba(142,191,212,0.25)]"
    >
      <Pictogram icon={icon} />
    </span>
  );
}

