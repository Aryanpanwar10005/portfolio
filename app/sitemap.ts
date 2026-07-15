import { MetadataRoute } from 'next'
import { blogPosts, blogTagToSlug } from '@/content/blog'
import { flagshipCaseStudies, supportingCaseStudies } from '@/content/caseStudies'
import { playbook as playbooks } from '@/content/playbook' 

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
    lastModified: new Date(),
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic Case Studies
  const allCaseStudies = [...flagshipCaseStudies, ...supportingCaseStudies]
  const caseStudyPages = allCaseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }))

  // Dynamic Blog Posts
  const writingPages = blogPosts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.publishedAtISO || new Date()),
    priority: 0.7,
  }))

  // Dynamic Blog Tags
  const allTags = new Set<string>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag))
  })
  
  const tagPages = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/writing/tag/${blogTagToSlug(tag)}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  // Dynamic Thinking (Playbooks)
  const thinkingPages = playbooks.map((playbook) => ({
    url: `${baseUrl}/thinking/${playbook.slug}`,
    lastModified: new Date(),
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
