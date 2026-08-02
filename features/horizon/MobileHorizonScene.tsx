"use client";

import { useDeviceTier } from "@/shared/device/useDeviceTier";
import type { ReactNode } from "react";
import { CapableSceneSlot } from "./CapableSceneSlot";

type MobileHorizonSceneProps = {
  children: ReactNode;
  className?: string;
};

export function MobileHorizonScene({
  children,
  className = "",
}: MobileHorizonSceneProps) {
  const tier = useDeviceTier();

  return (
    <div className={`relative h-full w-full ${className}`.trim()} data-device-tier={tier}>
      {children}
      {tier === "full" ? <CapableSceneSlot /> : null}
    </div>
  );
}
