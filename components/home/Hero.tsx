"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { pmToolkit, technicalFluency, contactLinks } from '@/content/tools'
const portraitCutout = '/assets/aryan-portrait-cutout.webp'

// Above-the-fold evidence. No number appears here that is not defended on the
// page behind it.
const proofPoints = [
  {
    name: 'FitWardrobe',
    proof: 'AI wardrobe app. Its site ranks top 10 against Stylebook and Whering.',
    href: '/case-studies/fitwardrobe',
  },
  {
    name: 'SEO-GEO Optimizer',
    proof: 'Open-source GEO tool. 500+ npm downloads, no paid promotion.',
    href: '/case-studies/seo-geo-optimizer',
  },
  {
    name: 'Mithivoices',
    proof: 'Open-source voice AI, built to reply in under 500 ms.',
    href: '/case-studies/mithivoices',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28 pb-4 md:pb-8">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-7 order-2 lg:order-1 relative z-10">
          {/* Text starts visible (only a slide-in) so it paints with the first frame.
              On mobile the portrait sits above it, so visitors see who this is first. */}
          <motion.p
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="label-caps mb-5"
          >
            Aryan Panwar · Business Analyst · Salesforce
          </motion.p>

          <motion.h1
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.02] tracking-tight text-foreground max-w-[20ch]"
          >
            From requirements to <span className="font-serif-italic text-primary-ink">shipped AI products.</span>
          </motion.h1>

          {/* Also visible from the first paint: this paragraph is larger than the
              heading on mobile, so an opacity fade made it the (late) LCP element. */}
          <motion.p
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-5 max-w-xl text-base md:text-lg text-foreground-muted leading-relaxed"
          >
            I&apos;m Aryan Panwar, a Business Analyst on Salesforce projects at Cloud Ingenious.
            Outside work I&apos;ve built three AI products end to end. Each case study shows the
            problem, what I measured and what I cut.
          </motion.p>

          <motion.ul
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-3 border-t border-border pt-5 max-w-2xl"
          >
            {proofPoints.map((p) => (
              <li key={p.name}>
                <Link href={p.href} className="block group">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-primary-ink transition-colors">
                    {p.name}
                  </span>
                  <span className="block mt-1 text-sm text-foreground-muted leading-snug">
                    {p.proof}
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-7 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link href="/case-studies"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-3.5 text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
            >
              See the case studies <span aria-hidden>→</span>
            </Link>
            <Link href="/resume"
              className="inline-flex items-center gap-2 border-2 border-primary/80 text-primary-ink px-5 sm:px-6 py-3.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
            >
              Resume <span aria-hidden>→</span>
            </Link>
          </motion.div>

          <p className="mt-4 text-sm text-foreground-muted">
            Or say hello:{' '}
            <a href={`mailto:${contactLinks.email}`} className="text-primary-ink underline underline-offset-4 decoration-primary/40 hover:decoration-primary">email</a>
            {' '}·{' '}
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="text-primary-ink underline underline-offset-4 decoration-primary/40 hover:decoration-primary">LinkedIn</a>
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 max-w-2xl"
          >
            <div>
              <p className="label-caps mb-3">Work toolkit</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-muted">
                {['Salesforce', ...pmToolkit.slice(0, 4)].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="label-caps mb-3">What I build with</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-muted">
                {technicalFluency.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <Link href="/skills"
                onClick={() => {
                  import('@/lib/analytics').then((m) =>
                    m.trackEvent('skills_cta_click', { location: 'home_hero' })
                  )
                }}
                className="inline-flex items-center gap-1.5 min-h-11 text-sm text-primary-ink hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
              >
                See all skills &amp; certifications <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/*
          Portrait composition: wine arch + cutout + badge. On large screens the
          width is capped by the viewport height too, so the whole arch fits on
          short laptop screens (the cutout rises ~40% above the arch).
        */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative w-full max-w-60 sm:max-w-xs mt-28 sm:mt-36 mx-auto lg:mx-0 lg:mt-4 lg:max-w-none lg:w-[min(100%,26rem,calc((100svh-15rem)*0.8))] lg:justify-self-end lg:sticky lg:top-28">
          <div className="relative aspect-4/5 w-full">
            {/* Wine arch backdrop */}
            <div aria-hidden className="absolute inset-0 arch-shape bg-brand-surface" />
            {/* Portrait cutout - NOT clipped to arch, so it pops out! */}
            <div className="absolute inset-x-0 bottom-0 z-10 h-[142%] w-full pointer-events-none">
              <Image
                src={portraitCutout}
                alt="Aryan Panwar portrait"
                fill
                className="object-contain object-bottom select-none origin-bottom scale-120"
                draggable={false}
                preload
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Circular badge - anchored on arch shoulder top-right */}
            <div
              aria-hidden
              className="absolute top-2 -right-2 md:top-4 md:-right-4 lg:top-6 lg:-right-6 z-20 w-24 h-24 md:w-28 md:h-28 rounded-full border border-accent/60 flex items-center justify-center bg-background shadow-md"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <defs>
                  <path id="badgeCircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-accent-ink" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '3px' }}>
                  <textPath href="#badgeCircle" startOffset="0">BUSINESS ANALYST · AI BUILDER · </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-accent-ink" fill="currentColor">
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
