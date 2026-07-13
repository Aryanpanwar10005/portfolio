import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/PageHeader'
import { Seo } from '@/components/Seo'
import { skillCategories, certifications } from '@/content/skills'
import { trackEvent } from '@/lib/analytics'
import { ExternalLink, Award, Search, X } from 'lucide-react'

const FILTERS = [
  { slug: 'all', title: 'All' },
  ...skillCategories.map((c) => ({ slug: c.slug, title: c.title })),
  { slug: 'certifications', title: 'Certifications' },
]

export default function SkillsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const q = query.trim().toLowerCase()

  const visibleCategories = useMemo(() => {
    if (filter === 'certifications') return []
    return skillCategories
      .filter((c) => filter === 'all' || c.slug === filter)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter((i) => i.toLowerCase().includes(q))
          : c.items,
      }))
      .filter((c) => (q ? c.items.length > 0 || c.title.toLowerCase().includes(q) : true))
  }, [filter, q])

  const visibleCerts = useMemo(() => {
    if (filter !== 'all' && filter !== 'certifications') return []
    if (!q) return certifications
    return certifications.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q),
    )
  }, [filter, q])

  const emptyState =
    visibleCategories.every((c) => c.items.length === 0) && visibleCerts.length === 0

  const handleFilter = (slug: string) => {
    setFilter(slug)
    trackEvent('skills_filter_change', { filter: slug })
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim().length >= 2) {
      trackEvent('skills_search', { query: value.trim().toLowerCase() })
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Certifications — Aryan Panwar',
    itemListElement: certifications.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'EducationalOccupationalCredential',
        name: c.title,
        credentialCategory: 'Certificate',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        dateCreated: c.date,
        ...(c.url ? { url: c.url } : {}),
      },
    })),
  }

  return (
    <>
      <Seo
        title="Skills & Certifications — Aryan Panwar, Aspiring PM"
        description="Searchable index of Aryan Panwar's PM toolkit, LLM/AI engineering stack, full-stack skills, and verified certifications from NVIDIA, Google, and Microsoft."
        path="/skills"
        keywords={[
          'Aryan Panwar skills',
          'PM toolkit',
          'AI product manager',
          'LangChain',
          'LangGraph',
          'RAG',
          'on-device AI',
          'NVIDIA DLI certification',
          'Google AI Essentials',
          'Google Prompting Essentials',
          'Microsoft Product Management',
        ]}
        image="/og-skills.webp"
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Skills & Certifications"
        title={<>The <span className="font-serif-italic text-primary">craft</span>, categorised.</>}
        intro="Skills are only useful if they show up in shipped work. Search a tool, filter by discipline, or scan the credentials that back it up."
      />

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-10">
        <div className="flex flex-col gap-5">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search skills, tools, or certifications…"
              aria-label="Search skills and certifications"
              className="w-full bg-surface-2 border border-border pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-subtle hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {FILTERS.map((f) => {
              const active = filter === f.slug
              return (
                <button
                  key={f.slug}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilter(f.slug)}
                  className={
                    'text-xs uppercase tracking-wider px-3.5 py-2 border transition-colors ' +
                    (active
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-foreground-muted hover:border-primary hover:text-primary')
                  }
                >
                  {f.title}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        {visibleCategories.length > 0 && (
          <p className="label-caps mb-8">Skills by discipline</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCategories.map((cat, i) => (
            <motion.article
              key={cat.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-surface-2 border border-border p-8 hover:border-primary/40 transition-colors"
            >
              <h2 className="font-display text-2xl text-foreground mb-2">{cat.title}</h2>
              <p className="text-sm text-foreground-muted leading-relaxed mb-6">{cat.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs uppercase tracking-wider px-3 py-1.5 border border-border text-foreground-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      {visibleCerts.length > 0 && (
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <h2 className="label-caps mb-8">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCerts.map((c) => (
            <article
              key={c.title}
              className="bg-background border border-border p-8 flex items-start gap-5"
            >
              <div className="shrink-0 w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="label-caps text-foreground-muted mb-2">{c.issuer} · {c.date}</p>
                <h3 className="font-display text-xl text-foreground leading-snug mb-3">{c.title}</h3>
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('certification_verify_click', {
                        title: c.title,
                        issuer: c.issuer,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover underline underline-offset-4"
                  >
                    Verify credential <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-foreground-muted italic">Verification link on request</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      )}

      {emptyState && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
          <div className="border border-dashed border-border p-10 text-center">
            <p className="font-display text-2xl text-foreground mb-2">No matches</p>
            <p className="text-sm text-foreground-muted">
              Nothing found for “{query}”. Try a broader term or clear filters.
            </p>
            <button
              onClick={() => {
                setQuery('')
                setFilter('all')
              }}
              className="mt-5 inline-flex items-center gap-2 border border-foreground/30 text-foreground px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Reset
            </button>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="label-caps mb-3">Where this shows up</p>
            <h2 className="font-display text-section text-foreground max-w-md">
              See the <span className="font-serif-italic text-primary">skills</span> in shipped product.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Read case studies <span aria-hidden>→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-6 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}