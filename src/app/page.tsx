import * as React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { UpcomingEvent } from "@/components/sections/UpcomingEvent";
import { MeetTheTeam } from "@/components/sections/MeetTheTeam";
import { FAQs } from "@/components/sections/FAQs";
import { Footer } from "@/components/sections/Footer";
import { AIAssistantLauncher } from "@/components/ai/AIAssistantLauncher";

/**
 * Main Page for GDG RBU Recruitment Website.
 * Assembles all sections in exact sequence:
 * 1. Navbar (Sticky header with blur, colored pills, scroll spy, theme toggle)
 * 2. Hero (Pixel heading, monospace copy, CTAs, rotated badge, retro SVG blob)
 * 3. Upcoming Event (Orientation metallic gradient card + yellow event details card)
 * 4. Meet the Team (Team overview, community pillars, high-res WebP photo)
 * 5. FAQs (Accessible Framer Motion accordion, one open at a time)
 * 6. Footer (Branded card, 3 colored contact subcards, author credit, and bottom shapes strip)
 * 7. Bonus Gemini AI Assistant (Tactile floating launcher + ⌘K shortcut + interactive modal)
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Semantic Header / Navigation */}
      <Navbar />

      {/* Semantic Main Content Flow */}
      <main className="flex-1">
        <Hero />
        <UpcomingEvent />
        <MeetTheTeam />
        <FAQs />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Bonus Feature: Interactive Google Gemini AI Assistant */}
      <AIAssistantLauncher />
    </div>
  );
}
