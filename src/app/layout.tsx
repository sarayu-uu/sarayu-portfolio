import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { SpeedInsights } from "@vercel/speed-insights/next";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarayu Ramdas | Portfolio",
  description:
    "Frontend-focused developer crafting smooth interfaces with React, Next.js, and motion design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
