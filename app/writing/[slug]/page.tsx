import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts, getBlogPost, blogTagToSlug, type BodyBlock } from '@/content/blog'
import { BackButton } from '@/components/BackButton'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const post = getBlogPost(slug)

  if (!post) {
    return {}
  }

  const path = `/writing/${post.slug}`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAtISO,
      url: `https://aryanpanwar.in${path}`,
      images: [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    alternates: {
      canonical: path,
    },
  }
}

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

function renderBlock(block: BodyBlock, i: number) {
  switch (block.type) {
    case 'quote':
      return (
        <blockquote
          key={i}
          className="border-l-2 border-primary pl-6 my-10 font-serif-italic text-xl md:text-2xl text-primary leading-relaxed"
        >
          "{parseTextWithCitations(block.text)}"
        </blockquote>
      )
    case 'list':
      return (
        <ul key={i} className="my-6 space-y-3 list-none">
          {block.items.map((it, j) => (
            <li key={j} className="pl-6 relative text-lg text-foreground leading-[1.8]">
              <span aria-hidden className="absolute left-0 top-[0.7em] w-3 h-px bg-accent" />
              {parseTextWithCitations(it)}
            </li>
          ))}
        </ul>
      )
    case 'p':
    default:
      return (
        <p key={i} className="text-lg text-foreground leading-[1.85]">
          {parseTextWithCitations(block.text)}
        </p>
      )
  }
}

function wordCount(post: ReturnType<typeof getBlogPost>) {
  if (!post) return 0
  return post.sections.reduce((n, s) => {
    return (
      n +
      s.body.reduce((m, b) => {
        if (b.type === 'list') return m + b.items.join(' ').split(/\s+/).length
        return m + b.text.split(/\s+/).length
      }, 0)
    )
  }, 0)
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const post = getBlogPost(slug)
  if (!post) {
    notFound()
  }

  const path = `/writing/${post.slug}`

  const others = blogPosts.filter((p) => p.slug !== post.slug)
  const byTagOverlap = others
    .map((p) => ({ p, overlap: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((x, y) => y.overlap - x.overlap)
  const related = byTagOverlap.slice(0, 2).map((x) => x.p)
  const relatedByTag = byTagOverlap.some((x) => x.overlap > 0)

  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.cover,
    datePublished: post.publishedAtISO,
    dateModified: post.publishedAtISO,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: wordCount(post),
    author: { '@type': 'Person', name: 'Aryan Panwar' },
    mainEntityOfPage: `https://aryanpanwar.in${path}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aryanpanwar.in/' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://aryanpanwar.in/writing' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://aryanpanwar.in${path}` },
    ],
  }

  return (
    <article className="pt-32 md:pt-40 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([postSchema, breadcrumbSchema])
        }}
      />

      <header className="px-6 md:px-10 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
          <BackButton to="/writing" label="Back to writing" />
          <Link href="/writing" className="label-caps text-foreground-muted hover:text-primary transition-colors">
            All essays
          </Link>
        </div>

        <p className="label-caps text-primary">
          Writing · <span className="text-foreground-muted">{post.category}</span>
        </p>
        <h1 className="mt-3 font-display text-section text-foreground leading-[1.05]">{post.title}</h1>
        <p className="mt-4 text-xl text-foreground-muted font-serif-italic leading-relaxed">{post.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 label-caps text-foreground-subtle">
          <span className="text-foreground-muted">By Aryan Panwar</span>
          <span>·</span>
          <time dateTime={post.publishedAtISO}>{post.publishedAt}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="mt-8 border-l-4 border-primary bg-primary/3 p-6 rounded-r-lg">
          <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-2">PM hiring question</p>
          <p className="font-display text-2xl text-foreground font-semibold leading-snug">{post.question}</p>
          <div className="mt-4 pt-4 border-t border-primary/10">
            <p className="text-xs font-semibold tracking-wider text-primary/80 uppercase mb-1">Recruiter takeaway</p>
            <p className="text-lg text-foreground font-serif-italic">"{post.takeaway}"</p>
          </div>
        </div>

        <hr className="hairline-gold mt-8 max-w-24" />
      </header>

      <figure className="mt-12 max-w-4xl mx-auto px-6 md:px-10">
        <div className="relative aspect-16/8 overflow-hidden bg-surface-2">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
        <figcaption className="mt-3 label-caps text-foreground-subtle text-right">{post.category}</figcaption>
      </figure>

      {post.takeaways.length > 0 && (
        <aside className="mt-12 px-6 md:px-10 max-w-2xl mx-auto">
          <div className="border-l-2 border-accent pl-6">
            <p className="label-caps text-accent mb-4">Three takeaways</p>
            <ol className="space-y-3 list-decimal list-inside marker:text-accent marker:font-display">
              {post.takeaways.map((t, i) => (
                <li key={i} className="text-foreground leading-relaxed">{t}</li>
              ))}
            </ol>
          </div>
        </aside>
      )}

      <div className="mt-16 px-6 md:px-10 max-w-2xl mx-auto space-y-4">
        {post.sections.map((s, i) => (
          <section key={i} className="pt-8">
            <h2 className="text-lg font-bold tracking-wider text-primary uppercase mb-4">
              0{i + 1} · {s.label}
            </h2>
            <div className="space-y-6">{s.body.map((b, j) => renderBlock(b, j))}</div>
          </section>
        ))}
      </div>

      <div className="mt-16 px-6 md:px-10 max-w-2xl mx-auto">
        <p className="label-caps text-foreground-subtle mb-3">Tags</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link
              key={t}
              href={`/writing/tag/${blogTagToSlug(t)}`}
              className="text-xs px-3 py-1 border border-border rounded-full text-foreground-muted hover:text-primary hover:border-primary transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <aside className="mt-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12">
            <p className="label-caps text-foreground-subtle mb-8">
              {relatedByTag ? 'Related essays' : 'Continue reading'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {related.slice(0, 2).map((p) => (
                <Link key={p.slug} href={`/writing/${p.slug}`} className="group block">
                  <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      className="object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="mt-4 label-caps text-primary">{p.category}</p>
                  <h3 className="mt-2 font-display text-2xl text-foreground group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-foreground-muted">{p.summary}</p>
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <Link href="/writing" className="label-caps text-primary border-b border-primary pb-1">
                ← All essays
              </Link>
            </div>
          </div>
        </aside>
      )}
    </article>
  )
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }))
}
