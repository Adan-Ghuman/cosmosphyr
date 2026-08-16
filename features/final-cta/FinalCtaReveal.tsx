import type { ReactNode } from "react";

type FinalCtaRevealProps = {
  children: ReactNode;
};

export function FinalCtaReveal({ children }: FinalCtaRevealProps) {
  return <div>{children}</div>;
}
