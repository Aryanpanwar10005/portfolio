"use client"

import { PageHeader } from '@/components/PageHeader'
import { contactLinks } from '@/content/tools'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, FileText, GraduationCap, Globe, Copy, Check, ArrowUpRight, Twitter, Rocket } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const channels = [
    {
      label: 'LinkedIn',
      handle: '/in/aryan-panwar1',
      href: contactLinks.linkedin,
      icon: Linkedin,
      note: 'For roles, referrals, and warm intros.',
    },
    {
      label: 'GitHub',
      handle: '@Aryanpanwar10005',
      href: contactLinks.github,
      icon: Github,
      note: 'Prototypes, experiments, and code trails.',
    },
    {
      label: 'Website',
      handle: 'aryanpanwar.in',
      href: contactLinks.website,
      icon: Globe,
      note: 'The archive of everything I have shipped.',
    },
    {
      label: 'Google Scholar',
      handle: 'Publications',
      href: contactLinks.scholar,
      icon: GraduationCap,
      note: 'Research and citations.',
    },
    {
      label: 'X / Twitter',
      handle: '@aryan_panwar1',
      href: contactLinks.twitter,
      icon: Twitter,
      note: 'Short notes on product, AI, and craft.',
    },
    {
      label: 'Product Hunt',
      handle: '@aryan_panwar10005',
      href: contactLinks.producthunt,
      icon: Rocket,
      note: 'Launches and products I have shipped.',
    },
  ]

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
            url: 'https://aryanpanwar.in/',
            email: 'mailto:aryanpanwar10005@gmail.com',
            sameAs: [
              'https://www.linkedin.com/in/aryan-panwar1',
              'https://github.com/Aryanpanwar10005',
              'https://www.producthunt.com/@aryan_panwar10005',
              'https://orcid.org/0009-0002-4793-4364',
              'https://www.researchgate.net/profile/Aryan-Panwar-7',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'professional',
              email: 'aryanpanwar10005@gmail.com',
              availableLanguage: 'English',
            },
          })
        }}
      />
      <PageHeader
        eyebrow="Contact"
        title={<>Let's build something <span className="font-serif-italic text-primary">meaningful.</span></>}
        intro="Product roles, thoughtful collaborations, or a conversation about how AI is reshaping product craft — the inbox is open, and I read every message."
      />

      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Primary email card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 shadow-2xl"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />
            <p className="label-caps text-accent/90 mb-6">Primary channel</p>
            <div className="flex items-start gap-4 mb-8">
              <div className="mt-2 shrink-0 w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="block font-display text-3xl md:text-4xl lg:text-5xl leading-tight break-all hover:text-accent transition-colors"
                >
                  {contactLinks.email}
                </a>
                <p className="mt-3 text-primary-foreground/70 text-sm md:text-base max-w-md">
                  I reply within 48 hours on weekdays. A short note about context helps me respond well.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contactLinks.email}?subject=Hello%20Aryan&body=Hi%20Aryan%2C%0A%0A`}
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                <Mail className="w-4 h-4" /> Compose email
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
          </motion.div>

          {/* Meta card */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl border border-border bg-card p-8 md:p-10"
          >
            <p className="label-caps text-foreground-muted mb-6">Details</p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Based in</p>
                  <p className="text-foreground-muted">{contactLinks.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </span>
                <div>
                  <p className="font-medium">Availability</p>
                  <p className="text-foreground-muted">Open to APM / PM roles and select product collaborations.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Resume</p>
                  <a href="/resume" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">
                    View one-page resume →
                  </a>
                </div>
              </li>
            </ul>
          </motion.aside>
        </div>

        {/* Channels grid */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl">Other channels</h2>
            <div className="hairline-gold flex-1 ml-8 mb-3 max-w-xs" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {channels.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium leading-tight">{c.label}</p>
                        <p className="text-sm text-foreground-muted">{c.handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-4 text-sm text-foreground-muted leading-relaxed">{c.note}</p>
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-border">
          <p className="font-serif-italic text-xl md:text-2xl text-foreground max-w-2xl leading-snug">
            "The best products begin as a considered conversation. If any of this resonates, I would love to hear from you."
          </p>
          <p className="mt-4 text-sm label-caps text-foreground-muted">— Aryan Panwar</p>
        </div>
      </section>
    </>
  )
}
