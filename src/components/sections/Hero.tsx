"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { heroData } from "@/data/hero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Neo-brutalist Hero Section with Staggered Fade-Up & Floating Terminal Graphic.
 * - Staggered fade-up animation on load
 * - Fluid clamp() typography: scales seamlessly from 360px to 1440px
 * - Tactile buttons with 44px minimum tap targets
 * - Subtle floating animation on the retro black terminal shape
 * - Respects prefers-reduced-motion
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Staggered fade-up animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-24 overflow-hidden"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Subtitle, CTAs & Tag */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6"
          >
            {/* Primary Pixel Heading with Fluid Clamp Typography */}
            <motion.h1
              variants={itemVariants}
              className="font-pixel text-[clamp(1.75rem,4.5vw+0.5rem,3.4rem)] font-bold text-foreground tracking-tight leading-[1.12]"
            >
              {heroData.heading}
            </motion.h1>

            {/* Monospace Subtitle with Fluid Clamp */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-[clamp(0.875rem,1.1vw+0.55rem,1.1rem)] text-muted-foreground leading-relaxed max-w-xl"
            >
              {heroData.subheading}
            </motion.p>

            {/* CTAs and Rotated Tag Container */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start gap-4 pt-1"
            >
              <div className="flex flex-wrap items-center gap-3.5">
                {heroData.ctas.map((cta, index) =>
                  cta.href.startsWith("#") ? (
                    <Button
                      key={index}
                      variant="outline"
                      size="md"
                      className="min-h-[44px] min-w-[120px] font-mono uppercase font-bold tracking-wider px-6 py-3 bg-surface text-foreground"
                      aria-label={cta.ariaLabel}
                      onClick={() => {
                        const target = document.getElementById(cta.href.replace("#", ""));
                        target?.scrollIntoView({
                          behavior: shouldReduceMotion ? "auto" : "smooth",
                        });
                      }}
                    >
                      {cta.label}
                    </Button>
                  ) : (
                    <a
                      key={index}
                      href={cta.href}
                      rel="noopener"
                      aria-label={cta.ariaLabel || "Join GDG RBU: sign in to the events platform"}
                      className="inline-flex items-center justify-center min-h-[44px] min-w-[120px] font-mono uppercase font-bold tracking-wider px-6 py-3 rounded-xl border-2 border-border bg-surface text-foreground shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer select-none"
                    >
                      {cta.label}
                    </a>
                  )
                )}
              </div>

              {/* Rotated Neo-brutalist GDG Tag */}
              <motion.div
                initial={{ rotate: -4, scale: 0.95 }}
                animate={{ rotate: -4, scale: 1 }}
                whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mt-1 inline-flex items-center min-h-[32px] px-3.5 py-1.5 rounded-full bg-foreground text-background text-[11px] font-mono font-bold tracking-widest border-2 border-border shadow-neo-sm select-none"
              >
                {heroData.badge.label}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Retro Stepped Black Blob Graphic with Floating Micro-Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
            >
              {/* Stepped Black Organic Terminal Shape (Decorative Mockup) */}
              <div
                aria-hidden="true"
                className="relative rounded-3xl bg-black p-6 sm:p-8 border-2 border-border shadow-neo-lg overflow-hidden select-none"
              >
                {/* Subtle pixel grid pattern within blob */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Inner cutout contents */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[160px] sm:min-h-[185px]">
                  {/* Decorative white URL-bar mockup pill */}
                  <div
                    className="w-full max-w-[260px] sm:max-w-[280px] min-h-[44px] h-11 sm:h-12 rounded-full bg-white border-2 border-black shadow-neo-sm flex items-center justify-between px-4 cursor-default select-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gdg-green" />
                      <span className="font-mono text-xs sm:text-sm font-bold text-neutral-800 tracking-wider">
                        {heroData.graphic.tagText}
                      </span>
                    </div>
                  </div>

                  {/* Terminal status readout below pill */}
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                    <span className="text-gdg-blue font-bold">●</span> Community Active
                    <span className="text-neutral-600">|</span>
                    <span className="text-gdg-yellow font-bold">★</span> RBU Chapter
                  </div>
                </div>
              </div>

              {/* Decorative background accent border */}
              <div
                className="absolute -bottom-2 -right-2 w-full h-full rounded-3xl border-2 border-border bg-gdg-blue/20 -z-10"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
