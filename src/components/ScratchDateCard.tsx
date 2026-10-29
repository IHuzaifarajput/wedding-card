"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { CornerOrnament } from "./Ornaments";
import { Sparkles, RotateCcw, Eye } from "lucide-react";
import { eventConfig } from "@/config/event";

interface ScratchDateCardProps {
  onRevealed?: () => void;
}

export default function ScratchDateCard({ onRevealed }: ScratchDateCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Trigger celebration confetti
  const fireCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#D7B87B", "#BA8A45", "#F5ECE0", "#4E0F1D", "#FFFFFF", "#C59B51"],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Draw the rich 100% opaque golden foil coating
  const drawFoil = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.globalCompositeOperation = "source-over";

    // 1. Solid opaque base layer (100% covers anything underneath)
    ctx.fillStyle = "#8A5F26";
    ctx.fillRect(0, 0, width, height);

    // 2. Rich metallic gold & brass gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#986F33");
    gradient.addColorStop(0.18, "#BA8A45");
    gradient.addColorStop(0.35, "#D7B87B");
    gradient.addColorStop(0.5, "#F7EDD8");
    gradient.addColorStop(0.65, "#C4974F");
    gradient.addColorStop(0.85, "#BA8A45");
    gradient.addColorStop(1, "#7D541E");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 3. Metallic glitter grain overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
    for (let i = 0; i < 700; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rsize = Math.random() * 2 + 0.5;
      ctx.fillRect(rx, ry, rsize, rsize);
    }

    ctx.fillStyle = "rgba(78, 15, 29, 0.15)";
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rsize = Math.random() * 1.5 + 0.5;
      ctx.fillRect(rx, ry, rsize, rsize);
    }

    // 4. Double ornamental gold/maroon border
    ctx.strokeStyle = "rgba(78, 15, 29, 0.4)";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(15, 15, width - 30, height - 30);

    // Corner decorative brackets
    const cornerSize = 22;
    ctx.fillStyle = "#4E0F1D";
    // Top-left
    ctx.fillRect(10, 10, cornerSize, 4);
    ctx.fillRect(10, 10, 4, cornerSize);
    // Top-right
    ctx.fillRect(width - 10 - cornerSize, 10, cornerSize, 4);
    ctx.fillRect(width - 14, 10, 4, cornerSize);
    // Bottom-left
    ctx.fillRect(10, height - 14, cornerSize, 4);
    ctx.fillRect(10, height - 10 - cornerSize, 4, cornerSize);
    // Bottom-right
    ctx.fillRect(width - 10 - cornerSize, height - 14, cornerSize, 4);
    ctx.fillRect(width - 14, height - 10 - cornerSize, 4, cornerSize);

    const centerX = width / 2;

    // 5. Center Seal Motif
    const centerY = height * 0.33;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 36, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(78, 15, 29, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(78, 15, 29, 0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Star in center
    ctx.fillStyle = "#370914";
    ctx.font = "bold 26px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦", centerX, centerY);

    // 6. Text on Foil
    ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "rgba(78, 15, 29, 0.9)";
    ctx.fillText("EXCLUSIVE INVITATION", centerX, height * 0.53);

    ctx.font = "bold 21px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = "#370914";
    ctx.fillText("SCRATCH TO REVEAL", centerX, height * 0.64);

    ctx.font = "italic 13px Georgia, serif";
    ctx.fillStyle = "rgba(78, 15, 29, 0.9)";
    ctx.fillText("Rub with your finger or mouse", centerX, height * 0.74);

    ctx.font = "600 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#4E0F1D";
    ctx.fillText("✦ Uncover The Date ✦", centerX, height * 0.85);

    ctx.restore();
  }, []);

  // Initialize canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      drawFoil(ctx, rect.width, rect.height);
    }

    setIsRevealed(false);
    setScratchPercent(0);
  }, [drawFoil]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  // Check how much percentage of foil is scratched
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const sampleStep = 8;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;
      let totalSampled = 0;

      for (let y = 0; y < canvas.height; y += sampleStep) {
        for (let x = 0; x < canvas.width; x += sampleStep) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          if (alpha < 128) {
            transparentPixels++;
          }
          totalSampled++;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
      setScratchPercent(percent);

      if (percent >= 35 && !isRevealed) {
        setIsRevealed(true);
        fireCelebration();
        if (onRevealed) onRevealed();
      }
    } catch {
      // safe fallback
    }
  }, [isRevealed, fireCelebration, onRevealed]);

  // Scratch stroke logic
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 48;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (lastPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      lastPointRef.current = { x, y };
    },
    [isRevealed]
  );

  // Pointer event handlers (Universal mouse + touch support)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPointRef.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
    checkScratchPercentage();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // fallback
    }
    checkScratchPercentage();
  };

  // Reveal instantly button
  const handleRevealAll = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    fireCelebration();
    if (onRevealed) onRevealed();
  };

  // Reset & scratch again
  const handleReset = () => {
    setIsRevealed(false);
    setScratchPercent(0);
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const rect = container.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(dpr, dpr);
        drawFoil(ctx, rect.width, rect.height);
        ctx.restore();
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md mx-auto">
      {/* Scratch Header Label */}
      <div className="mb-3 flex items-center justify-between w-full px-2 text-xs font-sans">
        <span className="inline-flex items-center gap-1.5 text-[#BA8A45] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D7B87B] animate-spin" style={{ animationDuration: "6s" }} />
          {isRevealed ? "✨ Date Revealed!" : "Interactive Scratch Card"}
        </span>

        {!isRevealed && scratchPercent > 0 && (
          <span className="font-mono text-[11px] text-[#4E0F1D] font-bold bg-[#EEE2CF] px-2.5 py-0.5 rounded-full border border-[#BA8A45]/30">
            {scratchPercent}% Scratched
          </span>
        )}
      </div>

      {/* Main Card Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] sm:aspect-[1/1.2] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#BA8A45]/50 bg-[#4E0F1D] select-none"
      >
        {/* UNDERNEATH LAYER: The Wedding Date (z-0, completely underneath) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-[#F9F4E9] bg-gradient-to-b from-[#4E0F1D] via-[#370914] to-[#2A060F]">
          {/* Subtle radiating gold background */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#6A1A2B_0%,transparent_75%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Ornate Inner Border */}
          <div
            className="absolute inset-2 sm:inset-3 border border-[#BA8A45]/30 rounded-xl pointer-events-none"
            aria-hidden="true"
          >
            <CornerOrnament position="top-left" className="absolute top-0.5 left-0.5 text-[#D7B87B]/40" />
            <CornerOrnament position="top-right" className="absolute top-0.5 right-0.5 text-[#D7B87B]/40" />
            <CornerOrnament position="bottom-left" className="absolute bottom-0.5 left-0.5 text-[#D7B87B]/40" />
            <CornerOrnament position="bottom-right" className="absolute bottom-0.5 right-0.5 text-[#D7B87B]/40" />
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Day of Week */}
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D7B87B] font-semibold mb-1">
              {eventConfig.event.dayOfWeek}
            </p>

            <div className="w-12 h-[1px] bg-[#BA8A45]/50 my-2" aria-hidden="true" />

            {/* Date Number with gold shine */}
            <span className="font-serif text-7xl sm:text-8xl md:text-9xl font-light text-[#F9F4E9] tracking-tight leading-none my-1 drop-shadow-md">
              {eventConfig.event.day}
            </span>

            <div className="w-12 h-[1px] bg-[#BA8A45]/50 my-2" aria-hidden="true" />

            {/* Month */}
            <p className="font-sans text-sm sm:text-base uppercase tracking-[0.35em] text-[#D7B87B] font-medium">
              {eventConfig.event.month}
            </p>

            {/* Year */}
            <p className="font-serif text-xl sm:text-2xl tracking-[0.3em] text-[#EEE2CF]/90 font-light mt-1">
              {eventConfig.event.year}
            </p>

            {/* Emblem */}
            <div className="mt-3 text-[#D7B87B]/70 text-xs tracking-widest font-sans uppercase">
              ✦ Valima Celebration ✦
            </div>
          </div>
        </div>

        {/* TOP LAYER: Golden Foil Scratch Canvas (z-20, ALWAYS on top until scratched) */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 z-20 w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-700 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
        />
      </div>

      {/* Action Controls Below Card */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
        {!isRevealed ? (
          <button
            onClick={handleRevealAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4E0F1D] text-[#F9F4E9] text-xs sm:text-sm font-sans tracking-wider uppercase font-medium hover:bg-[#370914] transition-all duration-300 shadow-md hover:shadow-lg border border-[#BA8A45]/50 focus:outline-none focus:ring-2 focus:ring-[#BA8A45]"
          >
            <Eye className="w-4 h-4 text-[#D7B87B]" />
            <span>Reveal Instantly</span>
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#30271F] text-xs sm:text-sm font-sans tracking-wider uppercase font-medium hover:bg-white transition-all duration-300 shadow-sm border border-[#BA8A45]/30 focus:outline-none focus:ring-2 focus:ring-[#BA8A45]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#BA8A45]" />
            <span>Scratch Again</span>
          </button>
        )}
      </div>
    </div>
  );
}
