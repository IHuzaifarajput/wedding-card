import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#370914] text-[#F9F4E9] px-4 text-center">
      <h1 className="font-serif text-5xl sm:text-6xl text-[#D7B87B] mb-4">404</h1>
      <p className="font-serif text-xl sm:text-2xl mb-6">Page Not Found</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#BA8A45] text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-[#D7B87B] transition-colors"
      >
        Return to Invitation
      </Link>
    </div>
  );
}

