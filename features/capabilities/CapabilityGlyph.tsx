import type { CapabilityIcon } from "@/content";

type CapabilityGlyphProps = {
  icon: CapabilityIcon;
};

function Pictogram({ icon }: CapabilityGlyphProps) {
  if (icon === "ai") {
    return (
      <path
        d="M32 22c-4.4-3.2-8.8-3.4-12 0-1.8 1.9-2.6 4.4-2.4 7.1.3 3.4 2.2 6.4 5.2 8.1v3.3h14.4v-3.3c3-1.7 4.9-4.7 5.2-8.1.2-2.7-.6-5.2-2.4-7.1ZM26 22.2V18.8M38 22.2V18.8M24.5 40.5h15M27.5 44h9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }

  if (icon === "software") {
    return (
      <path
        d="M26 28 20 32l6 4M38 28l6 4-6 4M34 24l-4 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }

  if (icon === "web-mobile") {
    return (
      <>
        <rect
          x="18"
          y="22"
          width="20"
          height="14"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M24 40h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect
          x="40"
          y="26"
          width="8"
          height="14"
          rx="1.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="44" cy="37.5" r="0.7" fill="currentColor" />
      </>
    );
  }

  return (
    <path
      d="M28 38h16a8 8 0 0 0 1.2-15.9 10 10 0 0 0-19.4 2.1A7 7 0 0 0 28 38Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

export function CapabilityGlyph({ icon }: CapabilityGlyphProps) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex size-(--size-capability-glyph) shrink-0 text-text-primary"
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        focusable="false"
        className="overflow-visible"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        <circle
          cx="32"
          cy="32"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <Pictogram icon={icon} />
      </svg>
    </span>
  );
}
