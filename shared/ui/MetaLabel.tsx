import type { ReactNode } from "react";

type MetaLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Uppercase accent label for field/meta rows (Proof, case-study fields). */
export function MetaLabel({ children, className = "" }: MetaLabelProps) {
  return (
    <p
      className={`text-sm tracking-wide text-accent-ice uppercase ${className}`.trim()}
    >
      {children}
    </p>
  );
}
