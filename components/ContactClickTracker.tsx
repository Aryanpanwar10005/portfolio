"use client"

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

// Records the action that matters most on a portfolio: someone reaching out.
// One delegated listener covers every email, LinkedIn, phone and calendar link
// on the site, wherever it is rendered. Mark `contact_click` as a key event in
// GA4 (Admin > Events) so it counts as a conversion.
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''

      let method: string | null = null
      if (href.startsWith('mailto:')) method = 'email'
      else if (href.startsWith('tel:')) method = 'phone'
      else if (/linkedin\.com|lnkd\.in/i.test(href)) method = 'linkedin'
      else if (/calendly\.com|cal\.com/i.test(href)) method = 'calendar'
      if (!method) return

      trackEvent('contact_click', { method, link_page: window.location.pathname })
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
