import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Parisienne } from "next/font/google";
import "./globals.css";
import { eventConfig } from "@/config/event";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#370914",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://huziafa-kashaf-valima.com"),
  title: eventConfig.meta.title,
  description: eventConfig.meta.description,
  authors: [{ name: "Huziafa & Kashaf" }],
  keywords: ["Valima", "Wedding Invitation", "Huziafa", "Kashaf", "Karachi", "Pakistan", "Valima Celebration"],
  openGraph: {
    title: eventConfig.meta.title,
    description: eventConfig.meta.description,
    url: "https://huziafa-kashaf-valima.com",
    siteName: "Huziafa & Kashaf Valima Celebration",
    images: [
      {
        url: eventConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: "Huziafa & Kashaf Valima Invitation",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: eventConfig.meta.title,
    description: eventConfig.meta.description,
    images: [eventConfig.meta.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${parisienne.variable}`}>
      <body className="antialiased selection:bg-[#BA8A45] selection:text-white bg-[#F9F4E9] text-[#30271F]">
        {children}
      </body>
    </html>
  );
}
