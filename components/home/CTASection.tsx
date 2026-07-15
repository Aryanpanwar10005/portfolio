"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { contactLinks } from '@/content/tools'

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="label-caps mb-8">09 · Let's Talk</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display text-hero text-foreground leading-[1.02] max-w-5xl"
        >
          Let's build something <span className="font-serif-italic text-primary">meaningful.</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <p className="text-lg text-foreground-muted max-w-lg leading-relaxed">
            I'm looking for a product team where the bar is high and the users are real.
            If that sounds like you, get in touch.
          </p>

          <div className="space-y-2">
            <a href={`mailto:${contactLinks.email}`} className="group flex items-center justify-between py-4 border-b border-border">
              <span className="label-caps">Email</span>
              <span className="text-foreground group-hover:text-primary transition-colors">{contactLinks.email}</span>
            </a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4 border-b border-border">
              <span className="label-caps">LinkedIn</span>
              <span className="text-foreground group-hover:text-primary transition-colors">/in/aryan-panwar1 ↗</span>
            </a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4 border-b border-border">
              <span className="label-caps">GitHub</span>
              <span className="text-foreground group-hover:text-primary transition-colors">@Aryanpanwar10005 ↗</span>
            </a>
            <Link href="/resume" className="group flex items-center justify-between py-4 border-b border-border">
              <span className="label-caps">Resume</span>
              <span className="text-foreground group-hover:text-primary transition-colors">Interactive resume →</span>
            </Link>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-primary-hover transition-colors">
              Get in touch <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}