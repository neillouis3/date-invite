import type { Metadata, Viewport } from "next";
import { Caveat, Dancing_Script, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const itineraryHand = Dancing_Script({
  variable: "--font-itinerary-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const letterHand = Caveat({
  variable: "--font-letter-hand",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Date with you",
  description: "Happy monthsary saatin. Open when you're ready.",
};

export const viewport: Viewport = {
  themeColor: "#fff5f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${itineraryHand.variable} ${letterHand.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-sm text-foreground">
        {children}
      </body>
    </html>
  );
}
