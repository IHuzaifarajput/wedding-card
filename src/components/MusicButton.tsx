"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { eventConfig } from "@/config/event";
import { Music, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio Synthesizer Fallback if audio file cannot be loaded
  const startSynthFallback = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = synthContextRef.current || new AudioCtx();
      synthContextRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Melodic notes sequence (D major wedding raag)
      const notes = [
        293.66, 369.99, 440.0, 587.33, 554.37, 440.0, 369.99, 293.66,
        392.0, 493.88, 587.33, 739.99, 659.25, 493.88, 392.0, 329.63,
      ];
      let step = 0;

      const playNote = () => {
        if (!synthContextRef.current || synthContextRef.current.state !== "running") return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[step % notes.length];
        step++;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Acoustic envelope
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);
      };

      playNote();
      synthIntervalRef.current = setInterval(playNote, 450);
      setIsPlaying(true);
    } catch {
      // safe fallback
    }
  }, []);

  const stopSynthFallback = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthContextRef.current) {
      synthContextRef.current.suspend();
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.9;

    const handleError = () => {
      // Audio element failed or format not decoded, fallback to synth
      if (isPlaying) {
        startSynthFallback();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      stopSynthFallback();
    };
  }, [isPlaying, startSynthFallback, stopSynthFallback]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (isPlaying) {
      // Pause
      if (audio && !audio.paused) {
        audio.pause();
      }
      stopSynthFallback();
      setIsPlaying(false);
    } else {
      // Play
      if (audio) {
        try {
          audio.currentTime = 0;
          await audio.play();
          setIsPlaying(true);
        } catch {
          // If browser policy or file decode fails, use synthesizer
          startSynthFallback();
        }
      } else {
        startSynthFallback();
      }
    }
  };

  return (
    <>
      {/* Audio element with multiple sources for 100% device compatibility */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/kudmayi.mp3" type="audio/mpeg" />
        <source src="/kudmayi.wav" type="audio/wav" />
      </audio>

      {/* Floating Control Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
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
