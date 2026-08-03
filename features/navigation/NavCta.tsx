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
      className={`inline-flex min-h-11 items-center text-sm text-accent-ice underline-offset-4 hover:underline ${className}`.trim()}
    >
      {navCopy.ctaLabel}
    </a>
  );
}
