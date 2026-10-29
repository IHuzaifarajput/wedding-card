"use client";

import React, { useState, useEffect } from "react";
import { eventConfig } from "@/config/event";
import { GoldDivider } from "./Ornaments";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = (): TimeLeft => {
      const targetTime = new Date(eventConfig.event.targetCountdownIso).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isComplete: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number, minDigits = 2) => {
    return num.toString().padStart(minDigits, "0");
  };

  const timeUnits = [
    { key: "days", label: "DAYS", value: timeLeft.days, minDigits: 2 },
    { key: "hours", label: "HOURS", value: timeLeft.hours, minDigits: 2 },
    { key: "minutes", label: "MINUTES", value: timeLeft.minutes, minDigits: 2 },
    { key: "seconds", label: "SECONDS", value: timeLeft.seconds, minDigits: 2 },
  ];

  return (
    <section
      id="countdown"
      className="relative w-full py-16 sm:py-24 px-4 bg-[#F9F4E9] text-[#30271F] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center px-2 sm:px-4"
      >
        {/* Eyebrow */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BA8A45] font-semibold mb-2">
          The Journey
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4E0F1D] font-normal tracking-wide">
          Counting Down to Forever
        </h2>

        <div className="max-w-xs mx-auto my-4 sm:my-6">
          <GoldDivider />
        </div>

        {/* Countdown Grid (Responsive & Mobile-safe 4-column with Framer Motion) */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto my-6 sm:my-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#BA8A45]/35 shadow-sm hover:shadow-lg hover:border-[#BA8A45] transition-all duration-300"
            >
              <div className="relative h-8 sm:h-12 flex items-center justify-center overflow-hidden">
                <span
                  data-testid={`countdown-${unit.key}`}
                  className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#4E0F1D] tracking-tight leading-none"
                >
                  {isClient ? formatNumber(unit.value, unit.minDigits) : "--"}
                </span>
              </div>
              <span className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.2em] text-[#BA8A45] font-medium mt-1">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <p className="font-serif italic text-base sm:text-lg text-[#30271F]/85 max-w-md mx-auto leading-relaxed">
          “Until Huziafa &amp; Kashaf begin their new chapter together.”
        </p>

        {/* Timezone badge */}
        <div className="mt-5">
          <span className="inline-block text-[11px] font-sans tracking-wider text-[#6B5E52] uppercase bg-[#EEE2CF]/70 px-4 py-1.5 rounded-full border border-[#BA8A45]/25 shadow-xs">
            Pakistan Standard Time (UTC+05:00)
          </span>
        </div>
      </motion.div>
    </section>
  );
}
