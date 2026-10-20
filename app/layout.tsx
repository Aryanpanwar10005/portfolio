import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ContactClickTracker } from "@/components/ContactClickTracker";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { VercelAnalytics } from "@/components/VercelAnalytics";

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

// Applied before first paint by the inline tag in <head> below. Reads an
// explicit stored choice first, then falls back to the OS setting.
const THEME_INIT =
  "(function(){try{var t=localStorage.getItem('theme');" +
  "if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))" +
  "document.documentElement.classList.add('dark')}catch(e){}})()";

export const metadata: Metadata = {
  title: {
    default: "Aryan Panwar | Business Analyst & AI Product Builder",
    template: "%s | Aryan Panwar",
  },
  description: "Aryan Panwar: Business Analyst on Salesforce projects, building AI products on the side. Case studies, product thinking and writing.",
  authors: [{ name: "Aryan Panwar" }],
  metadataBase: new URL("https://aryanpanwar.in"),
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
  openGraph: {
    title: "Aryan Panwar | Business Analyst & AI Product Builder",
    description: "Aryan Panwar: Business Analyst on Salesforce projects, building AI products on the side. Case studies, product thinking and writing.",
    url: "https://aryanpanwar.in/",
    type: "website",
    siteName: "Aryan Panwar | Product Evidence Book",
    // Preview images come from the opengraph-image.tsx file in each route
    // segment (branded 1200x630 PNG cards that LinkedIn renders reliably).
  },
  // Title, description and image are left out on purpose: X falls back to each
  // page's own og:* tags, so every page previews as itself.
  twitter: {
    card: "summary_large_image",
    site: "@aryanpanwar",
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Site-wide, because pages that set their own canonical replace metadata.alternates. */}
        <link rel="alternate" type="application/rss+xml" title="Aryan Panwar: Writing" href="/feed.xml" />
        {/*
          Runs synchronously before first paint so dark-mode visitors never see
          a light flash. next/script (even beforeInteractive) is not guaranteed
          to run this early, so this is a raw inline tag on purpose.
          Pairs with suppressHydrationWarning on <html> above.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_INIT,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://aryanpanwar.in/#website',
              name: 'Aryan Panwar',
              url: 'https://aryanpanwar.in',
              description: 'Aryan Panwar: Business Analyst on Salesforce projects, building AI products on the side. Case studies, product thinking and writing.',
              publisher: {
                '@type': 'Person',
                '@id': 'https://aryanpanwar.in/#person',
                name: 'Aryan Panwar',
              },
            }).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:border focus:border-border"
        >
          Skip to content
        </a>
        <GrainOverlay />
        <Navigation />
        <main id="main" className="grow">
          {children}
        </main>
        <Footer />
        <ContactClickTracker />
        <AnalyticsScripts />
        <VercelAnalytics />
      </body>
    </html>
  );
}
