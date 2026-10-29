"use client";

import React from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider, CornerOrnament } from "./Ornaments";
import { MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function WhatsappConfirm() {
  const whatsappUrl = `https://wa.me/${eventConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(
    eventConfig.whatsapp.confirmationMessage
  )}`;

  const handleWhatsappClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#25D366", "#D7B87B", "#BA8A45", "#F5ECE0"],
      });
    } catch {
      // safe
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 bg-gradient-to-b from-[#F9F4E9] via-[#EEE2CF]/50 to-[#F9F4E9] text-[#30271F] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto text-center px-4"
      >
        {/* Eyebrow */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BA8A45] font-semibold mb-2">
          RSVP
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4E0F1D] font-normal tracking-wide">
          Your Presence Means Everything
        </h2>

        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/95 backdrop-blur-md border border-[#BA8A45]/35 rounded-2xl p-6 sm:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-500"
        >
          <CornerOrnament position="top-left" className="absolute top-2 left-2 text-[#BA8A45]/25" />
          <CornerOrnament position="top-right" className="absolute top-2 right-2 text-[#BA8A45]/25" />
          <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 text-[#BA8A45]/25" />
          <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-[#BA8A45]/25" />

          <div className="space-y-4 mb-8">
            <p className="font-serif text-lg sm:text-xl text-[#30271F]/90 font-light leading-relaxed">
              “The best part of a celebration is sharing it with the people who matter.”
            </p>
            <p className="font-serif text-base sm:text-lg text-[#4E0F1D] font-normal italic">
              “We would love to know if you’ll be joining us on our special day.”
            </p>
          </div>

          {/* Action Button: Confirm on WhatsApp with pulsing beacon */}
          <div className="relative inline-block w-full sm:w-auto pt-2">
            {/* Pulsing ring animation */}
            <span className="absolute inset-x-0 bottom-0 top-2 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none" />

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsappClick}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Confirm attendance via WhatsApp"
              className="relative z-10 inline-flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-sm tracking-wider uppercase font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Confirm on WhatsApp</span>
              <Heart className="w-4 h-4 fill-current text-white/90" />
            </motion.a>
          </div>

          <p className="mt-4 text-[11px] font-sans text-[#6B5E52] tracking-wider uppercase">
            Clicking opens WhatsApp with a prefilled confirmation
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
