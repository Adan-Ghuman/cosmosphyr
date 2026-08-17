"use client";

export function HeroSideRays() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Left side volumetric beam */}
      <div className="absolute -top-24 -left-32 h-[120%] w-[55%] origin-top-left -rotate-12 opacity-35 blur-3xl transition-opacity duration-1000 md:opacity-45">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_left,rgba(142,191,212,0.35),rgba(30,41,59,0.15)_40%,transparent_75%)]" />
      </div>

      {/* Right side volumetric beam */}
      <div className="absolute -top-24 -right-32 h-[120%] w-[55%] origin-top-right rotate-12 opacity-35 blur-3xl transition-opacity duration-1000 md:opacity-45">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,rgba(142,191,212,0.35),rgba(30,41,59,0.15)_40%,transparent_75%)]" />
      </div>

      {/* Center atmospheric horizon lens light */}
      <div className="absolute top-1/2 left-1/2 h-72 w-[85%] max-w-4xl -translate-x-1/2 -translate-y-1/2 opacity-25 blur-3xl md:opacity-35">
        <div className="h-full w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(142,191,212,0.3),rgba(14,165,233,0.08)_50%,transparent_75%)]" />
      </div>

      {/* Precision laser vector ray lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rayGradLeft" x1="0%" y1="0%" x2="60%" y2="70%">
            <stop offset="0%" stopColor="#8ebfd4" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#8ebfd4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8ebfd4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rayGradRight" x1="100%" y1="0%" x2="40%" y2="70%">
            <stop offset="0%" stopColor="#8ebfd4" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#8ebfd4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8ebfd4" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon points="0,0 200,0 720,540 680,540" fill="url(#rayGradLeft)" />
        <polygon points="0,80 120,0 720,540 640,540" fill="url(#rayGradLeft)" opacity="0.6" />
        <polygon points="1440,0 1240,0 720,540 760,540" fill="url(#rayGradRight)" />
        <polygon points="1440,80 1320,0 720,540 800,540" fill="url(#rayGradRight)" opacity="0.6" />
      </svg>
    </div>
  );
}
