import { Metadata } from 'next'
import Link from 'next/link'
import { getPlaybookEntry, playbook } from '@/content/playbook'
import { BackButton } from '@/components/BackButton'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const entry = getPlaybookEntry(slug)

  if (!entry) {
    return {}
  }

  const path = `/thinking/${entry.slug}`

  return {
    title: entry.title,
    description: entry.summary,
    openGraph: {
      title: entry.title,
      description: entry.summary,
      url: `https://aryanpanwar.in${path}`,
    },
    alternates: {
      canonical: path,
    },
  }
}


export default async function PlaybookEntryPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const entry = getPlaybookEntry(slug)
  if (!entry) {
    notFound()
  }

  const path = `/thinking/${entry.slug}`
  return (
    <article className="pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: entry.title,
            description: entry.summary,
            datePublished: '2025-01-01',
            author: { '@type': 'Person', name: 'Aryan Panwar' },
            mainEntityOfPage: `https://aryanpanwar.in${path}`,
            articleSection: 'Product Thinking',
          })
        }}
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
        <BackButton to="/thinking" label="Back to thinking" />
        <Link href="/thinking" className="label-caps text-foreground-muted hover:text-primary transition-colors">My Product Thinking</Link>
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

export function generateStaticParams() {
  return playbook.map((p) => ({
    slug: p.slug,
  }))
}
