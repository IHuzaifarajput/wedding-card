import React from "react";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import EventDate from "@/components/EventDate";
import Countdown from "@/components/Countdown";
import Story from "@/components/Story";
import Venue from "@/components/Venue";
import WhatsappConfirm from "@/components/WhatsappConfirm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MusicButton from "@/components/MusicButton";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#F9F4E9] text-[#30271F] flex flex-col selection:bg-[#BA8A45] selection:text-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Welcome Section */}
      <Welcome />

      {/* 3. Our Day Section */}
      <EventDate />

      {/* 4. Live Countdown */}
      <Countdown />

      {/* 5. Our Story */}
      <Story />

      {/* 6. Valima Celebration / Venue */}
      <Venue />

      {/* 7. WhatsApp RSVP Confirmation */}
      <WhatsappConfirm />

      {/* 8. Contact Our Families */}
      <Contact />

      {/* 9. Final Footer */}
      <Footer />

      {/* Floating Music Button */}
      <MusicButton />
    </main>
  );
}

