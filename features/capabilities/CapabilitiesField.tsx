export function CapabilitiesField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-accent-ice"
      style={{ opacity: "var(--opacity-capability-field)" }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <filter
            id="capability-field-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path
            d="M40 360 C 220 120, 420 80, 600 360 C 780 640, 980 600, 1160 360"
            strokeWidth="1.15"
            opacity="0.55"
          />
          <path
            d="M40 360 C 240 200, 400 160, 600 360 C 800 560, 960 520, 1160 360"
            strokeWidth="0.9"
            opacity="0.4"
          />
          <path
            d="M40 360 C 260 500, 430 540, 600 360 C 770 180, 940 220, 1160 360"
            strokeWidth="0.9"
            opacity="0.4"
          />
          <path
            d="M40 360 C 280 80, 480 40, 600 360 C 720 680, 920 640, 1160 360"
            strokeWidth="0.7"
            opacity="0.28"
          />
          <path
            d="M80 360 C 300 280, 460 250, 600 360 C 740 470, 900 440, 1120 360"
            strokeWidth="0.6"
            opacity="0.22"
          />
          <path
            d="M120 200 C 280 140, 500 220, 600 360"
            strokeWidth="0.55"
            opacity="0.2"
          />
          <path
            d="M1080 200 C 920 140, 700 220, 600 360"
            strokeWidth="0.55"
            opacity="0.2"
          />
          <path
            d="M120 520 C 280 580, 500 500, 600 360"
            strokeWidth="0.55"
            opacity="0.2"
          />
          <path
            d="M1080 520 C 920 580, 700 500, 600 360"
            strokeWidth="0.55"
            opacity="0.2"
          />
        </g>
        <g fill="currentColor" filter="url(#capability-field-glow)">
          <circle cx="40" cy="360" r="3.2" />
          <circle cx="1160" cy="360" r="3.2" />
          <circle cx="220" cy="210" r="1.6" opacity="0.7" />
          <circle cx="980" cy="210" r="1.6" opacity="0.7" />
          <circle cx="260" cy="510" r="1.4" opacity="0.55" />
          <circle cx="940" cy="510" r="1.4" opacity="0.55" />
          <circle cx="430" cy="140" r="1.2" opacity="0.45" />
          <circle cx="770" cy="140" r="1.2" opacity="0.45" />
          <circle cx="480" cy="560" r="1.2" opacity="0.4" />
          <circle cx="720" cy="560" r="1.2" opacity="0.4" />
          <circle cx="340" cy="330" r="1" opacity="0.35" />
          <circle cx="860" cy="330" r="1" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
