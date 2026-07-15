"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { pmToolkit, technicalFluency, values } from '@/content/tools'
const portraitCutout = '/assets/aryan-portrait-cutout.webp'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-32">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7 order-2 lg:order-1 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="label-caps mb-6"
          >
            A Product Evidence Book · Aspiring PM
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-hero text-foreground lg:max-w-[14ch]"
          >
            I ship products <span className="font-serif-italic text-primary">to learn</span> how to be a great PM.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg text-foreground-muted leading-relaxed"
          >
            I'm Aryan Panwar — an aspiring Product Manager with a builder background.
            This isn't a portfolio; it's evidence. Case studies from products I've
            shipped, the tradeoffs I made along the way, and the writing that shows
            how I think about product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/case-studies"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Read case studies <span aria-hidden>→</span>
            </Link>
            <Link href="/thinking"
              className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-6 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              My Product Thinking
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 space-y-6"
          >
            <div>
              <p className="label-caps mb-3">PM toolkit</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-muted">
                {pmToolkit.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="label-caps mb-3">Technical fluency</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-muted">
                {technicalFluency.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="pt-1">
              <Link href="/skills"
                onClick={() => {
                  import('@/lib/analytics').then((m) =>
                    m.trackEvent('skills_cta_click', { location: 'home_hero' })
                  )
                }}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
              >
                See all skills &amp; certifications <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-serif-italic text-foreground-subtle"
          >
            {values.map((v, i) => (
              <span key={v} className="flex items-center gap-4">
                {v}
                {i < values.length - 1 && <span className="text-accent">·</span>}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Portrait composition: wine arch + cutout + signature + badge */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative w-full max-w-sm sm:max-w-md lg:max-w-[380px] xl:max-w-[460px] 2xl:max-w-none mx-auto lg:mx-0 lg:justify-self-end lg:sticky lg:top-32">
          <div className="relative aspect-4/5 w-full">
            {/* Clip portrait to arch shape */}
            {/* Wine arch backdrop */}
            <div aria-hidden className="absolute inset-0 arch-shape bg-primary" />
            {/* Portrait cutout — NOT clipped to arch, so it pops out! */}
            <div className="absolute inset-0 z-10">
            <img
              src={portraitCutout}
              alt="Aryan Panwar portrait"
              className="absolute inset-x-0 bottom-0 mx-auto h-[115%] max-w-none w-auto object-contain object-bottom select-none pointer-events-none origin-bottom"
              draggable={false}
              loading="eager"
              {...{ fetchPriority: "high" }}
            />
            </div>

            {/* Circular badge — overlaps arch top-right */}
            <div
              aria-hidden
              className="absolute -top-6 -right-4 md:-top-8 md:-right-8 lg:-top-10 lg:-right-10 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border border-accent/60 flex items-center justify-center bg-background"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <defs>
                  <path id="badgeCircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-accent" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '3px' }}>
                  <textPath href="#badgeCircle" startOffset="0">PRODUCT THINKER · AI BUILDER · </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-accent" fill="currentColor">
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-20 flex flex-col items-center gap-2 label-caps"
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-foreground/30" />
      </motion.div>
    </section>
  )
}