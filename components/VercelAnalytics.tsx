"use client"

import { Analytics } from "@vercel/analytics/react";
import { isTrackingOptedOut } from "@/lib/analytics";

// Vercel Analytics with the same owner opt-out as GA4 and Clarity (?notrack=1).
export function VercelAnalytics() {
  return <Analytics beforeSend={(event) => (isTrackingOptedOut() ? null : event)} />;
}
