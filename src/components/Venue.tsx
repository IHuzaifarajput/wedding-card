"use client";

import React from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider, CornerOrnament } from "./Ornaments";
import { MapPin, Navigation, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Venue() {
  return (
    <section className="relative w-full py-20 sm:py-28 px-4 bg-[#F9F4E9] text-[#30271F] overflow-hidden">
      <div className="absolute inset-0 mughal-pattern pointer-events-none opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl mx-auto text-center px-4"
      >
        {/* Eyebrow */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BA8A45] font-semibold mb-2">
          Venue &amp; Location
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4E0F1D] font-normal tracking-wide">
          {eventConfig.venue.heading}
        </h2>

        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/95 backdrop-blur-md border border-[#BA8A45]/35 rounded-2xl p-6 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 mt-6"
        >
          <CornerOrnament position="top-left" className="absolute top-2 left-2 text-[#BA8A45]/30" />
          <CornerOrnament position="top-right" className="absolute top-2 right-2 text-[#BA8A45]/30" />
          <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 text-[#BA8A45]/30" />
          <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-[#BA8A45]/30" />

          {/* Location Icon Motif with pulsing ripple ring */}
          <div className="relative w-14 h-14 rounded-full bg-[#EEE2CF]/80 border border-[#BA8A45]/40 flex items-center justify-center mx-auto mb-4 text-[#BA8A45]">
            <span className="absolute inset-0 rounded-full bg-[#BA8A45]/20 animate-ping opacity-75" />
            <MapPin className="relative z-10 w-6 h-6 text-[#4E0F1D]" />
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F4E9] border border-[#BA8A45]/30 text-xs font-sans tracking-wider text-[#4E0F1D] uppercase mb-4 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#BA8A45]" />
            <span>{eventConfig.event.dateFormatted}</span>
          </div>

          {/* Venue & City */}
          <div className="space-y-1 mb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#30271F] font-normal tracking-wide">
              {eventConfig.venue.area}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6B5E52] tracking-wider uppercase">
              {eventConfig.venue.city}
            </p>
          </div>

          {/* Plus Code Badge */}
          <div className="my-5 p-3.5 rounded-xl bg-[#F9F4E9] border border-[#BA8A45]/25 max-w-md mx-auto shadow-inner">
            <span className="block font-sans text-[11px] uppercase tracking-wider text-[#BA8A45] font-semibold mb-1">
              Google Maps Plus Code
            </span>
            <code className="font-mono text-xs sm:text-sm text-[#4E0F1D] font-semibold select-all">
              {eventConfig.venue.plusCode}
            </code>
          </div>

          {/* Action Button: View Location */}
          <div className="pt-2">
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={eventConfig.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Valima location on Google Maps"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4E0F1D] text-[#F9F4E9] font-sans text-sm tracking-wider uppercase font-medium hover:bg-[#370914] transition-all duration-300 shadow-md hover:shadow-xl border border-[#BA8A45]/40 focus:outline-none focus:ring-2 focus:ring-[#BA8A45]"
            >
              <Navigation className="w-4 h-4 text-[#D7B87B]" />
              <span>View Location</span>
            </motion.a>
          </div>

          {/* Footer note */}
          <p className="mt-8 font-serif italic text-base sm:text-lg text-[#4E0F1D] font-light">
            “{eventConfig.venue.note}”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
