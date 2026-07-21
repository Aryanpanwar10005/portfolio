"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { flagshipCaseStudies } from '@/content/caseStudies'

export function CaseStudiesList() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="label-caps mb-3">05 · Flagship Case Studies</p>
          <h2 className="font-display text-section text-foreground max-w-3xl">
            Three products, <span className="font-serif-italic text-primary">told the PM way.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
            Problem, users, tradeoffs, metrics, and what I'd do next — for the three
            projects I've thought about hardest.
          </p>
        </div>

        <div className="space-y-24">
          {flagshipCaseStudies.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <Link href={`/case-studies/${c.slug}`} className="lg:col-span-7 block group overflow-hidden">
                <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
                  <Image
                    src={c.cover}
                    alt={`${c.title} case study cover`}
                    fill
                    className="object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Link>
              <div className="lg:col-span-5 lg:px-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="label-caps text-accent">0{i + 1}</span>
                  {c.status && (
                    <span className="text-xs px-2 py-0.5 border border-border rounded-full text-foreground-muted">
                      {c.status}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-large text-foreground">{c.title}</h3>
                <p className="mt-3 text-lg text-foreground-muted leading-relaxed">
                  {c.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-foreground-subtle">
                  <span>{c.role}</span>
                  <span>·</span>
                  <span>{c.platform}</span>
                  <span>·</span>
                  <span>{c.timeline}</span>
                </div>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-primary font-medium border-b border-primary pb-1 hover:gap-3 transition-all"
                >
                  View case study <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.article>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-border pt-8 text-center"
          >
            <p className="font-serif-italic text-xl text-foreground-muted">
              Supporting case studies and the full archive live on the{' '}
              <a href="/case-studies" className="text-primary border-b border-primary">Case Studies page</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}