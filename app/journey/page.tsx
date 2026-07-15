"use client"

import { PageHeader } from '@/components/PageHeader'
import { journey } from '@/content/journey'
import { publications, researchProfiles } from '@/content/tools'
import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { useSectionViewTracking, useEngagementTracking } from '@/hooks/useAnalytics'

export default function JourneyPage() {
  const timelineViewRef = useSectionViewTracking<HTMLDivElement>('journey_timeline_view', {
    section: 'timeline',
    milestone_count: journey.length,
  })
  const timelineEngageRef = useEngagementTracking<HTMLDivElement>('journey_timeline', {
    section: 'timeline',
    milestone_count: journey.length,
  })
  const researchViewRef = useSectionViewTracking<HTMLDivElement>('journey_research_view', {
    section: 'published_research',
  })
  const researchEngageRef = useEngagementTracking<HTMLDivElement>('journey_research', {
    section: 'published_research',
  })

  const setTimelineRefs = (node: HTMLDivElement | null) => {
    timelineViewRef.current = node
    timelineEngageRef.current = node
  }
  const setResearchRefs = (node: HTMLDivElement | null) => {
    researchViewRef.current = node
    researchEngageRef.current = node
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://aryanpanwar.in/#person',
            name: 'Aryan Panwar',
            jobTitle: 'Aspiring Product Manager',
            url: 'https://aryanpanwar.in/journey',
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'MIET Meerut' },
            hasOccupation: {
              '@type': 'Occupation',
              name: 'Product Manager',
              occupationLocation: { '@type': 'Country', name: 'India' },
            },
            sameAs: [
              'https://www.linkedin.com/in/aryan-panwar1',
              'https://github.com/aryanpanwar',
            ],
          })
        }}
      />
      <PageHeader
        eyebrow="Journey"
        title={<>The <span className="font-serif-italic text-primary">shape</span> of the path.</>}
        intro="Not a resume. A story of how a computer science student became obsessed with product."
      />
      <section className="px-6 md:px-10 pb-24 max-w-4xl mx-auto">
        <div ref={setTimelineRefs} className="relative pl-8 md:pl-14 border-l border-border">
          {journey.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pb-16 last:pb-0"
            >
              <span className="absolute left-[-2.4rem] md:left-[-3.9rem] top-2 w-3 h-3 rounded-full bg-primary" />
              <p className="label-caps text-accent mb-1">{m.year}</p>
              <h2 className="font-display text-large text-foreground">{m.title}</h2>
              <p className="mt-3 text-lg text-foreground-muted leading-relaxed max-w-2xl">{m.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Published research */}
        <div ref={setResearchRefs} className="mt-16 md:mt-24">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" /> Published research
            </h2>
            <div className="hairline-gold flex-1 ml-8 mb-3 max-w-xs" />
          </div>
          <div className="space-y-4">
            {publications.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-caps text-accent mb-2">{p.venue}</p>
                    <h3 className="font-display text-lg md:text-xl leading-snug group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground-muted">{p.meta}</p>
                    <p className="mt-3 text-sm text-foreground-muted italic">{p.note}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {researchProfiles.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground-muted hover:border-primary/40 hover:text-primary transition-colors"
              >
                {r.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
