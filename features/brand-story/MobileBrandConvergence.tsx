import type { ReactNode } from "react";

type MobileBrandConvergenceProps = {
  children: ReactNode;
};

export function MobileBrandConvergence({
  children,
}: MobileBrandConvergenceProps) {
  return (
    <div className="relative flex w-full min-h-(--size-brand-stage-mobile) flex-col items-center justify-center text-center md:min-h-0">
      {children}
    </div>
  );
}
