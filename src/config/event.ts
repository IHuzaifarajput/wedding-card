export interface ContactPerson {
  role: string;
  phoneDisplay: string;
  phoneRaw: string;
}

export interface EventConfig {
  couple: {
    groom: string;
    bride: string;
    tagline: string;
    storySubtitle: string;
  };
  event: {
    type: string;
    dayOfWeek: string;
    day: string;
    month: string;
    year: string;
    dateFormatted: string;
    dateShort: string;
    targetCountdownIso: string; // ISO 8601 with Pakistan Timezone (UTC+5)
    quote: string;
    welcomeIntro: string;
    welcomeText: string;
  };
  venue: {
    heading: string;
    area: string;
    city: string;
    plusCode: string;
    mapUrl: string;
    note: string;
  };
  whatsapp: {
    phoneNumber: string; // international format without + for wa.me
    confirmationMessage: string;
  };
  contacts: ContactPerson[];
  music: {
    title: string;
    src: string;
  };
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export const eventConfig: EventConfig = {
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
    // 28 December 2026 at 12:00 AM Pakistan Standard Time (UTC+05:00)
    targetCountdownIso: "2026-12-28T00:00:00+05:00",
    quote: "And so, the adventure begins…",
    welcomeIntro: "With Love",
    welcomeText:
      "With love in our hearts and the blessings of our families, we invite you to be part of a day that means the world to us.\n\nJoin us as we celebrate the beginning of our forever.",
  },
  venue: {
    heading: "Valima Celebration",
    area: "Gulistan-e-Johar",
    city: "Karachi, Pakistan",
    plusCode: "W4GF+9P Gulistan-e-Johar, Karachi, Pakistan",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=W4GF%2B9P%20Gulistan-e-Johar%2C%20Karachi%2C%20Pakistan",
    note: "We can’t wait to celebrate with you.",
  },
  whatsapp: {
    phoneNumber: "923001234567",
    confirmationMessage:
      "Assalam-o-Alaikum! Thank you for inviting me to Huziafa & Kashaf’s Valima. I’m happy to confirm that I’ll be joining you on 28 December 2026. ❤️",
  },
  contacts: [
    {
      role: "Huziafa’s Family",
      phoneDisplay: "+92 300 1234567",
      phoneRaw: "+923001234567",
    },
    {
      role: "Kashaf’s Family",
      phoneDisplay: "+92 321 1234567",
      phoneRaw: "+923211234567",
    },
  ],
  music: {
    title: "Kudmayi",
    src: "/kudmayi.mp3",
  },
  meta: {
    title: "Huziafa & Kashaf | Valima Celebration",
    description:
      "You are warmly invited to the Valima celebration of Huziafa & Kashaf on 28 December 2026 in Karachi.",
    ogImage: "/og-image.jpg",
  },
};

