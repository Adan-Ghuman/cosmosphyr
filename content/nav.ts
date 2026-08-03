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
    { label: "Horizon", href: "#horizon" },
    { label: "Brand", href: "#cosmosphyr" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Work", href: "#selected-work" },
    { label: "Proof", href: "#proof" },
    { label: "Process", href: "#process" },
    { label: "Next", href: "#next-horizon" },
  ],
  ctaLabel: "Contact",
  ctaHref: "#contact",
  menuOpenLabel: "Menu",
  menuCloseLabel: "Close",
};
