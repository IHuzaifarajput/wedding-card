"use client";

import React, { useState, useRef, useEffect } from "react";
import { eventConfig } from "@/config/event";
import { Music, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setIsPlaying(false);
      setToastMessage(
        `"${eventConfig.music.title}" will play once kudmayi.mp3 is added to the public folder.`
      );
      setTimeout(() => setToastMessage(null), 4500);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err: unknown) {
        console.warn("Audio playback notice:", err);
        setIsPlaying(false);
        setToastMessage(
          `"${eventConfig.music.title}" will play once kudmayi.mp3 is added to the public folder.`
        );
        setTimeout(() => setToastMessage(null), 4500);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={eventConfig.music.src}
        preload="metadata"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Control Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        {/* Toast notice with AnimatePresence */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              role="alert"
              className="mb-2 max-w-xs p-3 rounded-xl bg-[#370914] text-[#F9F4E9] border border-[#BA8A45]/40 text-xs shadow-2xl flex items-start gap-2 backdrop-blur-md"
            >
              <AlertCircle className="w-4 h-4 text-[#D7B87B] shrink-0 mt-0.5" />
              <p className="leading-snug text-[#EEE2CF]">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause background music" : "Play background music: Kudmayi"}
          className={`group relative flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xl border transition-colors duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#BA8A45] ${
            isPlaying
              ? "bg-[#370914]/95 text-[#D7B87B] border-[#BA8A45] shadow-[0_0_25px_rgba(186,138,69,0.45)]"
              : "bg-[#370914]/90 text-[#F9F4E9] border-[#BA8A45]/40 hover:border-[#BA8A45] hover:bg-[#4E0F1D]"
          }`}
        >
          {/* Animated soundwaves when playing */}
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#4E0F1D] border border-[#BA8A45]/40 text-[#D7B87B]">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3 sm:h-3.5" aria-hidden="true">
                <span className="w-0.5 h-full bg-[#D7B87B] animate-pulse" />
                <span className="w-0.5 h-2 bg-[#D7B87B] animate-pulse delay-75" />
                <span className="w-0.5 h-3 bg-[#D7B87B] animate-pulse delay-150" />
              </div>
            ) : (
              <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7B87B]" />
            )}
          </div>

          {/* Text labels */}
          <div className="text-left select-none pr-1">
            <span className="block font-sans text-[9px] sm:text-[10px] uppercase tracking-wider text-[#D7B87B]/90 font-medium leading-tight">
              Our Song · {eventConfig.music.title}
            </span>
            <span className="block font-serif text-xs sm:text-sm text-[#F9F4E9] font-medium leading-tight">
              {isPlaying ? "Pause Music" : "Play Music"}
            </span>
          </div>
        </motion.button>
      </div>
    </>
  );
}
