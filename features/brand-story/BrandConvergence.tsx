import type { ReactNode } from "react";

type BrandConvergenceProps = {
  children: ReactNode;
};

export function BrandConvergence({ children }: BrandConvergenceProps) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center text-center md:min-h-(--size-brand-stage-desktop)">
      {children}
    </div>
  );
}
