"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/PageHeader'
import { blogPosts, allBlogTags, allBlogCategories, blogTagToSlug, type BlogCategory } from '@/content/blog'

const ALL: 'All' = 'All'

export default function BlogIndex() {
  const [active, setActive] = useState<BlogCategory | typeof ALL>(ALL)
  const categories = allBlogCategories()
  const tags = allBlogTags()

  const [featured, ...rest] = blogPosts
  const filtered = useMemo(
    () => (active === ALL ? rest : blogPosts.filter((p) => p.category === active && p.slug !== featured.slug)),
    [active, rest, featured.slug]
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Aryan Panwar — Writing',
            url: 'https://aryanpanwar.in/writing',
            description: 'Ten PM-evidence essays. Each answers one hiring question with a real product decision.',
            blogPost: blogPosts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: `https://aryanpanwar.in/writing/${p.slug}`,
              datePublished: p.publishedAtISO,
              articleSection: p.category,
              keywords: p.tags.join(', '),
            })),
          })
        }}
      />
      <PageHeader
        eyebrow="Writing"
        title={<>Product evidence, <span className="font-serif-italic text-primary">one question at a time.</span></>}
        intro="Ten essays. Each answers a specific question a PM recruiter asks — grounded in a product I actually shipped."
      />

      {featured && (
        <section className="px-6 md:px-10 pb-16 max-w-6xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <Link href={`/writing/${featured.slug}`} className="lg:col-span-7 block group">
              <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
                <Image
                  src={featured.cover}
                  alt={featured.coverAlt}
                  fill
                  className="object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </Link>
            <div className="lg:col-span-5">
              <p className="label-caps text-accent">Featured essay</p>
              <div className="mt-3 flex flex-wrap gap-3 label-caps">
                <span className="text-primary">{featured.category}</span>
                <span className="text-foreground-subtle">·</span>
                <span>{featured.readingTime}</span>
                <span className="text-foreground-subtle">·</span>
                <time dateTime={featured.publishedAtISO}>{featured.publishedAt}</time>
              </div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-foreground leading-tight">
                <Link href={`/writing/${featured.slug}`} className="hover:text-primary transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-lg text-foreground-muted leading-relaxed">{featured.summary}</p>
              <p className="mt-4 label-caps text-accent">Answers: {featured.question}</p>
              <Link
                href={`/writing/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-primary font-medium border-b border-primary pb-1 hover:gap-3 transition-all"
              >
                Read the essay <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.article>
        </section>
      )}

      <section className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="border-t border-border pt-8 pb-6 flex flex-wrap gap-2">
          {[ALL as string, ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c as BlogCategory | typeof ALL)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                active === c
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-foreground-muted hover:text-primary hover:border-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filtered.map((p) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/writing/${p.slug}`} className="group block">
                <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    className="object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-3 label-caps">
                  <span className="text-primary">{p.category}</span>
                  <span className="text-foreground-subtle">·</span>
                  <span>{p.readingTime}</span>
                  <span className="text-foreground-subtle">·</span>
                  <time dateTime={p.publishedAtISO}>{p.publishedAt}</time>
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{p.summary}</p>
                <p className="mt-4 label-caps text-accent">Answers: {p.question}</p>
              </Link>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <p className="text-foreground-muted col-span-full">No essays in this category yet.</p>
          )}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <div className="border-t border-border pt-12">
          <p className="label-caps text-foreground-subtle mb-4">Browse by topic</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t}
                href={`/writing/tag/${blogTagToSlug(t)}`}
                className="text-sm px-3 py-1.5 border border-border rounded-full text-foreground-muted hover:text-primary hover:border-primary transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
