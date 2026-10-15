import type { JSX } from "react";

// Purely decorative. The reduced-motion preference is handled in globals.css so
// this renders on the server with no client JS and no post-hydration pop-in.
export function GrainOverlay(): JSX.Element {
  return <div className="grain-overlay" aria-hidden="true" />;
}
