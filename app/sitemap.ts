import { MetadataRoute } from 'next'
import { blogPosts, blogTagToSlug, TAG_INDEX_THRESHOLD } from '@/content/blog'
import { flagshipCaseStudies, supportingCaseStudies } from '@/content/caseStudies'
import { playbook as playbooks } from '@/content/playbook'

// lastModified is the date of the last significant content change, never the
// build time: stamping every URL with the build date teaches Google to ignore
// the field. When a page's content changes materially, update its date here
// (core pages) or its updatedAtISO (posts, case studies).
const CORE_PAGES: Record<string, string> = {
  '': '2026-10-16',
  '/about': '2026-10-16',
  '/journey': '2026-10-16',
  '/case-studies': '2026-10-16',
  '/writing': '2026-10-16',
  '/thinking': '2026-10-16',
  '/skills': '2026-10-16',
  '/resume': '2026-10-16',
  '/faq': '2026-10-16',
  '/contact': '2026-10-16',
}

// The playbook entries have not changed since they went live.
const PLAYBOOK_LASTMOD = '2026-07-14'

const latest = (dates: (string | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort().pop()

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aryanpanwar.in'

  const corePages = Object.entries(CORE_PAGES).map(([route, date]) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(date),
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic Case Studies
  const allCaseStudies = [...flagshipCaseStudies, ...supportingCaseStudies]
  const caseStudyPages = allCaseStudies.map((study) => {
    const date = study.updatedAtISO ?? study.publishedAtISO
    return {
      url: `${baseUrl}/case-studies/${study.slug}`,
      ...(date && { lastModified: new Date(date) }),
      priority: 0.9,
    }
  })

  // Dynamic Blog Posts
  const writingPages = blogPosts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.updatedAtISO ?? post.publishedAtISO),
    priority: 0.7,
  }))

  // Dynamic Blog Tags. Thin tags are omitted here and carry noindex on the route
  // itself, so the sitemap lists exactly the tag URLs we want indexed. A tag page
  // changes when any of its posts does.
  const tagCounts = new Map<string, number>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  const tagPages = Array.from(tagCounts.entries())
    .filter(([, count]) => count >= TAG_INDEX_THRESHOLD)
    .map(([tag]) => {
      const date = latest(blogPosts.filter((p) => p.tags.includes(tag)).map((p) => p.updatedAtISO ?? p.publishedAtISO))
      return {
        url: `${baseUrl}/writing/tag/${blogTagToSlug(tag)}`,
        ...(date && { lastModified: new Date(date) }),
        priority: 0.6,
      }
    })

  // Dynamic Thinking (Playbooks)
  const thinkingPages = playbooks.map((playbook) => ({
    url: `${baseUrl}/thinking/${playbook.slug}`,
    lastModified: new Date(playbook.publishedAtISO ?? PLAYBOOK_LASTMOD),
    priority: 0.8,
  }))

  return [
    ...corePages,
    ...caseStudyPages,
    ...writingPages,
    ...tagPages,
    ...thinkingPages,
  ]
}
