export function SelectedWorkField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-accent-ice"
      style={{ opacity: "var(--opacity-work-field)" }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <filter
            id="selected-work-field-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path
            d="M20 420 C 260 180, 480 120, 600 360 C 720 600, 940 540, 1180 300"
            strokeWidth="1.05"
            opacity="0.5"
          />
          <path
            d="M20 300 C 280 140, 500 200, 600 360 C 700 520, 920 580, 1180 420"
            strokeWidth="0.8"
            opacity="0.32"
          />
          <path
            d="M80 560 C 320 480, 480 400, 600 360 C 720 320, 880 240, 1120 160"
            strokeWidth="0.6"
            opacity="0.22"
          />
        </g>
        <g fill="currentColor" filter="url(#selected-work-field-glow)">
          <circle cx="80" cy="300" r="2.6" />
          <circle cx="1120" cy="420" r="2.6" />
          <circle cx="360" cy="220" r="1.4" opacity="0.7" />
          <circle cx="840" cy="500" r="1.4" opacity="0.7" />
          <circle cx="520" cy="480" r="1.1" opacity="0.45" />
          <circle cx="700" cy="200" r="1.1" opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}
