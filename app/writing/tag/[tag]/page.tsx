import type { Metadata } from 'next'
import {
  blogPosts,
  allBlogTags,
  blogTagToSlug,
  postsForTag,
  TAG_INDEX_THRESHOLD,
} from '@/content/blog'
import { notFound } from 'next/navigation'
import { BlogTagClient } from '@/components/BlogTagClient'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const tagSlug = resolvedParams.tag
  const tags = allBlogTags()
  const tag = tags.find((t) => blogTagToSlug(t) === tagSlug)

  if (!tag) {
    return {}
  }

  const path = `/writing/tag/${tagSlug}`

  // Sub-threshold tags stay reachable and keep passing link signals, they just
  // do not compete in the index as near-duplicates of the single post they list.
  // Safe because every post is also linked from /writing and listed in the
  // sitemap, so nothing is discoverable only through a tag page.
  const isThin = postsForTag(tag).length < TAG_INDEX_THRESHOLD

  return {
    title: `Essays on ${tag}`,
    description: `Essays and product reflections on ${tag} by Aryan Panwar: what I tried, what I cut and what I learned.`,
    alternates: {
      canonical: path,
    },
    ...(isThin && { robots: { index: false, follow: true } }),
    openGraph: {
      title: `Essays on ${tag} | Aryan Panwar`,
      description: `Essays and product reflections on ${tag} by Aryan Panwar: what I tried, what I cut and what I learned.`,
      url: `https://aryanpanwar.in${path}`,
    },
  }
}

export default async function BlogTagPage({ params }: PageProps) {
  const resolvedParams = await params
  const tagSlug = resolvedParams.tag
  const tags = allBlogTags()
  const tag = tags.find((t) => blogTagToSlug(t) === tagSlug)
  
  if (!tag) {
    notFound()
  }

  const matches = blogPosts.filter((p) => p.tags.includes(tag))
  const path = `/writing/tag/${tagSlug}`

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aryanpanwar.in/' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://aryanpanwar.in/writing' },
      { '@type': 'ListItem', position: 3, name: tag, item: `https://aryanpanwar.in${path}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c')
        }}
      />
      <BlogTagClient tag={tag} matches={matches} tags={tags} />
    </>
  )
}

export function generateStaticParams() {
  const tags = allBlogTags()
  return tags.map((t) => ({
    tag: blogTagToSlug(t),
  }))
}
