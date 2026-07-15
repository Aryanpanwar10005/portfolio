"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/thinking', label: 'Product Thinking' },
  { to: '/skills', label: 'Skills' },
  { to: '/writing', label: 'Writing' },
  { to: '/journey', label: 'Journey' },
  { to: '/about', label: 'About' },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/60 md:bg-transparent md:border-transparent md:backdrop-blur-none'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/assets/ap-logo.webp"
            alt="Aryan Panwar monogram"
            className="w-11 h-11 object-contain"
          />
          <span className="hidden lg:flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.18em] text-foreground">ARYAN PANWAR</span>
            <span className="text-[11px] tracking-wide text-foreground-muted">Product Thinker · AI Builder</span>
          </span>
        </Link>

        {/* Tablet/desktop spread nav: md to lg */}
        <nav className="hidden md:flex lg:hidden items-center gap-6 mx-auto">
          {navItems.map((item) => {
            const currentPath = pathname || ''
            const isActive = currentPath === item.to || currentPath.startsWith(item.to + '/')
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={() =>
                  trackEvent('nav_click', { destination: item.to, label: item.label, surface: 'desktop' })
                }
                className={cn(
                  'text-sm font-medium text-foreground hover:text-primary transition-colors relative py-1',
                  isActive && 'text-primary after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-primary'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop glassmorphism pill: lg+ */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex items-center gap-1 rounded-full border border-border/50 bg-background/80 backdrop-blur-xl px-2 py-1.5 shadow-sm w-fit max-w-3xl">
            {navItems.map((item) => {
              const currentPath = pathname || ''
              const isActive = currentPath === item.to || currentPath.startsWith(item.to + '/')
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() =>
                    trackEvent('nav_click', { destination: item.to, label: item.label, surface: 'desktop' })
                  }
                  className={cn(
                    'text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-surface-2 text-foreground'
                      : 'text-foreground-muted hover:bg-foreground/5 hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/resume"
            onClick={() =>
              trackEvent('nav_click', { destination: '/resume', label: 'Resume CTA', surface: 'desktop' })
            }
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            Resume
            <Download className="w-4 h-4" />
          </Link>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-sm text-foreground px-3 py-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden bg-background border-b border-border transition-all duration-300',
          mobileOpen ? 'max-h-128 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => {
            const currentPath = pathname || ''
            const isActive = currentPath === item.to || currentPath.startsWith(item.to + '/')
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={() =>
                  trackEvent('nav_click', { destination: item.to, label: item.label, surface: 'mobile' })
                }
                className={cn('text-base text-foreground-muted', isActive && 'text-primary')}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/resume"
            onClick={() =>
              trackEvent('nav_click', { destination: '/resume', label: 'Resume CTA', surface: 'mobile' })
            }
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium"
          >
            Resume
            <Download className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
