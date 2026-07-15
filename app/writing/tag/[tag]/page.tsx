import { blogPosts, allBlogTags, blogTagToSlug } from '@/content/blog'
import { notFound } from 'next/navigation'
import { BlogTagClient } from '@/components/BlogTagClient'

interface PageProps {
  params: Promise<{ tag: string }>
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
          __html: JSON.stringify(breadcrumb)
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
