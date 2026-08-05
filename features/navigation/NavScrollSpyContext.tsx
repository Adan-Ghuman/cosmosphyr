"use client";

import { navCopy } from "@/content";
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useNavScrollSpy } from "./useNavScrollSpy";

const NavScrollSpyContext = createContext<string | null>(null);

type NavScrollSpyProviderProps = {
  children: ReactNode;
};

export function NavScrollSpyProvider({ children }: NavScrollSpyProviderProps) {
  const hrefs = useMemo(() => navCopy.links.map((link) => link.href), []);
  const activeHref = useNavScrollSpy(hrefs);

  return (
    <NavScrollSpyContext.Provider value={activeHref}>
      {children}
    </NavScrollSpyContext.Provider>
  );
}

export function useActiveNavHref(): string | null {
  return useContext(NavScrollSpyContext);
}
