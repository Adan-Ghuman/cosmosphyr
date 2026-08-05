import { navCopy } from "@/content";

type NavCtaProps = {
  className?: string;
  onNavigate?: () => void;
};

export function NavCta({ className = "", onNavigate }: NavCtaProps) {
  return (
    <a
      href={navCopy.ctaHref}
      onClick={onNavigate}
      className={`inline-flex min-h-11 items-center justify-center rounded-(--radius-cta) border border-(--color-cta-border) px-5 text-sm tracking-wide text-accent-ice uppercase shadow-(--shadow-cta-glow) transition-colors hover:bg-accent-ice/10 ${className}`.trim()}
    >
      {navCopy.ctaLabel}
    </a>
  );
}
