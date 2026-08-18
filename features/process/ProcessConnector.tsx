"use client";

import React from "react";

interface ProcessConnectorProps {
  orientation?: "horizontal" | "vertical";
}

export function ProcessConnector({ orientation = "horizontal" }: ProcessConnectorProps) {
  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className="relative my-2 flex h-8 w-full items-center justify-center md:hidden"
      >
        {/* Glowing vertical line */}
        <div className="h-full w-[2px] bg-gradient-to-b from-accent-ice/30 via-accent-ice/80 to-accent-ice/30 shadow-[0_0_8px_rgba(142,191,212,0.4)]" />
        {/* Center node */}
        <div className="absolute h-2 w-2 rounded-full border border-accent-ice/80 bg-surface-base shadow-[0_0_6px_rgba(142,191,212,0.6)]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative hidden items-center justify-center lg:flex lg:w-4 lg:shrink-0 xl:w-6"
    >
      {/* Horizontal conduit line */}
      <div className="relative h-[2px] w-full bg-gradient-to-r from-accent-ice/20 via-accent-ice/70 to-accent-ice/20 shadow-[0_0_8px_rgba(142,191,212,0.3)]">
        {/* Animated traveling photon packet */}
        <div className="absolute top-1/2 -mt-[2px] h-1 w-2.5 rounded-full bg-accent-ice shadow-[0_0_6px_#8ebfd4] animate-[conduitTravel_2.2s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes conduitTravel {
          0% {
            left: 0%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 90%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
