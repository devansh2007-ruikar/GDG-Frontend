"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Mail, Heart } from "lucide-react";
import { footerData } from "@/data/footer";
import { Container } from "@/components/ui/Container";

/* ==========================================================================
   BRAND ICONS (Vector SVGs with pixel-accurate fidelity)
   ========================================================================== */
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterXIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * Neo-brutalist Footer Section.
 * - Branded card with 44px+ tap targets
 * - 3 Color-blocked cards with hover lift & active press feedback
 * - Floating animation on bottom decorative shapes strip
 * - Credit line for Devansh Ruikar
 * - Respects prefers-reduced-motion
 */
export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "instagram":
        return <InstagramIcon className="w-5 h-5 text-white" />;
      case "linkedin":
        return <LinkedInIcon className="w-5 h-5 text-white" />;
      case "twitter":
        return <TwitterXIcon className="w-4 h-4 text-black" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" aria-label="Site Footer" className="pt-12 sm:pt-16 pb-0 overflow-hidden">
      <Container size="lg" className="mb-12">
        {/* Main Neo-brutalist Card Container with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border-2 border-border bg-surface text-foreground shadow-neo p-6 sm:p-10"
        >
          {/* Top Branding Block */}
          <div className="flex flex-col items-center text-center space-y-2.5">
            <div className="relative w-16 h-8 sm:w-20 sm:h-10">
              <Image
                src="/gdg-logo.svg"
                alt="Google Developer Groups Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h2 className="font-pixel text-[clamp(1.25rem,2.5vw+0.5rem,2rem)] font-bold tracking-tight text-foreground">
              {footerData.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground">
              {footerData.subtitle}
            </p>
          </div>

          {/* Dashed Line Divider */}
          <div className="w-full border-t-2 border-dashed border-border my-8" />

          {/* Subcards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Address Card + Email Card */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {/* Blue Address Card */}
              <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border-2 border-border bg-gdg-blue text-white shadow-neo-sm">
                <div className="w-10 h-10 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-sans font-bold text-sm sm:text-base leading-snug">
                    {footerData.address.institution}
                  </h3>
                  <p className="font-mono text-xs text-white/90 leading-relaxed">
                    {footerData.address.location}
                  </p>
                </div>
              </div>

              {/* Yellow Email Card (48px tap target) */}
              <a
                href={footerData.contact.mailto}
                className="min-h-[48px] flex items-center gap-3.5 p-4 sm:p-5 rounded-xl border-2 border-border bg-gdg-yellow text-black shadow-neo-sm hover:shadow-neo active:translate-y-0.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-black/10 border border-black/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <span className="font-mono font-bold text-sm sm:text-base group-hover:underline">
                  {footerData.contact.email}
                </span>
              </a>
            </div>

            {/* Right Column: Purple Social Media Card */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 rounded-xl border-2 border-border bg-gdg-purple text-white shadow-neo-sm space-y-4">
              <h3 className="font-sans font-bold text-base sm:text-lg">
                {footerData.socials.title}
              </h3>
              <div className="flex items-center gap-3.5">
                {footerData.socials.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow GDG RBU on ${link.name}`}
                    className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl border-2 border-border flex items-center justify-center shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer ${link.colorClass}`}
                  >
                    {getSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Credit Line */}
          <div className="mt-8 pt-6 border-t-2 border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
            <p>
              © 2024–2026 GDG RBU. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5 font-semibold text-foreground">
              Built with <Heart className="w-3.5 h-3.5 text-gdg-red fill-gdg-red" /> by{" "}
              <a
                href={footerData.credit.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 hover:text-gdg-blue transition-colors"
              >
                {footerData.credit.author}
              </a>
            </p>
          </div>
        </motion.div>
      </Container>

      {/* Decorative Geometric Shapes Strip with Subtle Floating Animation */}
      <div className="w-full border-t-2 border-border bg-surface overflow-hidden py-1">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="relative w-full h-12 sm:h-16"
        >
          <Image
            src={footerData.shapesBannerSrc}
            alt="Google colors decorative shapes strip"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-bottom"
          />
        </motion.div>
      </div>
    </footer>
  );
}
