export function OrbitAccent() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-(--size-orbit-accent) text-accent-ice"
    >
      <svg
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        focusable="false"
        className="overflow-visible"
      >
        <circle
          cx="16"
          cy="16"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx="16" cy="5" r="2" fill="currentColor" />
      </svg>
    </span>
  );
}
