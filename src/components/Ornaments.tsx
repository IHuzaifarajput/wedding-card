import React from "react";

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full my-4 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#BA8A45]/60 to-[#D7B87B]" />
      <div className="flex items-center gap-1.5 text-[#D7B87B]">
        <span className="w-1 h-1 rounded-full bg-[#BA8A45]" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-[#D7B87B] transform rotate-45"
        >
          <rect x="6" y="6" width="12" height="12" rx="1" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
        <span className="w-1 h-1 rounded-full bg-[#BA8A45]" />
      </div>
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-[#BA8A45]/60 to-[#D7B87B]" />
    </div>
  );
}

export function CornerOrnament({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const rotationClass = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none text-[#D7B87B]/40 ${rotationClass} ${className}`}
    >
      <path
        d="M2 2 H28 C28 2 24 8 16 16 C8 24 2 28 2 28 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path d="M2 14 C8 14 14 8 14 2" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function FloralMedallion({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center select-none ${className}`} aria-hidden="true">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="text-[#D7B87B]/50 hover:text-[#D7B87B]/80 transition-colors duration-500"
      >
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" />
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="32" cy="32" r="4" fill="currentColor" fillOpacity="0.8" />
        {/* 8-point subtle star motif */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 32 32)`}>
            <path
              d="M32 10 C34 16 35 22 32 26 C29 22 30 16 32 10 Z"
              fill="currentColor"
              fillOpacity="0.35"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="32" cy="12" r="1" fill="currentColor" />
          </g>
        ))}
      </svg>
    </div>
  );
}

