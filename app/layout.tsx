import type { Metadata } from "next";
import { Inter, Fraunces, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { PageViewTracker } from "@/components/PageViewTracker";
import { AnalyticsScripts, GtmNoScript } from "@/components/AnalyticsScripts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aryan Panwar — Aspiring Product Manager",
    template: "%s | Aryan Panwar",
  },
  description: "Product Evidence Book by Aryan Panwar — case studies, product thinking, and writing from an aspiring PM with a builder background.",
  authors: [{ name: "Aryan Panwar" }],
  metadataBase: new URL("https://aryanpanwar.in"),
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
  openGraph: {
    title: "Aryan Panwar — Aspiring Product Manager",
    description: "Case studies, product thinking, and writing from Aryan Panwar — an aspiring PM with a builder background.",
    url: "https://aryanpanwar.in/",
    type: "website",
    siteName: "Aryan Panwar — Product Evidence Book",
    images: [
      {
        url: "/assets/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "Aryan Panwar — Aspiring Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aryanpanwar",
    title: "Aryan Panwar — Aspiring Product Manager",
    description: "Case studies, product thinking, and writing from Aryan Panwar — an aspiring PM with a builder background.",
    images: ["/assets/og-cover.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${greatVibes.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <AnalyticsScripts />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <GtmNoScript />
        <GrainOverlay />
        <Navigation />
        <main className="grow">
          {children}
        </main>
        <Footer />
        <PageViewTracker />
      </body>
    </html>
  );
}
