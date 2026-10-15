import Link from 'next/link'

// Shown for any unknown URL. The site was rebuilt in 2026, so most visitors
// landing here followed an old link: point them at the main sections.
const destinations = [
  { href: '/case-studies', label: 'Case studies' },
  { href: '/writing', label: 'Writing' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export default function NotFound() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-7xl mx-auto min-h-[70vh]">
      <p className="label-caps mb-4">404 · Page not found</p>
      <h1 className="font-display text-section text-foreground max-w-3xl">
        This page moved, or <span className="font-serif-italic text-primary-ink">never existed.</span>
      </h1>
      <p className="mt-6 text-lg text-foreground-muted max-w-xl leading-relaxed">
        The site was rebuilt in 2026, so some old links lead nowhere. These are the places people usually look for.
      </p>
      <ul className="mt-10 grid sm:grid-cols-2 gap-3 max-w-2xl">
        {destinations.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="flex items-center justify-between min-h-11 px-5 py-4 border border-border text-foreground hover:border-primary/40 hover:text-primary-ink transition-colors"
            >
              <span>{d.label}</span>
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-sm text-foreground-muted hover:text-primary-ink transition-colors">
        ← Back to the homepage
      </Link>
    </section>
  )
}
