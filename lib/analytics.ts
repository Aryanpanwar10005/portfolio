// Lightweight analytics dispatcher. Forwards a named event to GA4 and
// Microsoft Clarity when they are loaded, and always emits a `window`
// CustomEvent + console.debug so custom listeners can hook in.
//
// Page views are NOT sent from here: GA4 records them itself (initial load +
// Enhanced Measurement history changes) and Clarity tracks SPA navigation.

type EventProps = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    clarity?: (...args: unknown[]) => void
  }
}

export function trackEvent(event: string, props: EventProps = {}) {
  if (typeof window === 'undefined') return
  try {
    window.gtag?.('event', event, props)
    window.clarity?.('event', event)
    window.dispatchEvent(new CustomEvent('app:analytics', { detail: { event, props } }))
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event, props)
    }
  } catch {
    /* analytics must never break the UI */
  }
}

// True when this browser opted out of analytics (the owner's own devices).
// ?notrack=1 sets the flag, ?notrack=0 clears it. AnalyticsScripts.tsx inlines
// the same check so GA4 and Clarity never load for an opted-out browser.
export function isTrackingOptedOut(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const p = new URLSearchParams(window.location.search).get('notrack')
    if (p === '1') localStorage.setItem('ap_notrack', '1')
    if (p === '0') localStorage.removeItem('ap_notrack')
    return localStorage.getItem('ap_notrack') === '1'
  } catch {
    return false
  }
}

// Classify the current viewport for analytics segmentation.
export function getDeviceCategory(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}
