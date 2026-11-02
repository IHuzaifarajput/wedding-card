"use client";

import React from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider } from "./Ornaments";
import { Phone, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 bg-[#F9F4E9] text-[#30271F] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center px-4"
      >
        {/* Eyebrow */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BA8A45] font-semibold mb-2">
          Inquiries &amp; Assistance
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4E0F1D] font-normal tracking-wide">
          Contact Our Family
        </h2>

        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        <p className="font-serif text-base sm:text-lg text-[#30271F]/80 font-light mb-8 max-w-md mx-auto">
          “For any questions regarding the celebration, feel free to reach out.”
        </p>

        {/* Contact Card: Single unified box for Huzaifa's Family with list of numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-sm sm:max-w-md mx-auto bg-white/95 backdrop-blur-md border border-[#BA8A45]/35 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#BA8A45] transition-all duration-300 flex flex-col items-center"
        >
          {/* Family Icon */}
          <div className="w-12 h-12 rounded-full bg-[#EEE2CF]/70 border border-[#BA8A45]/35 flex items-center justify-center mb-3 text-[#4E0F1D]">
            <Users className="w-5 h-5 text-[#4E0F1D]" />
          </div>

          {/* Heading */}
          <h3 className="font-serif text-xl sm:text-2xl text-[#4E0F1D] font-medium mb-5">
            Huziafa’s Family
          </h3>

          {/* List of Numbers (no person names, just numbers) */}
          <div className="w-full flex flex-col gap-2.5 sm:gap-3 items-center">
            {eventConfig.contacts.map((contact, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${contact.phoneRaw}`}
                aria-label={`Call ${contact.phoneDisplay}`}
                className="inline-flex items-center justify-center gap-2.5 w-full max-w-xs px-5 py-2.5 rounded-full bg-[#F9F4E9] text-[#4E0F1D] hover:bg-[#4E0F1D] hover:text-[#F9F4E9] text-sm sm:text-base font-sans font-medium tracking-wider transition-colors duration-200 border border-[#BA8A45]/35 focus:outline-none focus:ring-2 focus:ring-[#BA8A45] shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#BA8A45]" />
                <span>{contact.phoneDisplay}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
