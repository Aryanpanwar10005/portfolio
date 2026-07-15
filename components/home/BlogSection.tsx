"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogPosts } from '@/content/blog'

export function BlogSection() {
  const latest = blogPosts.slice(0, 4)
  return (
    <section className="section-padding bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="label-caps mb-3">07 · Writing</p>
            <h2 className="font-display text-section text-foreground">
              Product evidence, <span className="font-serif-italic text-primary">in essays.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              Each post answers one PM hiring question — grounded in a real product I built, not a framework I memorised.
            </p>
          </div>
          <Link href="/writing" className="text-primary font-medium border-b border-primary pb-1">
            All essays →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {latest.map((p) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/writing/${p.slug}`} className="block group">
                <div className="aspect-[16/10] overflow-hidden bg-surface-3">
                  <img
                    src={p.cover}
                    alt={p.coverAlt}
                    className="w-full h-full object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 label-caps flex-wrap">
                  <span className="text-primary">{p.category}</span>
                  <span className="text-foreground-subtle">·</span>
                  <span>{p.readingTime}</span>
                  <span className="text-foreground-subtle">·</span>
                  <span>{p.publishedAt}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{p.summary}</p>
                <p className="mt-4 label-caps text-accent">Answers: {p.question}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
