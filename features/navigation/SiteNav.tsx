import { NavBrand } from "./NavBrand";
import { NavCta } from "./NavCta";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--color-nav-border) bg-(--color-nav-surface) backdrop-blur-md">
      <div className="relative mx-auto flex h-(--size-nav-height) max-w-6xl items-center justify-between gap-4 px-6">
        <NavBrand />

        <nav aria-label="Primary" className="hidden flex-1 justify-center md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <NavCta className="hidden md:inline-flex" />
          <NavMobileMenu />
        </div>
      </div>
    </header>
  );
}
