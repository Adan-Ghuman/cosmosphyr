import { navCopy } from "@/content";

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

export function NavLinks({ className = "", onNavigate }: NavLinksProps) {
  return (
    <ul
      className={`flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2 p-0 ${className}`.trim()}
    >
      {navCopy.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onNavigate}
            className="inline-flex min-h-11 items-center text-sm text-text-primary/80 underline-offset-4 hover:text-text-primary hover:underline"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
