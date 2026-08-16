"use client";

import Image from "next/image";
import { navCopy } from "@/content";
import { GlitchText } from "@/shared/ui/GlitchText";

type NavBrandProps = {
  onNavigate?: () => void;
  className?: string;
};

export function NavBrand({ onNavigate, className = "" }: NavBrandProps) {
  return (
    <a
      href={navCopy.brandHref}
      onClick={onNavigate}
      className={`group inline-flex min-h-10 items-center gap-2 text-text-primary min-[1100px]:gap-2.5 ${className}`.trim()}
    >
      <span className="relative size-5.5 shrink-0 transition-transform duration-200 group-hover:scale-105 min-[1100px]:size-7">
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="28px"
          className="object-contain object-center"
          priority
        />
      </span>
      <GlitchText
        text={navCopy.brandLabel}
        className="text-xs tracking-[0.13em] uppercase min-[1100px]:text-sm min-[1100px]:tracking-[0.16em]"
      />
    </a>
  );
}
