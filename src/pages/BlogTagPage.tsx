import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts, allBlogTags, blogTagToSlug } from '@/content/blog'
import { Seo } from '@/components/Seo'
import { BackButton } from '@/components/BackButton'

export default function BlogTagPage() {
  const { tag: tagSlug } = useParams()
  const tags = allBlogTags()
  const tag = tags.find((t) => blogTagToSlug(t) === tagSlug)
  if (!tag) return <Navigate to="/writing" replace />

  const matches = blogPosts.filter((p) => p.tags.includes(tag))
  const path = `/writing/tag/${tagSlug}`

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: '/writing' },
      { '@type': 'ListItem', position: 3, name: tag, item: path },
    ],
  }

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-6xl mx-auto">
      <Seo
        title={`${tag} — Writing by Aryan Panwar`}
        description={`Essays tagged “${tag}” — ${matches.length} PM ${matches.length === 1 ? 'essay' : 'essays'} by Aryan Panwar.`}
        path={path}
        image={matches[0]?.cover}
        keywords={[tag]}
        jsonLd={breadcrumb}
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
        <BackButton />
        <Link to="/writing" className="label-caps text-foreground-muted hover:text-primary transition-colors">All essays</Link>
      </div>

      <p className="label-caps text-primary">Writing · Topic</p>
      <h1 className="mt-3 font-display text-section text-foreground leading-[1.05]">
        {tag} <span className="font-serif-italic text-foreground-muted">essays.</span>
      </h1>
      <p className="mt-4 text-lg text-foreground-muted">
        {matches.length} {matches.length === 1 ? 'essay' : 'essays'} tagged “{tag}”.
      </p>
      <hr className="hairline-gold mt-8 max-w-24" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {matches.map((p) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/writing/${p.slug}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden bg-surface-2">
                <img
                  src={p.cover}
                  alt={p.coverAlt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover img-editorial group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-3 label-caps">
                <span className="text-primary">{p.category}</span>
                <span className="text-foreground-subtle">·</span>
                <span>{p.readingTime}</span>
                <span className="text-foreground-subtle">·</span>
                <time dateTime={p.publishedAtISO}>{p.publishedAt}</time>
              </div>
              <h2 className="mt-3 font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-snug">
                {p.title}
              </h2>
              <p className="mt-3 text-foreground-muted leading-relaxed">{p.summary}</p>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <p className="label-caps text-foreground-subtle mb-4">Browse other topics</p>
        <div className="flex flex-wrap gap-2">
          {tags.filter((t) => t !== tag).map((t) => (
            <Link
              key={t}
              to={`/writing/tag/${blogTagToSlug(t)}`}
              className="text-xs px-3 py-1 border border-border rounded-full text-foreground-muted hover:text-primary hover:border-primary transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
