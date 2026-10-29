"use client";

import React from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider, CornerOrnament } from "./Ornaments";
import GoldSparkles from "./GoldSparkles";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToNext = () => {
    const el = document.getElementById("welcome");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 py-8 sm:py-12 bg-gradient-to-b from-[#2A060F] via-[#370914] to-[#4E0F1D] text-[#F9F4E9] overflow-hidden select-none">
      {/* Ambient floating gold dust particles */}
      <GoldSparkles count={35} />

      {/* Subtle radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 bg-[radial-gradient(circle_at_50%_38%,#6B1728_0%,transparent_70%)] animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Delicate background jaali/mughal pattern */}
      <div className="absolute inset-0 mughal-pattern-dark pointer-events-none opacity-50" aria-hidden="true" />

      {/* Decorative Ornate Border Inset */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-3 sm:inset-6 md:inset-8 border border-[#BA8A45]/35 pointer-events-none rounded-sm"
        aria-hidden="true"
      >
        <CornerOrnament position="top-left" className="absolute top-1 left-1" />
        <CornerOrnament position="top-right" className="absolute top-1 right-1" />
        <CornerOrnament position="bottom-left" className="absolute bottom-1 left-1" />
        <CornerOrnament position="bottom-right" className="absolute bottom-1 right-1" />
      </motion.div>

      {/* Top Space / Family Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 pt-6 sm:pt-10 text-center"
      >
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D7B87B] font-light">
          Together with our families
        </p>
        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#BA8A45] to-transparent mx-auto mt-3" aria-hidden="true" />
      </motion.div>

      {/* Center Couple Names & Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-2 py-4 my-auto flex flex-col items-center">
        {/* Bismillah / Blessing geometric emblem with gentle rotation entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mb-4 sm:mb-6 text-[#D7B87B]/70 hover:text-[#D7B87B] transition-colors"
          aria-hidden="true"
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 2L15 9H22L16.5 13.5L18.5 20.5L12 16.5L5.5 20.5L7.5 13.5L2 9H9L12 2Z" />
          </svg>
        </motion.div>

        {/* Groom Name */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] uppercase text-[#F9F4E9] font-normal leading-none drop-shadow-lg"
        >
          {eventConfig.couple.groom}
        </motion.h1>

        {/* Script 'with' connector */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#D7B87B] my-0 sm:-my-1 md:-my-2 font-normal transform -rotate-3 filter drop-shadow"
        >
          with
        </motion.span>

        {/* Bride Name */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] uppercase text-[#F9F4E9] font-normal leading-none drop-shadow-lg"
        >
          {eventConfig.couple.bride}
        </motion.h2>

        {/* Elegant Gold Divider with width reveal */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="w-full max-w-xs sm:max-w-md my-5 sm:my-7"
        >
          <GoldDivider />
        </motion.div>

        {/* Event Type & Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="space-y-2"
        >
          <p className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-[#D7B87B] font-semibold">
            {eventConfig.event.type}
          </p>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.22em] text-[#EEE2CF] font-light">
            {eventConfig.event.dateShort}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-serif italic text-sm sm:text-base md:text-lg text-[#EEE2CF]/90 max-w-lg mt-6 font-light tracking-wide px-4"
        >
          “{eventConfig.couple.tagline}”
        </motion.p>
      </div>

      {/* Bottom Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 pb-2 sm:pb-4 flex flex-col items-center"
      >
        <button
          onClick={scrollToNext}
          aria-label="Scroll to invitation details"
          className="group flex flex-col items-center gap-2 text-[#D7B87B]/80 hover:text-[#D7B87B] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[#D7B87B] rounded-full p-2"
        >
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-75 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
          <div className="w-5 h-8 border border-[#BA8A45]/50 rounded-full flex justify-center pt-1.5 group-hover:border-[#D7B87B] transition-colors">
            <span className="w-1 h-2 bg-[#D7B87B] rounded-full animate-bounce" />
          </div>
        </button>
      </motion.div>
    </header>
  );
}
