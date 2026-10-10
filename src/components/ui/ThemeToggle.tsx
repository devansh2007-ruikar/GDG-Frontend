"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

// React 19 official recommended pattern for hydration-safe client mounting
const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Neo-brutalist Light/Dark Mode Switcher.
 * - Minimum 44px x 44px accessible touch target
 * - Framer Motion 360° spring rotation between Sun & Moon
 * - Hydration-safe mounting via useSyncExternalStore (React 19 compliant)
 * - Zero flash on load (next-themes)
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-11 h-11 rounded-xl border-2 border-border bg-surface opacity-60",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex items-center justify-center w-11 h-11 rounded-xl",
        "border-2 border-border bg-surface text-foreground",
        "shadow-neo-sm hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5",
        "transition-all duration-150 cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gdg-blue",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode (currently ${resolvedTheme})`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-sun"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-5 h-5 text-gdg-yellow fill-gdg-yellow/20" />
          </motion.div>
        ) : (
          <motion.div
            key="light-moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-5 h-5 text-foreground fill-foreground/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
