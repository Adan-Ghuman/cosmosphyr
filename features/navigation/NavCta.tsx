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
      className={`cta-button text-sm tracking-wide uppercase ${className}`.trim()}
    >
      {navCopy.ctaLabel}
    </a>
  );
}
