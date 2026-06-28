// Architected and built by Classy.
"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-muted hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
