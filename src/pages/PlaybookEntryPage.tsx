import { useParams, Link, Navigate } from 'react-router-dom'
import { getPlaybookEntry } from '@/content/playbook'
import { Seo } from '@/components/Seo'
import { BackButton } from '@/components/BackButton'
import portrait from '@/assets/aryan-portrait.webp'

export default function PlaybookEntryPage() {
  const { slug } = useParams()
  const entry = slug ? getPlaybookEntry(slug) : undefined
  if (!entry) return <Navigate to="/thinking" replace />

  const path = `/thinking/${entry.slug}`
  return (
    <article className="pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
      <Seo
        title={entry.title}
        description={entry.summary}
        path={path}
        type="article"
        image={portrait}
        keywords={[entry.project, 'Product Thinking', 'PM Frameworks']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: entry.title,
          description: entry.summary,
          datePublished: '2025-01-01',
          author: { '@type': 'Person', name: 'Aryan Panwar' },
          mainEntityOfPage: path,
          articleSection: 'Product Thinking',
        }}
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
        <BackButton />
        <Link to="/thinking" className="label-caps text-foreground-muted hover:text-primary transition-colors">My Product Thinking</Link>
      </div>
      <p className="label-caps text-accent mt-8">{entry.number}</p>
      <h1 className="mt-2 font-display text-section text-foreground">
        {entry.title} <span className="text-foreground-muted">— Product Thinking</span>
      </h1>
      <p className="mt-2 label-caps text-foreground-subtle">Project · {entry.project}</p>
      <p className="mt-4 text-xl text-foreground-muted">{entry.summary}</p>
      <div className="hairline-gold my-10 max-w-24" />

      <section className="mb-10">
        <h2 className="label-caps mb-3">When to use</h2>
        <p className="text-lg text-foreground leading-relaxed">{entry.whenToUse}</p>
      </section>

      <section>
        <h2 className="label-caps mb-4">How I run it</h2>
        <ol className="space-y-4">
          {entry.steps.map((step, i) => (
            <li key={i} className="flex gap-6 text-lg text-foreground">
              <span className="font-display text-primary text-2xl leading-none">{String(i + 1).padStart(2, '0')}</span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}