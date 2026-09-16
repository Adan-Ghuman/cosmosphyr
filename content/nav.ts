export type NavLink = {
  label: string;
  href: string;
};

export type NavCopy = {
  brandLabel: string;
  brandHref: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
};

export const navCopy: NavCopy = {
  brandLabel: "Cosmosphyr",
  brandHref: "#horizon",
  links: [
    { label: "Overview", href: "#horizon" },
    { label: "About", href: "#cosmosphyr" },
    { label: "Services", href: "#capabilities" },
    { label: "Work", href: "#selected-work" },
    { label: "Process", href: "#process" },
    { label: "Vision", href: "#next-horizon" },
  ],
  ctaLabel: "Contact",
  ctaHref: "#contact",
  menuOpenLabel: "Menu",
  menuCloseLabel: "Close",
};
