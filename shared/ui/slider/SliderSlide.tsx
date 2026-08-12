import type { ReactNode } from "react";

type SliderSlideProps = {
  children: ReactNode;
  label: string;
};

export function SliderSlide({ children, label }: SliderSlideProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      className="min-w-0 shrink-0 p-(--space-slider-inset)"
    >
      {children}
    </div>
  );
}
