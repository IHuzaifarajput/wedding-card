"use client";

import React from "react";
import { GoldDivider, CornerOrnament } from "./Ornaments";
import GoldSparkles from "./GoldSparkles";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="relative w-full py-20 sm:py-32 px-4 bg-[#2A060F] text-[#F9F4E9] overflow-hidden select-none">
      {/* Floating Gold Sparkles in the dark */}
      <GoldSparkles count={25} />

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4E0F1D_0%,transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle oversized background initials watermark: H & K with floating animation */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif text-[120px] sm:text-[190px] md:text-[260px] lg:text-[320px] font-extralight text-[#BA8A45]/[0.08] tracking-widest leading-none"
        >
          H &amp; K
        </motion.span>
      </div>

      {/* Delicate mughal pattern overlay */}
      <div className="absolute inset-0 mughal-pattern-dark pointer-events-none opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center px-4"
      >
        {/* Small Label */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#D7B87B] font-semibold mb-2">
          Our Story
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F9F4E9] font-normal tracking-wide">
          Two Journeys, One Destination
        </h2>

        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        {/* Card Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-[#370914]/75 backdrop-blur-md border border-[#BA8A45]/35 rounded-2xl p-6 sm:p-12 shadow-2xl hover:border-[#BA8A45]/60 transition-colors duration-500"
        >
          <CornerOrnament position="top-left" className="absolute top-2 left-2 text-[#D7B87B]/30" />
          <CornerOrnament position="top-right" className="absolute top-2 right-2 text-[#D7B87B]/30" />
          <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 text-[#D7B87B]/30" />
          <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-[#D7B87B]/30" />

          <div className="space-y-6">
            <p className="font-serif text-base sm:text-lg md:text-xl text-[#EEE2CF]/90 font-light leading-relaxed">
              Some stories are written over years.<br />
              Some begin with a simple connection.
            </p>

            <p className="font-serif text-base sm:text-lg md:text-xl text-[#EEE2CF]/90 font-light leading-relaxed">
              And then, somehow, two separate journeys find their way to the same destination.
            </p>

            {/* Script Couple Names Accent */}
            <div className="py-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="font-script text-4xl sm:text-5xl md:text-6xl text-[#D7B87B] inline-block transform -rotate-1 cursor-default"
              >
                Huziafa &amp; Kashaf
              </motion.span>
            </div>

            <p className="font-serif text-base sm:text-lg text-[#EEE2CF]/80 font-light leading-relaxed">
              Two lives, two families, and one beautiful new beginning.
            </p>

            <div className="w-16 h-[1px] bg-[#BA8A45]/40 mx-auto" aria-hidden="true" />

            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#D7B87B] font-normal">
              On 28 December 2026, we begin the next chapter — together.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
