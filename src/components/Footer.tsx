"use client";

import React from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider, FloralMedallion } from "./Ornaments";
import GoldSparkles from "./GoldSparkles";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full py-16 sm:py-24 px-4 bg-[#2A060F] text-[#F9F4E9] overflow-hidden select-none border-t border-[#BA8A45]/35">
      {/* Subtle floating gold dust */}
      <GoldSparkles count={20} />

      {/* Delicate background ambient glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#4E0F1D_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl mx-auto text-center px-4"
      >
        <FloralMedallion className="mb-6 opacity-75" />

        {/* Couple Names */}
        <div className="space-y-1">
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.2em] uppercase text-[#F9F4E9] font-light">
            {eventConfig.couple.groom}
          </h2>
          <span className="block font-script text-3xl sm:text-4xl text-[#D7B87B] -my-1 font-normal">
            &amp;
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.2em] uppercase text-[#F9F4E9] font-light">
            {eventConfig.couple.bride}
          </h2>
        </div>

        {/* Date */}
        <p className="font-serif text-base sm:text-lg tracking-[0.25em] text-[#D7B87B] font-light mt-4">
          {eventConfig.event.dateFormatted}
        </p>

        <div className="max-w-xs mx-auto my-6">
          <GoldDivider />
        </div>

        {/* Romantic Quotes */}
        <div className="space-y-3 font-serif">
          <p className="text-base sm:text-lg text-[#EEE2CF]/90 italic font-light">
            “{eventConfig.event.quote}”
          </p>
          <div className="pt-2 text-sm sm:text-base text-[#D7B87B]">
            <p>With love,</p>
            <p className="font-script text-2xl sm:text-3xl text-[#F9F4E9] mt-1">
              Huziafa &amp; Kashaf
            </p>
          </div>
        </div>

        {/* Small footer text */}
        <div className="mt-12 pt-6 border-t border-[#BA8A45]/20 text-xs font-sans tracking-[0.25em] uppercase text-[#BA8A45]/80">
          Valima Celebration · Karachi
        </div>
      </motion.div>
    </footer>
  );
}
