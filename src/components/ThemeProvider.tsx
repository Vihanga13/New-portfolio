"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AccentTheme, siteConfig } from "@/data/site";

interface ThemeContextValue {
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
  cycleAccent: () => void;
}

const ACCENT_ORDER: AccentTheme[] = ["lime", "violet", "cyan"];
const STORAGE_KEY = "vihanga-portfolio-accent";

const ThemeContext = createContext<ThemeContextValue>({
  accent: siteConfig.defaultAccent,
  setAccent: () => {},
  cycleAccent: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>(
    siteConfig.defaultAccent
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as AccentTheme | null;
      if (saved && ACCENT_ORDER.includes(saved)) {
        setAccentState(saved);
        document.documentElement.setAttribute("data-accent", saved);
      } else {
        document.documentElement.setAttribute(
          "data-accent",
          siteConfig.defaultAccent
        );
      }
    } catch {
      document.documentElement.setAttribute(
        "data-accent",
        siteConfig.defaultAccent
      );
    }
  }, []);

  const setAccent = useCallback((next: AccentTheme) => {
    setAccentState(next);
    document.documentElement.setAttribute("data-accent", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors in restricted browsing modes
    }
  }, []);

  const cycleAccent = useCallback(() => {
    setAccentState((prev) => {
      const idx = ACCENT_ORDER.indexOf(prev);
      const next = ACCENT_ORDER[(idx + 1) % ACCENT_ORDER.length];
      document.documentElement.setAttribute("data-accent", next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ accent, setAccent, cycleAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAccentTheme() {
  return useContext(ThemeContext);
}

