"use client";

import React, { useState } from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider } from "./Ornaments";
import ScratchDateCard from "./ScratchDateCard";
import { Calendar, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function EventDate() {
  const [copied, setCopied] = useState(false);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Valima Celebration: Huziafa & Kashaf"
  )}&dates=20261228T140000Z/20261228T190000Z&details=${encodeURIComponent(
    "Valima Celebration of Huziafa and Kashaf at Gulistan-e-Johar, Karachi, Pakistan."
  )}&location=${encodeURIComponent(eventConfig.venue.plusCode)}`;

  const handleCopyDate = () => {
    navigator.clipboard.writeText("28 December 2026 - Valima of Huziafa & Kashaf");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 bg-gradient-to-b from-[#F9F4E9] via-[#EEE2CF]/60 to-[#F9F4E9] text-[#30271F] overflow-hidden">
      {/* Subtle background ambient pattern */}
      <div className="absolute inset-0 mughal-pattern pointer-events-none opacity-30" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center px-4 relative z-10"
      >
        {/* Section Heading */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BA8A45] font-semibold mb-2">
          Save The Date
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#4E0F1D] font-normal tracking-wide">
          Our Special Day
        </h2>

        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        {/* Interactive Scratch-to-Reveal Card */}
        <div className="my-6">
          <ScratchDateCard />
        </div>

        {/* Narrative / Inviting Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 sm:mt-10 max-w-xl mx-auto space-y-3"
        >
          <p className="font-serif text-lg sm:text-xl text-[#30271F] font-light leading-relaxed">
            “A day filled with love, laughter, duas, and the people who make our lives special.”
          </p>
          <p className="font-serif text-base sm:text-lg text-[#4E0F1D] font-normal italic">
            “We would be honoured to celebrate it with you.”
          </p>
        </motion.div>

        {/* Quick Add to Calendar Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4E0F1D] text-[#F9F4E9] text-xs sm:text-sm font-sans tracking-wider uppercase font-medium hover:bg-[#370914] transition-all duration-300 shadow-md hover:shadow-xl border border-[#BA8A45]/40 focus:outline-none focus:ring-2 focus:ring-[#BA8A45] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-4 h-4 text-[#D7B87B]" />
            <span>Add to Calendar</span>
          </a>
          <button
            onClick={handleCopyDate}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 text-[#30271F] text-xs sm:text-sm font-sans tracking-wider uppercase font-medium hover:bg-white transition-all duration-300 border border-[#BA8A45]/30 focus:outline-none focus:ring-2 focus:ring-[#BA8A45] hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <span>Copy Date</span>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
