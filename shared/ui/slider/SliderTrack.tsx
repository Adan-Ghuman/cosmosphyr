"use client";

import { Children, useMemo, type ReactNode } from "react";
import { SliderTrackMotion } from "./SliderTrackMotion";

type SliderTrackProps = {
  children: ReactNode;
};

export function SliderTrack({ children }: SliderTrackProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);

  return <SliderTrackMotion>{slides}</SliderTrackMotion>;
}
