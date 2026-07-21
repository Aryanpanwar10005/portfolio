"use client"

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'


type Theme = 'light' | 'dark'

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read real preference only on client, after mount.
    // Wrapped in try/catch: localStorage can throw in private/incognito
    // or when storage is blocked by the browser. The finally clause
    // guarantees setMounted(true) always fires so the component leaves
    // its placeholder state regardless of storage errors.
    try {
      const stored = window.localStorage.getItem('theme')
      const resolved: Theme = stored === 'light' ? 'light' : 'dark'
      setTheme(resolved)
    } catch {
      // Keep dark fallback already set by useState
    } finally {
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      window.localStorage.setItem('theme', theme)
    } catch {}
  }, [theme, mounted])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    trackEvent('theme_toggle', { theme: next })
  }

  const isDark = theme === 'dark'

  // Render a stable placeholder during SSR & first hydration paint
  // so server HTML and client HTML always match (no hydration mismatch).
  // The button is disabled and aria-hidden so it is non-interactive:
  // it cannot be tabbed to, clicked, or announced by screen readers
  // before the real theme preference has been read from localStorage.
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        tabIndex={-1}
        aria-label="Loading theme"
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-2 text-foreground opacity-0 pointer-events-none',
          className
        )}
      >
        <Moon className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-2 text-foreground hover:text-primary hover:border-primary/40 transition-colors',
        className
      )}
    >
      {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  )
}