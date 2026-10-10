"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { upcomingEventData } from "@/data/events";
import { Container } from "@/components/ui/Container";

/**
 * Neo-brutalist Upcoming Event Section.
 * - Section reveal on scroll (whileInView, once)
 * - Card hover lifts and button press feedback
 * - 44px minimum accessible touch targets
 * - Dark-mode adaptive white borders & shadows
 */
export function UpcomingEvent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="upcoming-event"
      aria-label="Upcoming Events Section"
      className="py-12 sm:py-16 lg:py-20"
    >
      <Container size="lg">
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-pixel text-[clamp(1.5rem,3.2vw+0.5rem,2.75rem)] font-bold tracking-tight text-foreground">
            {upcomingEventData.sectionTitle}
          </h2>
        </motion.div>

        {/* Responsive Two-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: GDG Orientation (Brushed Gray Gradient) */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border-2 border-border shadow-neo bg-gradient-to-b from-[#787c87] via-[#3a3e4a] to-[#1a1c23] text-white relative overflow-hidden group"
          >
            {/* Top Tag */}
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider bg-white text-black border-2 border-black shadow-neo-sm">
                {upcomingEventData.orientationCard.tag}
              </span>
            </div>

            {/* Event Title & Description */}
            <div className="space-y-3 mb-8">
              <h3 className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-sm">
                {upcomingEventData.orientationCard.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                {upcomingEventData.orientationCard.description}
              </p>
            </div>

            {/* Bottom Action: Round Yellow Button (44px tap target) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("team");
                  target?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
                }}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-gdg-yellow text-black border-2 border-black flex items-center justify-center shadow-neo-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                aria-label="View orientation and team details"
              >
                <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
              </button>
            </div>
          </motion.div>

          {/* Right Card: New Event (Vibrant Yellow Neo-brutalist Card) */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border-2 border-border bg-gdg-yellow text-black shadow-neo relative"
          >
            <div>
              {/* Card Title */}
              <h3 className="font-pixel text-2xl sm:text-3xl font-bold tracking-tight text-black mb-8">
                {upcomingEventData.featuredCard.title}
              </h3>

              {/* Date & Time Block */}
              <div className="pt-4 border-t-2 border-dashed border-black/30 space-y-2">
                <p className="font-mono text-xs font-bold tracking-wider text-black/75">
                  {upcomingEventData.featuredCard.dateLabel}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono font-bold text-base sm:text-lg text-black">
                    <Calendar className="w-4 h-4 text-black" />
                    <span>{upcomingEventData.featuredCard.date}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono font-bold text-base sm:text-lg text-black">
                    <Clock className="w-4 h-4 text-black" />
                    <span>{upcomingEventData.featuredCard.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Button: Black Pill Register Now (48px tap target) */}
            <div className="pt-8 mt-auto">
              <a
                href={upcomingEventData.featuredCard.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-black text-white font-mono text-sm font-bold tracking-wider border-2 border-border shadow-neo-sm hover:bg-neutral-800 hover:shadow-neo active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                {upcomingEventData.featuredCard.ctaText}
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
