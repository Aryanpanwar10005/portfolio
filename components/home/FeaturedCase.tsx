"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { caseStudies } from '@/content/caseStudies'

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' as const },
}

export function FeaturedCase() {
  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0]

  return (
    <section className="section-padding bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fade} className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="label-caps mb-3">02 · Featured Case Study</p>
            <h2 className="font-display text-section text-foreground">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-foreground-muted">{featured.tagline}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div {...fade} className="lg:col-span-8 relative">
            {/* Laptop frame */}
            <div className="relative bg-foreground rounded-t-lg p-3 md:p-4 shadow-2xl">
              <div className="aspect-[16/10] overflow-hidden rounded-sm">
                <img
                  src={featured.cover}
                  alt={`${featured.title} desktop preview`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="h-3 bg-foreground/80 rounded-b-2xl mx-[-1rem]" />

            {/* Mobile mockup overlay */}
            <div className="hidden md:block absolute -bottom-16 -right-4 w-40 lg:w-52">
              <div className="bg-foreground rounded-[2rem] p-2 shadow-2xl border border-foreground/40">
                <div className="aspect-[9/19] overflow-hidden rounded-[1.6rem]">
                  <img
                    src={featured.cover}
                    alt={`${featured.title} mobile preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade} className="lg:col-span-4 space-y-6 md:pl-6 mt-24 lg:mt-0">
            <div>
              <p className="label-caps mb-2">Problem</p>
              <p className="text-foreground">{featured.problem}</p>
            </div>
            <div>
              <p className="label-caps mb-2">Solution</p>
              <p className="text-foreground">{featured.solution}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="label-caps mb-1">Role</p>
                <p className="text-sm text-foreground-muted">{featured.role}</p>
              </div>
              <div>
                <p className="label-caps mb-1">Platform</p>
                <p className="text-sm text-foreground-muted">{featured.platform}</p>
              </div>
              <div className="col-span-2">
                <p className="label-caps mb-1">Timeline</p>
                <p className="text-sm text-foreground-muted">{featured.timeline}</p>
              </div>
            </div>
            <Link
              href={`/case-studies/${featured.slug}`}
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all border-b border-primary pb-1"
            >
              Read the full case study <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}