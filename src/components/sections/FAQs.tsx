"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqsData } from "@/data/faqs";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Neo-brutalist Accessible Accordion FAQs Section.
 * - Section reveal on scroll (whileInView, once)
 * - Accessible 52px trigger buttons with aria-expanded & aria-controls
 * - Smooth Framer Motion height transition
 * - One item open at a time with rotating chevron
 * - Dark-mode adaptive white borders and shadows
 */
export function FAQs() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faqs"
      aria-label="Frequently Asked Questions Section"
      className="py-12 sm:py-16 lg:py-20"
    >
      <Container size="md">
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-pixel text-[clamp(1.5rem,3.2vw+0.5rem,2.75rem)] font-bold tracking-tight text-foreground">
            {faqsData.sectionTitle}
          </h2>
        </motion.div>

        {/* Accessible Accordion Item List */}
        <div className="space-y-4">
          {faqsData.items.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.04 }}
                className={cn(
                  "rounded-xl border-2 border-border bg-surface text-foreground shadow-neo overflow-hidden transition-all duration-150",
                  isOpen && "ring-1 ring-border"
                )}
              >
                {/* Accordion Trigger Button (Accessible 52px+ touch target) */}
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleAccordion(index)}
                  className="w-full min-h-[52px] flex items-center justify-between p-4 sm:p-5 text-left font-sans font-bold text-sm sm:text-base text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-gdg-blue cursor-pointer select-none"
                >
                  <span className="pr-4 leading-snug">{item.question}</span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg border-2 border-border flex items-center justify-center shrink-0 transition-transform duration-200",
                      isOpen ? "rotate-180 bg-foreground text-background" : "bg-muted text-foreground"
                    )}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* Animated Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.28,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t-2 border-dashed border-border/40">
                        <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
