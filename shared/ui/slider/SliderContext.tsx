"use client";

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type SliderContextValue = {
  index: number;
  count: number;
  perView: number;
  maxIndex: number;
  dragging: boolean;
  setDragging: (value: boolean) => void;
  goTo: (next: number) => void;
  next: () => void;
  prev: () => void;
  pause: () => void;
  resume: () => void;
  setPaused: Dispatch<SetStateAction<boolean>>;
  reducedMotion: boolean;
};

export const SliderContext = createContext<SliderContextValue | null>(null);

export function useSlider() {
  const value = useContext(SliderContext);
  if (!value) {
    throw new Error("useSlider must be used within Slider");
  }
  return value;
}
