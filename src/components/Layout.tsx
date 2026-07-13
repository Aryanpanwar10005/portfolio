import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Footer } from "@/components/Footer";
import { AnalyticsScripts, GtmNoScript } from "@/components/AnalyticsScripts";
import { usePageViewTracking } from "@/hooks/useAnalytics";

export function Layout() {
  usePageViewTracking();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnalyticsScripts />
      <GtmNoScript />
      <GrainOverlay />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}