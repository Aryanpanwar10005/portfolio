"use client"

import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

type Theme = 'light' | 'dark'

// The `dark` class on <html> is the single source of truth. The blocking script
// in app/layout.tsx has already resolved localStorage + prefers-color-scheme and
// applied it before first paint, so subscribing to the DOM keeps every toggle
// instance (desktop and mobile both render one) in sync with what is on screen.
const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

// No DOM on the server. The inline script corrects this before the user sees
// anything, and React re-reads the real value straight after hydration.
function getServerSnapshot(): Theme {
  return 'light'
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isDark = theme === 'dark'

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    // Written only on an explicit choice, so a visitor who has never pressed the
    // button keeps following their OS preference on later visits.
    try {
      window.localStorage.setItem('theme', next)
    } catch {
      // Private mode or blocked storage: the toggle still works for this session.
    }
    listeners.forEach((notify) => notify())
    trackEvent('theme_toggle', { theme: next })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-surface-2 text-foreground hover:text-primary-ink hover:border-primary/40 transition-colors',
        className
      )}
    >
      {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  )
}
