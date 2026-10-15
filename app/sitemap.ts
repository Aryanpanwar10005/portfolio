import { MetadataRoute } from 'next'
import { blogPosts, blogTagToSlug, TAG_INDEX_THRESHOLD } from '@/content/blog'
import { flagshipCaseStudies, supportingCaseStudies } from '@/content/caseStudies'
import { playbook as playbooks } from '@/content/playbook' 

// lastModified is only emitted where a real content date exists. Stamping every
// URL with the build time teaches Google to ignore the field altogether.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aryanpanwar.in'

  // Core static pages
  const corePages = [
    '',
    '/about',
    '/journey',
    '/case-studies',
    '/writing',
    '/thinking',
    '/skills',
    '/resume',
    '/faq',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic Case Studies
  const allCaseStudies = [...flagshipCaseStudies, ...supportingCaseStudies]
  const caseStudyPages = allCaseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    priority: 0.9,
  }))

  // Dynamic Blog Posts
  const writingPages = blogPosts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    ...(post.publishedAtISO && { lastModified: new Date(post.publishedAtISO) }),
    priority: 0.7,
  }))

  // Dynamic Blog Tags. Thin tags are omitted here and carry noindex on the route
  // itself, so the sitemap lists exactly the tag URLs we want indexed.
  const tagCounts = new Map<string, number>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  
  const tagPages = Array.from(tagCounts.entries())
    .filter(([, count]) => count >= TAG_INDEX_THRESHOLD)
    .map(([tag]) => ({
      url: `${baseUrl}/writing/tag/${blogTagToSlug(tag)}`,
        priority: 0.6,
    }))

  // Dynamic Thinking (Playbooks)
  const thinkingPages = playbooks.map((playbook) => ({
    url: `${baseUrl}/thinking/${playbook.slug}`,
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
