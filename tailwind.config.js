/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F9F4E9",
          50: "#FDFAF5",
          100: "#F9F4E9",
          200: "#F3EAD7",
        },
        beige: {
          warm: "#EEE2CF",
          light: "#F5ECE0",
          dark: "#D8C7AD",
        },
        maroon: {
          deep: "#4E0F1D",
          dark: "#370914",
          subtle: "#5A1322",
          surface: "#2A060F",
        },
        gold: {
          muted: "#BA8A45",
          light: "#D7B87B",
          dark: "#986F33",
          border: "rgba(186, 138, 69, 0.35)",
          glow: "rgba(215, 184, 123, 0.18)",
        },
        charcoal: {
          DEFAULT: "#30271F",
          light: "#4B3F33",
          muted: "#6B5E52",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "-apple-system", "sans-serif"],
        script: ["var(--font-script)", "Parisienne", "cursive"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float-slow": "floatSlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

