import Image from "next/image";
import { navCopy } from "@/content";

export function NavBrand() {
  return (
    <a
      href={navCopy.brandHref}
      className="inline-flex min-h-11 items-center gap-2 text-text-primary"
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
      <span className="font-display text-sm tracking-tight md:text-base">
        {navCopy.brandLabel}
      </span>
    </a>
  );
}
