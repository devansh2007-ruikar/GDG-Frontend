"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb, Rocket } from "lucide-react";
import { teamData } from "@/data/team";
import { Container } from "@/components/ui/Container";

/**
 * Neo-brutalist Meet the Team Section.
 * - Section reveal on scroll (whileInView, once)
 * - Tactile card container with adaptive dark/light border and shadow
 * - Responsive retina WebP team photo with lazy loading
 * - Respects prefers-reduced-motion
 */
export function MeetTheTeam() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      aria-label="Meet the Team Section"
      className="py-12 sm:py-16 lg:py-20"
    >
      <Container size="lg">
        {/* Outer Neo-brutalist Container Card with Scroll Reveal & Hover Lift */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={shouldReduceMotion ? {} : { y: -3 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border-2 border-border bg-surface text-foreground shadow-neo p-6 sm:p-8 lg:p-10 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Heading, Copy & Bullet Points */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pixel Heading with Fluid Clamp */}
              <h2 className="font-pixel text-[clamp(1.4rem,2.8vw+0.5rem,2.5rem)] font-bold tracking-tight text-foreground leading-[1.2]">
                {teamData.heading}
              </h2>

              {/* Monospace Subtitle */}
              <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {teamData.description}
              </p>

              {/* Icon Bullet Points */}
              <div className="space-y-5 pt-2">
                {teamData.pillars.map((pillar) => (
                  <div key={pillar.id} className="flex items-start gap-3.5 group">
                    {/* Icon circular badge */}
                    <div className="w-9 h-9 rounded-full border-2 border-border bg-muted flex items-center justify-center shrink-0 shadow-neo-sm group-hover:scale-105 transition-transform">
                      {pillar.iconName === "lightbulb" ? (
                        <Lightbulb className="w-4 h-4 text-gdg-yellow fill-gdg-yellow/20" />
                      ) : (
                        <Rocket className="w-4 h-4 text-gdg-blue fill-gdg-blue/20" />
                      )}
                    </div>
                    {/* Pillar text */}
                    <div className="space-y-1">
                      <h3 className="font-sans font-bold text-sm sm:text-base text-foreground leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Group Photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl border-2 border-border overflow-hidden shadow-neo-md aspect-[4/3] sm:aspect-[16/11] w-full bg-neutral-900 group">
                <Image
                  src={teamData.photo.src}
                  alt={teamData.photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-300"
                />

                {/* Photo frame overlay badge */}
                <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-sm text-white font-mono text-[11px] font-bold border border-white/20 select-none">
                  GDG RBU Community 2026-27
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
