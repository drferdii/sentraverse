// Architected and built by Classy.
// Theme infrastructure - cookie + localStorage hybrid persistence.

export type Theme = "light" | "dark";

export const SENTRA_THEME_COOKIE = "sentra-theme";
export const SENTRA_THEME_STORAGE_KEY = "sentra-theme";
export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function normalizeTheme(value: unknown): Theme {
  return isTheme(value) ? value : DEFAULT_THEME;
}

/**
 * Pre-hydration script string. Inlined into <head> to set data-theme
 * before first paint, eliminating theme flash. Reads localStorage first
 * (most recent client choice), falls back to cookie value injected by SSR.
 */
export function getThemeBootstrapScript(ssrTheme: Theme): string {
  return `(function(){try{var s=localStorage.getItem("${SENTRA_THEME_STORAGE_KEY}");var t=(s==="light"||s==="dark")?s:"${ssrTheme}";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","${ssrTheme}");}})();`;
}
