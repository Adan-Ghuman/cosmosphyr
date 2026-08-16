import type { ReactNode } from "react";

type SelectedWorkRevealProps = {
  children: ReactNode;
};

export function SelectedWorkReveal({ children }: SelectedWorkRevealProps) {
  return <div>{children}</div>;
}
