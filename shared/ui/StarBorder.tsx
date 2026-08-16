"use client";

import React from "react";
import "./StarBorder.css";

type StarBorderProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export function StarBorder<T extends React.ElementType = "div">({
  as,
  className = "",
  innerClassName = "",
  color = "#8ebfd4",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={`star-border-container ${className}`.trim()}
      style={{
        padding: `${thickness}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="star-border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="star-border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div className={`relative z-10 w-full ${innerClassName}`.trim()}>
        {children}
      </div>
    </Component>
  );
}
