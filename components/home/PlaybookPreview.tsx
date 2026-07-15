"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { playbook } from '@/content/playbook'

export function PlaybookPreview() {
  return (
    <section className="section-padding bg-surface-3 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="label-caps mb-3">04 · My Product Thinking</p>
            <h2 className="font-display text-section text-foreground">
              Frameworks, <span className="font-serif-italic text-primary">grounded</span> in real projects.
            </h2>
            <p className="mt-3 max-w-xl text-lg text-foreground-muted">
              Every entry starts with a product I shipped — not with theory.
              JTBD applied to FitWardrobe, RICE applied to Mithivoices, and so on.
            </p>
          </div>
          <Link href="/thinking" className="text-primary font-medium border-b border-primary pb-1">
            Open my thinking →
          </Link>
        </div>

        <div className="paper p-2 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border [&>*:nth-child(-n+3)]:md:border-b [&>*:nth-child(-n+3)]:md:border-border">
            {playbook.map((entry) => (
              <motion.div
                key={entry.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={`/thinking/${entry.slug}`}
                  className="block p-6 h-full hover:bg-background/60 transition-colors group"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="label-caps text-accent">{entry.number}</span>
                    <span className="text-foreground-muted group-hover:text-primary transition-colors">→</span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                    {entry.summary}
                  </p>
                  <p className="mt-3 label-caps text-foreground-subtle">Project · {entry.project}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}