"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/PageHeader'
import {
  flagshipCaseStudies,
  supportingCaseStudies,
  archivedProjects,
} from '@/content/caseStudies'

export default function CaseStudiesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Case Studies — Aryan Panwar',
            url: 'https://aryanpanwar.in/case-studies',
            hasPart: [...flagshipCaseStudies, ...supportingCaseStudies].map((c) => ({
              '@type': 'CreativeWork',
              name: c.title,
              url: `https://aryanpanwar.in/case-studies/${c.slug}`,
            })),
          })
        }}
      />
      <PageHeader
        eyebrow="Case Studies"
        title={<>Products in <span className="font-serif-italic text-primary">practice.</span></>}
        intro="Flagship studies I've thought about hardest, supporting studies for range, and an archive of everything else I've built."
      />
      <section className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
        <p className="label-caps mb-8">Flagship</p>
        <div className="space-y-20">
          {flagshipCaseStudies.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <Link href={`/case-studies/${c.slug}`} className="lg:col-span-7 block group">
                <div className="aspect-16/10 overflow-hidden bg-surface-2">
                  <img src={c.cover} alt={`${c.title} case study preview`} className="w-full h-full object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
              </Link>
              <div className="lg:col-span-5">
                <p className="label-caps text-accent mb-3">0{i + 1} · {c.status}</p>
                <h2 className="font-display text-large text-foreground">{c.title}</h2>
                <p className="mt-3 text-lg text-foreground-muted">{c.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 text-sm text-foreground-subtle">
                  <span>{c.role}</span><span>·</span><span>{c.platform}</span><span>·</span><span>{c.timeline}</span>
                </div>
                <Link href={`/case-studies/${c.slug}`} className="mt-6 inline-flex items-center gap-2 text-primary border-b border-primary pb-1 font-medium">
                  Read case study →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto border-t border-border">
        <h2 className="label-caps mb-8">Supporting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {supportingCaseStudies.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group block">
              <div className="aspect-16/10 overflow-hidden bg-surface-2 mb-5">
                <img src={c.cover} alt={`${c.title} case study preview`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              </div>
              <p className="label-caps text-accent mb-2">{c.status}</p>
              <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="mt-2 text-foreground-muted">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 pt-16 max-w-7xl mx-auto border-t border-border">
        <p className="label-caps mb-3">Archive</p>
        <h2 className="font-display text-large text-foreground mb-8">
          Things I've <span className="font-serif-italic text-primary">built.</span>
        </h2>
        <p className="text-foreground-muted max-w-2xl mb-10">
          Supporting products, hardware prototypes, and published research — evidence that the PM instinct is grounded in shipping real systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {archivedProjects.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col bg-surface-2 border border-border overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="aspect-16/10 overflow-hidden bg-primary/10 relative">
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt={`${p.title} cover`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center p-6 text-primary-foreground"
                    style={{
                      background:
                        'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.75) 100%)',
                    }}
                  >
                    <div className="text-center">
                      <p
                        className="font-display text-2xl md:text-3xl leading-tight"
                        style={{ color: 'hsl(var(--accent))' }}
                      >
                        {p.title}
                      </p>
                      {p.tag && (
                        <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">
                          {p.tag}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-foreground">{p.title}</h3>
                  <span className="label-caps text-foreground-subtle shrink-0">{p.year}</span>
                </div>
                {p.tag && (
                  <p className="mt-1 label-caps text-primary">
                    {p.tag}
                    {p.metric ? ` · ${p.metric}` : ''}
                  </p>
                )}
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">{p.problem}</p>
                <p className="mt-3 text-xs text-foreground-subtle">{p.stack.join(' · ')}</p>
                {p.links && p.links.length > 0 && (
                  <div className="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary underline underline-offset-4 hover:opacity-80"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
