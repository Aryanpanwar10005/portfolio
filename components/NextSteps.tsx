import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Props = {
  next?: { href: string; label: string; kicker?: string }
  className?: string
}

// Closing block for detail and profile pages, so no page ends in a dead end:
// one "what to read next" link plus the two actions a recruiter wants.
export function NextSteps({ next, className = '' }: Props) {
  return (
    <section className={`max-w-7xl mx-auto px-6 md:px-10 pb-24 ${className}`}>
      <div className="border-t border-border pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        {next ? (
          <Link href={next.href} className="group max-w-xl">
            <p className="label-caps mb-2">{next.kicker ?? 'Up next'}</p>
            <p className="font-display text-2xl md:text-3xl leading-tight text-foreground group-hover:text-primary-ink transition-colors">
              {next.label} <span aria-hidden>→</span>
            </p>
          </Link>
        ) : (
          <div />
        )}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume"
            className="inline-flex items-center min-h-11 px-5 border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary-ink transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 min-h-11 px-5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Get in touch <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
