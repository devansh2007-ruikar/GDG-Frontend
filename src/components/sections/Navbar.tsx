"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { navigationData, type NavItem } from "@/data/navigation";
import { linksConfig } from "@/config/links";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * Sticky Neo-brutalist Navigation Bar.
 * - Dynamic scroll shadow: appears smoothly as the user scrolls
 * - 44px accessible touch targets across desktop and mobile
 * - Colored pill buttons with dark-mode adaptive white/black borders and shadows
 * - Respects prefers-reduced-motion
 * - Active section tracking with scroll spy
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("home");
  const [hasScrolled, setHasScrolled] = React.useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  // Scroll listener for dynamic shadow and scroll spy
  React.useEffect(() => {
    const sectionIds = ["hero", "team", "upcoming-event", "faqs", "footer"];

    const handleScroll = () => {
      // Dynamic navbar shadow on scroll
      setHasScrolled(window.scrollY > 15);

      // Scroll spy logic
      const scrollPosition = window.scrollY + 220;
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (sectionId === "hero") setActiveSection("home");
            else if (sectionId === "upcoming-event") setActiveSection("events");
            else if (sectionId === "team") setActiveSection("team");
            else if (sectionId === "faqs") setActiveSection("more");
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  // Neo-brutalist pill styling with dark mode border/shadow adaptation
  const pillColorClasses: Record<NavItem["colorVariant"], string> = {
    "pill-blue": "bg-gdg-blue text-white",
    "pill-red": "bg-gdg-red text-white",
    "pill-yellow": "bg-gdg-yellow text-black",
    "pill-green": "bg-gdg-green text-black",
    "pill-purple": "bg-gdg-purple text-white",
    "pill-cyan": "bg-gdg-cyan text-black",
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md bg-background/90 border-b-2 border-border transition-all duration-200",
        hasScrolled && "shadow-neo bg-background/95"
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4"
      >
        {/* Left: Official GDG Brackets Logo */}
        <Link
          href="#hero"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center gap-3 shrink-0 min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gdg-blue rounded-lg p-1 transition-transform hover:scale-105 active:scale-95"
          aria-label="Google Developer Groups RBU Home"
        >
          <div className="relative w-12 h-6 sm:w-14 sm:h-7">
            <Image
              src={navigationData.logo.src}
              alt={navigationData.logo.alt}
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Center: Desktop Colored Pill Links */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-3 list-none m-0 p-0">
          {navigationData.items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  aria-label={item.ariaLabel}
                  className={cn(
                    "inline-flex items-center justify-center min-h-[44px] px-3.5 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold tracking-wide",
                    "border-2 border-border select-none transition-all duration-150 cursor-pointer",
                    "shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none",
                    pillColorClasses[item.colorVariant],
                    isActive && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Join Us CTA + User Profile Badge + Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Join Us Button */}
          <a
            href={linksConfig.login}
            rel="noopener"
            aria-label="Join GDG RBU: sign in to the events platform"
            className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full font-mono font-bold text-xs lg:text-sm bg-gdg-yellow text-black border-2 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer select-none"
          >
            Join Us
          </a>

          {/* User Profile Pill */}
          <div
            className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-full border-2 border-border bg-surface text-foreground shadow-neo-sm select-none"
            title={`Logged in as ${navigationData.user.name}`}
          >
            <div className="w-6 h-6 rounded-full bg-gdg-yellow border border-border overflow-hidden flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-sans text-xs font-semibold max-w-[120px] truncate">
              {navigationData.user.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </div>

          {/* Light/Dark Mode Switch */}
          <ThemeToggle />
        </div>

        {/* Mobile: Controls (Theme Toggle + Hamburger) */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border-2 border-border bg-surface text-foreground shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
            className="sm:hidden border-t-2 border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Join Us CTA for Mobile */}
              <a
                href={linksConfig.login}
                rel="noopener"
                aria-label="Join GDG RBU: sign in to the events platform"
                className="flex items-center justify-center w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gdg-yellow text-black font-mono font-bold text-sm border-2 border-border shadow-neo-sm active:translate-y-0.5"
              >
                Join Us (Sign In) →
              </a>

              {/* User badge on mobile */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border-2 border-border bg-surface shadow-neo-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gdg-yellow border border-border flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">
                      {navigationData.user.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {navigationData.user.role}
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Mobile Pill Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {navigationData.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={cn(
                      "flex items-center justify-center min-h-[44px] py-2.5 px-3 rounded-full text-xs font-bold tracking-wide",
                      "border-2 border-border shadow-neo-sm active:translate-y-0.5",
                      pillColorClasses[item.colorVariant]
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
