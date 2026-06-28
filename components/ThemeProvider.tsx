// Architected and built by Classy.
"use client";

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  SENTRA_THEME_COOKIE,
  SENTRA_THEME_STORAGE_KEY,
  type Theme,
  normalizeTheme,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const THEME_CHANGE_EVENT = "sentra-theme-change";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getClientSnapshot(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  return normalizeTheme(document.documentElement.getAttribute("data-theme"));
}

function writeCookie(value: Theme) {
  if (typeof document === "undefined") return;
  document.cookie = `${SENTRA_THEME_COOKIE}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    getClientSnapshot,
    () => initialTheme,
  );

  const setTheme = useCallback((next: Theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
    }
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(SENTRA_THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable - cookie still persists */
      }
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }
    writeCookie(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
