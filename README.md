# Huziafa & Kashaf — Valima Celebration Invitation

A luxury, responsive one-page digital wedding invitation website built with Next.js (App Router), TypeScript, and Tailwind CSS.

Designed with a sophisticated South Asian aesthetic: warm ivory, deep maroon, muted gold, soft beige, and Cormorant Garamond serif typography with Parisienne script accents.

---

## 🚀 Getting Started

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## ⚙️ Easy Configuration (`src/config/event.ts`)

All event details are centralized in one single configuration file: [`src/config/event.ts`](file:///src/config/event.ts). You can change couple names, dates, times, venue details, WhatsApp RSVP phone numbers, and music without touching component code.

```typescript
export const eventConfig = {
  couple: {
    groom: "HUZIAFA",
    bride: "KASHAF",
    tagline: "Two hearts. One promise. A beautiful beginning.",
    storySubtitle: "Two lives, two families, and one beautiful new beginning.",
  },
  event: {
    type: "VALIMA CELEBRATION",
    dayOfWeek: "MONDAY",
    day: "28",
    month: "DECEMBER",
    year: "2026",
    dateFormatted: "Monday, 28 December 2026",
    dateShort: "28 · 12 · 2026",
    // Set to 28 Dec 2026 12:00 AM Pakistan Time (UTC+05:00)
    targetCountdownIso: "2026-12-28T00:00:00+05:00",
    quote: "And so, the adventure begins…",
    welcomeIntro: "With Love",
    welcomeText: "...",
  },
  venue: {
    heading: "Valima Celebration",
    area: "Gulistan-e-Johar",
    city: "Karachi, Pakistan",
    plusCode: "W4GF+9P Gulistan-e-Johar, Karachi, Pakistan",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=W4GF%2B9P%20Gulistan-e-Johar%2C%20Karachi%2C%20Pakistan",
    note: "We can’t wait to celebrate with you.",
  },
  whatsapp: {
    phoneNumber: "923001234567",
    confirmationMessage: "Assalam-o-Alaikum! Thank you for inviting me to Huziafa & Kashaf’s Valima. I’m happy to confirm that I’ll be joining you on 28 December 2026. ❤️",
  },
  contacts: [
    { role: "Huziafa’s Family", phoneDisplay: "+92 300 1234567", phoneRaw: "+923001234567" },
    { role: "Kashaf’s Family", phoneDisplay: "+92 321 1234567", phoneRaw: "+923211234567" },
  ],
  music: {
    title: "Kudmayi",
    src: "/kudmayi.mp3",
  },
};
```

---

## 🎵 Background Music

The floating music button in the bottom-right corner plays `public/kudmayi.mp3`.
- Autoplay is disabled by default to respect browser policies and wedding guest experience.
- When clicked, it smoothly toggles between Play and Pause with visual equalizer animation.
- If the audio file is missing or blocked, the site handles it gracefully with a polite toast notice and continues working without console errors.

---

## 📱 Mobile-First & WhatsApp Sharing

- Responsive grid and typography designed and tested on mobile widths down to 360px.
- Zero horizontal overflow.
- One-click Google Maps location with Plus Code.
- One-click WhatsApp RSVP with formatted Urdu/English greeting.
- Clickable telephone links for both families.
- Social Open Graph and Twitter card meta tags for WhatsApp previews.

