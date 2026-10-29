"use client";

import React from "react";
import { GoldDivider, FloralMedallion } from "./Ornaments";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="relative w-full py-20 sm:py-28 px-4 bg-[#F9F4E9] text-[#30271F] overflow-hidden"
    >
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 mughal-pattern pointer-events-none opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl mx-auto text-center px-4 sm:px-6"
      >
        {/* Subtle decorative motif with rotation */}
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <FloralMedallion className="mb-6" />
        </motion.div>

        {/* Small Eyebrow */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BA8A45] font-semibold mb-2">
          With Love
        </p>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl text-[#4E0F1D] font-normal tracking-wide">
          You’re Invited
        </h2>

        {/* Fine gold divider */}
        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        {/* Invitation Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative bg-white/75 backdrop-blur-md border border-[#BA8A45]/30 rounded-2xl p-6 sm:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-500"
        >
          <div className="space-y-4 sm:space-y-6 font-serif text-lg sm:text-xl md:text-2xl text-[#30271F]/90 leading-relaxed font-light">
            <p>
              With love in our hearts and the blessings of our families, we invite you to be part of a day that means the world to us.
            </p>
            <p className="text-[#4E0F1D] font-normal italic">
              Join us as we celebrate the beginning of our forever.
            </p>
          </div>

          {/* Subtle signature ornament */}
          <div className="mt-8 pt-6 border-t border-[#BA8A45]/25 flex items-center justify-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#BA8A45]">
            <span className="font-medium">Huziafa</span>
            <span className="font-script text-lg text-[#4E0F1D] lowercase px-1">&amp;</span>
            <span className="font-medium">Kashaf</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
