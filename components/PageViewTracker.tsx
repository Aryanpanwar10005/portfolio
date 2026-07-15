"use client"

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

function Tracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const search = searchParams ? searchParams.toString() : ''
    const path = (pathname || '') + (search ? `?${search}` : '')
    if (lastPath.current === path) return
    lastPath.current = path
    trackEvent('page_view', {
      search: search || undefined,
    })
  }, [pathname, searchParams])

  return null
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  )
}
