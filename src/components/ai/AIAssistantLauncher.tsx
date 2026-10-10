"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { AIAssistantModal } from "./AIAssistantModal";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Floating Neo-brutalist Launcher for GDG Gemini Assistant.
 * - Persistent floating trigger button at bottom right
 * - Listens for ⌘K / Ctrl+K keyboard shortcut
 * - Coordinates modal open/close state without duplicate event toggles
 * - Client-only mounting to prevent SSR hydration flicker
 */
export function AIAssistantLauncher() {
  const mounted = useIsMounted();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = React.useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global keyboard shortcut listener (Cmd+K or Ctrl+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for custom trigger event from Hero terminal pill
  React.useEffect(() => {
    const handleTriggerEvent = (e: Event) => {
      e.stopPropagation();
      setIsOpen(true);
    };
    window.addEventListener("open-gdg-ai", handleTriggerEvent);
    return () => window.removeEventListener("open-gdg-ai", handleTriggerEvent);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={handleOpen}
          className="group relative inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 rounded-full border-2 border-border bg-gdg-yellow text-black font-mono font-bold text-xs sm:text-sm shadow-neo hover:shadow-neo-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-neo-sm transition-transform duration-150 cursor-pointer select-none"
          aria-label="Open GDG Gemini AI Assistant (Shortcut: Cmd+K)"
        >
          {/* Animated Sparkle Icon */}
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-gdg-yellow fill-gdg-yellow group-hover:rotate-12 transition-transform" />
          </div>

          <span className="tracking-tight">Ask GDG AI</span>

          {/* Keyboard shortcut hint */}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/10 border border-black/20 text-[10px] font-mono text-black/70">
            ⌘K
          </span>
        </button>
      </div>

      {/* Interactive Modal */}
      <AIAssistantModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
