"use client";

import React from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider } from "./Ornaments";
import { Phone, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const isSingle = eventConfig.contacts.length === 1;

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

        {/* Contact Card(s) */}
        <div
          className={`grid grid-cols-1 ${
            isSingle ? "max-w-xs" : "sm:grid-cols-2 max-w-lg"
          } gap-4 sm:gap-6 mx-auto justify-center`}
        >
          {eventConfig.contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-md border border-[#BA8A45]/35 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#BA8A45] transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-11 h-11 rounded-full bg-[#EEE2CF]/70 border border-[#BA8A45]/35 flex items-center justify-center mb-3 text-[#4E0F1D]">
                <Users className="w-4 h-4 text-[#4E0F1D]" />
              </div>

              <h3 className="font-serif text-lg sm:text-xl text-[#4E0F1D] font-medium mb-3">
                {contact.role}
              </h3>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${contact.phoneRaw}`}
                aria-label={`Call ${contact.role} at ${contact.phoneDisplay}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9F4E9] text-[#4E0F1D] hover:bg-[#4E0F1D] hover:text-[#F9F4E9] text-sm font-sans font-medium tracking-wider transition-colors duration-200 border border-[#BA8A45]/35 focus:outline-none focus:ring-2 focus:ring-[#BA8A45] shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#BA8A45]" />
                <span>{contact.phoneDisplay}</span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
