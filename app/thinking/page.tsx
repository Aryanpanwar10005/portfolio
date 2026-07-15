"use client"

import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { playbook } from '@/content/playbook'
import { motion } from 'framer-motion'

export default function PlaybookIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'My Product Thinking — Aryan Panwar',
            url: 'https://aryanpanwar.in/thinking',
            hasPart: playbook.map((p) => ({
              '@type': 'CreativeWork',
              name: p.title,
              url: `https://aryanpanwar.in/thinking/${p.slug}`,
            })),
          })
        }}
      />
      <PageHeader
        eyebrow="My Product Thinking"
        title={<>Frameworks, <span className="font-serif-italic text-primary">grounded in real work.</span></>}
        intro="Not a theory dump. Every entry starts with a product I've shipped, and the framework that shaped a real decision inside it."
      />
      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="paper p-2 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {playbook.map((p) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="nth-[-n+3]:md:border-b nth-[-n+3]:md:border-border"
              >
                <Link href={`/thinking/${p.slug}`} className="block p-8 h-full group hover:bg-background/60 transition-colors">
                  <p className="label-caps text-accent mb-3">{p.number}</p>
                  <h2 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">{p.title}</h2>
                  <p className="mt-3 text-foreground-muted text-sm leading-relaxed">{p.summary}</p>
                  <p className="mt-4 label-caps text-foreground-subtle">Project · {p.project}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
