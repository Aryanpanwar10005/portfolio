import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'

// Fire a `page_view` event on every route change. Mount once at the Layout level.
export function usePageViewTracking() {
  const location = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const path = location.pathname + location.search
    if (lastPath.current === path) return
    lastPath.current = path
    trackEvent('page_view', {
      search: location.search || undefined,
    })
  }, [location.pathname, location.search])
}

// Fire an event the first time an element becomes visible in the viewport.
// Returns a ref to attach to the target element.
export function useSectionViewTracking<T extends HTMLElement = HTMLElement>(
  event: string,
  props: Record<string, string | number | boolean | undefined> = {},
  options: IntersectionObserverInit = { threshold: 0.4 },
) {
  const ref = useRef<T | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          trackEvent(event, props)
          io.disconnect()
          break
        }
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  return ref
}

// Track how long a section was visible on screen, and fire once when the user
// scrolls fully through it (>=95% of its bottom edge has passed the viewport).
// Emits two events:
//   - `<event>_dwell` when the user leaves the section or unmounts (ms visible)
//   - `<event>_complete` once when the section has been fully scrolled through
export function useEngagementTracking<T extends HTMLElement = HTMLElement>(
  event: string,
  props: Record<string, string | number | boolean | undefined> = {},
) {
  const ref = useRef<T | null>(null)
  const visibleSince = useRef<number | null>(null)
  const totalDwellMs = useRef(0)
  const completed = useRef(false)
  const flushed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const startVisible = () => {
      if (visibleSince.current == null) visibleSince.current = performance.now()
    }
    const stopVisible = () => {
      if (visibleSince.current != null) {
        totalDwellMs.current += performance.now() - visibleSince.current
        visibleSince.current = null
      }
    }

    const visibilityIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) startVisible()
          else stopVisible()
        }
      },
      { threshold: [0, 0.25] },
    )
    visibilityIO.observe(el)

    // Completion sentinel: a 1px marker at the bottom of the section. When it
    // enters the viewport, the user has scrolled past the whole section.
    const sentinel = document.createElement('div')
    sentinel.style.cssText =
      'position:absolute;bottom:0;left:0;width:1px;height:1px;pointer-events:none;'
    const prevPosition = getComputedStyle(el).position
    if (prevPosition === 'static') el.style.position = 'relative'
    el.appendChild(sentinel)

    const completionIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !completed.current) {
            completed.current = true
            trackEvent(`${event}_complete`, {
              ...props,
              dwell_ms_so_far: Math.round(totalDwellMs.current),
            })
            completionIO.disconnect()
            break
          }
        }
      },
      { threshold: 0.01 },
    )
    completionIO.observe(sentinel)

    const flush = (reason: string) => {
      if (flushed.current) return
      stopVisible()
      const ms = Math.round(totalDwellMs.current)
      if (ms < 500) return // ignore accidental hover-throughs
      flushed.current = true
      trackEvent(`${event}_dwell`, {
        ...props,
        dwell_ms: ms,
        completed: completed.current,
        reason,
      })
    }

    const onHidden = () => {
      if (document.visibilityState === 'hidden') flush('page_hidden')
    }
    document.addEventListener('visibilitychange', onHidden)
    window.addEventListener('pagehide', () => flush('pagehide'))

    return () => {
      visibilityIO.disconnect()
      completionIO.disconnect()
      document.removeEventListener('visibilitychange', onHidden)
      sentinel.remove()
      flush('unmount')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  return ref
}