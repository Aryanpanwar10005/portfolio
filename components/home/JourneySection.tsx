"use client"

import { motion } from 'framer-motion'
import { journey } from '@/content/journey'

export function JourneySection() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="label-caps mb-3">07 · Journey</p>
          <h2 className="font-display text-section text-foreground">
            From builder <span className="font-serif-italic text-primary">to PM.</span>
          </h2>
          <p className="mt-3 max-w-xl text-lg text-foreground-muted">
            The milestones — hardware, research, shipped AI products, and where I'm heading next.
          </p>
        </div>

        <div className="relative pl-8 md:pl-12 border-l border-border">
          {journey.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute left-[-2.35rem] md:left-[-3.35rem] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="label-caps text-accent mb-1">{m.year}</p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground">{m.title}</h3>
              <p className="mt-2 text-foreground-muted max-w-2xl leading-relaxed">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}