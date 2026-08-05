import Image from "next/image";
import { navCopy } from "@/content";

type NavBrandProps = {
  onNavigate?: () => void;
  className?: string;
};

export function NavBrand({ onNavigate, className = "" }: NavBrandProps) {
  return (
    <a
      href={navCopy.brandHref}
      onClick={onNavigate}
      className={`inline-flex min-h-11 items-center gap-2 text-text-primary ${className}`.trim()}
    >
      <span className="relative size-7 shrink-0">
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="28px"
          className="object-contain object-center"
          priority
        />
      </span>
      <span className="font-display text-sm tracking-[0.14em] uppercase md:text-base">
        {navCopy.brandLabel}
      </span>
    </a>
  );
}
