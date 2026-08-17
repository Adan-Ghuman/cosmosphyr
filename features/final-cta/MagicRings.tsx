"use client";

export function MagicRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      {/* Concentric pulsing cosmic orbital rings */}
      <div className="relative flex h-[500px] w-[500px] items-center justify-center">
        <div className="absolute h-full w-full rounded-full border border-accent-ice/15 animate-[ping_7s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
        <div className="absolute h-[380px] w-[380px] rounded-full border border-accent-ice/20 animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute h-[260px] w-[260px] rounded-full border border-accent-ice/30 shadow-[0_0_50px_rgba(142,191,212,0.15)]" />
        <div className="absolute h-[140px] w-[140px] rounded-full bg-[radial-gradient(circle,rgba(142,191,212,0.25)_0%,transparent_70%)] blur-md" />
      </div>
    </div>
  );
}
