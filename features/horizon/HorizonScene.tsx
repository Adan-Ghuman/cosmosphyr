import type { ReactNode } from "react";

type HorizonSceneProps = {
  children?: ReactNode;
  className?: string;
};

export function HorizonScene({ children = null, className = "" }: HorizonSceneProps) {
  return (
    <div className={`relative h-full w-full ${className}`.trim()}>{children}</div>
  );
}
