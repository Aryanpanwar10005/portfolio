// Lightweight analytics dispatcher. Forwards a named event to whichever
// analytics tool is loaded on the page (GA4, Plausible, Umami, PostHog)
// and always emits a `window` CustomEvent + console.debug so custom
// listeners can hook in without vendor lock-in.

type EventProps = Record<string, string | number | boolean | undefined>

// Fields every event MUST carry so downstream funnels can segment consistently.
const REQUIRED_FIELDS = ['device', 'viewport_width', 'referrer', 'path'] as const

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Array<Record<string, unknown>>
    plausible?: (event: string, opts?: { props?: EventProps }) => void
    umami?: { track: (event: string, props?: EventProps) => void }
    posthog?: { capture: (event: string, props?: EventProps) => void }
    clarity?: (...args: unknown[]) => void
  }
}

// Build the base envelope that every event is enriched with automatically.
function baseContext(): EventProps {
  if (typeof window === 'undefined') return {}
  return {
    device: getDeviceCategory(),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  }
}

export function trackEvent(event: string, props: EventProps = {}) {
  if (typeof window === 'undefined') return
  try {
    // Merge caller props over the base envelope so explicit overrides win,
    // but the required fields are always present.
    const enriched: EventProps = { ...baseContext(), ...props }

    // Dev warning if any required field is missing or empty.
    if (process.env.NODE_ENV === 'development') {
      const missing = REQUIRED_FIELDS.filter((k) => {
        const v = enriched[k]
        return v === undefined || v === null || v === ''
      })
      if (missing.length > 0) {
        // eslint-disable-next-line no-console
        console.warn(
          `[analytics] event "${event}" is missing required field(s): ${missing.join(', ')}`,
          enriched,
        )
      }
    }

    window.gtag?.('event', event, enriched)
    window.dataLayer?.push({ event, ...enriched })
    window.plausible?.(event, { props: enriched })
    window.umami?.track(event, enriched)
    window.posthog?.capture(event, enriched)
    window.clarity?.('event', event)
    window.dispatchEvent(new CustomEvent('app:analytics', { detail: { event, props: enriched } }))
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, enriched)
    }
  } catch {
    /* analytics must never break the UI */
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