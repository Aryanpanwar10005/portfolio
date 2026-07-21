"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BackButton } from '@/components/BackButton'
import { type flagshipCaseStudies } from '@/content/caseStudies'

type StudyType = typeof flagshipCaseStudies[number]

const keySections = new Set(['problemStatement', 'research', 'reflection', 'lessons'])

function parseTextWithCitations(text: string): React.ReactNode {
  const pattern = /\(([a-zA-Z0-9][a-zA-Z0-9-]*(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const domain = match[1]
    parts.push('(')
    parts.push(
      <a key={key++} href={`https://${domain}`} target="_blank" rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:opacity-75 transition-opacity text-[0.9em]">
        {domain}
      </a>
    )
    parts.push(')')
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length > 1 ? <>{parts}</> : text
}

interface CaseStudyClientProps {
  study: StudyType
}

const sectionMap = [
  { key: 'overview', label: 'Overview' },
  { key: 'problemStatement', label: 'Problem Statement' },
  { key: 'marketNeed', label: 'Market Need' },
  { key: 'targetUsers', label: 'Target Users' },
  { key: 'research', label: 'Research' },
  { key: 'insights', label: 'Insights' },
  { key: 'opportunity', label: 'Opportunity' },
  { key: 'scope', label: 'Scope' },
  { key: 'outOfScope', label: 'Out of Scope' },
  { key: 'assumptions', label: 'Assumptions' },
  { key: 'successCriteria', label: 'Success Criteria' },
  { key: 'expectedBehaviour', label: 'Expected Behaviour' },
  { key: 'northStar', label: 'North Star Metric' },
  { key: 'supportingMetrics', label: 'Supporting Metrics' },
  { key: 'prioritization', label: 'Prioritization' },
  { key: 'wireframes', label: 'Wireframes' },
  { key: 'prd', label: 'PRD' },
  { key: 'prototype', label: 'Prototype' },
  { key: 'finalSolution', label: 'Final Solution' },
  { key: 'results', label: 'Results & Impact' },
  { key: 'reflection', label: 'Reflection' },
  { key: 'lessons', label: 'Lessons Learned' },
] as const

export function CaseStudyClient({ study }: CaseStudyClientProps) {
  const [activeSection, setActiveSection] = useState<string>('overview')

  useEffect(() => {
    const handleScroll = () => {
      const scrollMargin = 160 // Trigger active state slightly before element hits top of viewport
      let currentActive: string = sectionMap[0].key

      for (const section of sectionMap) {
        const el = document.getElementById(section.key)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= scrollMargin) {
            currentActive = section.key
          }
        }
      }
      setActiveSection(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once on mount to establish initial active state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [study])

  return (
    <>
      <header className="pt-32 md:pt-40 pb-12 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
          <BackButton to="/case-studies" label="Back to case studies" />
          <Link href="/case-studies" className="label-caps text-foreground-muted hover:text-primary transition-colors">
            All case studies
          </Link>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 font-display text-hero text-foreground"
        >
          {study.title} <span className="text-foreground-muted">— Case Study</span>
        </motion.h1>
        <p className="mt-4 text-xl text-foreground-muted max-w-3xl">{study.tagline}</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
          <Meta label="Role" value={study.role} />
          <Meta label="Platform" value={study.platform} />
          <Meta label="Timeline" value={study.timeline} />
          <Meta label="Status" value={study.status ?? '—'} />
        </div>
        {study.result && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
            <span className="label-caps text-accent">Result</span>
            <span className="text-sm font-medium text-foreground">{study.result}</span>
          </div>
        )}
        {(study.liveUrl || study.repoUrl || study.extraLinks?.length) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Visit live product ↗
              </a>
            )}
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                View source ↗
              </a>
            )}
            {study.extraLinks?.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="relative aspect-16/8 max-w-7xl mx-auto px-6 md:px-10">
        <Image src={study.cover} alt={study.title} fill className="object-cover" sizes="100vw" priority />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-4">In this study</p>
            <ul className="space-y-2 text-sm">
              {sectionMap.map((s) => (
                <li key={s.key}>
                  <a
                    href={`#${s.key}`}
                    className={`block py-0.5 transition-all duration-200 ${
                      activeSection === s.key
                        ? 'text-primary font-bold translate-x-1'
                        : 'text-foreground-muted hover:text-primary font-medium'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="lg:col-span-9 space-y-16">
          {study.tldr && (
            <section className="scroll-mt-28">
              <h2 className="text-base font-bold tracking-wider text-primary uppercase mb-3">TL;DR</h2>
              <div className="hairline mb-6" />
              <ul className="space-y-3 border-l-2 border-accent/30 pl-5">
                {study.tldr.map((item, i) => (
                  <li key={i} className="flex gap-4 text-lg text-foreground leading-relaxed">
                    <span className="text-accent font-serif-italic">·</span>
                    <span>{parseTextWithCitations(item)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {sectionMap.map((s) => {
            const value = study.sections[s.key as keyof typeof study.sections]
            if (!value) return null
            const isKey = keySections.has(s.key)
            return (
              <section key={s.key} id={s.key} className={`scroll-mt-28 ${isKey ? 'pl-5 border-l-2 border-accent/30' : ''}`}>
                <h2 className="text-base font-bold tracking-wider text-primary uppercase mb-3">{s.label}</h2>
                <div className="hairline mb-6" />
                {Array.isArray(value) ? (
                  <ul className="space-y-3 max-w-prose">
                    {value.map((v, i) => (
                      <li key={i} className="flex gap-4 text-lg text-foreground">
                        <span className="text-accent font-serif-italic">·</span>
                        <span>{parseTextWithCitations(v)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-foreground leading-relaxed max-w-prose">{parseTextWithCitations(value as string)}</p>
                )}
              </section>
            )
          })}
        </article>
      </div>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-caps mb-1">{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  )
}
