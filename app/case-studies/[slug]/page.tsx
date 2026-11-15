import { Metadata } from 'next'
import { getCaseStudy, flagshipCaseStudies, supportingCaseStudies } from '@/content/caseStudies'
import { notFound } from 'next/navigation'
import { CaseStudyClient } from '@/components/CaseStudyClient'
import { metaDescription, pageTitle } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const study = getCaseStudy(slug)

  if (!study) {
    return {}
  }

  const path = `/case-studies/${study.slug}`
  const seoTitle = study.seoTitle ?? `${study.title}: AI Product Case Study`

  return {
    title: pageTitle(seoTitle),
    description: metaDescription(study.metaDescription ?? study.tagline),
    openGraph: {
      title: seoTitle,
      description: metaDescription(study.metaDescription ?? study.tagline),
      type: 'article',
      url: `https://aryanpanwar.in${path}`,
    },
    alternates: {
      canonical: path,
    },
  }
}


export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  const path = `/case-studies/${study.slug}`
  const ordered = [...flagshipCaseStudies, ...supportingCaseStudies]
  const nextEntry = ordered[(ordered.findIndex((c) => c.slug === study.slug) + 1) % ordered.length]
  const nextStudy = nextEntry && nextEntry.slug !== study.slug ? { slug: nextEntry.slug, title: nextEntry.title } : undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: study.title,
              description: study.tagline,
              image: study.cover?.startsWith('http') ? study.cover : `https://aryanpanwar.in${study.cover}`,
              ...(study.publishedAtISO && { datePublished: study.publishedAtISO }),
              ...((study.updatedAtISO ?? study.publishedAtISO) && { dateModified: study.updatedAtISO ?? study.publishedAtISO }),
              author: {
                '@type': 'Person',
                name: 'Aryan Panwar',
                url: 'https://aryanpanwar.in/about',
              },
              publisher: {
                '@type': 'Person',
                name: 'Aryan Panwar',
                url: 'https://aryanpanwar.in/',
              },
              mainEntityOfPage: `https://aryanpanwar.in${path}`,
              articleSection: 'Case Study',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aryanpanwar.in/' },
                { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://aryanpanwar.in/case-studies' },
                { '@type': 'ListItem', position: 3, name: study.title, item: `https://aryanpanwar.in${path}` },
              ],
            },
            ...(study.faqs?.length ? [{
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: study.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }] : [])
          ]).replace(/</g, '\\u003c')
        }}
      />
      <CaseStudyClient study={study} next={nextStudy} />
    </>
  )
}

export function generateStaticParams() {
  const all = [...flagshipCaseStudies, ...supportingCaseStudies]
  return all.map((c) => ({
    slug: c.slug,
  }))
}
