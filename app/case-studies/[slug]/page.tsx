import { Metadata } from 'next'
import { getCaseStudy, flagshipCaseStudies, supportingCaseStudies } from '@/content/caseStudies'
import { notFound } from 'next/navigation'
import { CaseStudyClient } from '@/components/CaseStudyClient'

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

  return {
    title: `${study.title} | Aryan Panwar`,
    description: study.tagline,
    openGraph: {
      title: study.title,
      description: study.tagline,
      url: `https://aryanpanwar.in${path}`,
      images: [
        {
          url: study.cover,
          width: 800,
          height: 800,
          alt: study.title,
        },
      ],
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
              image: study.cover,
              datePublished: `${(study.timeline.match(/\d{4}/) || ['2025'])[0]}-01-01`,
              author: { '@type': 'Person', name: 'Aryan Panwar' },
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
          ])
        }}
      />
      <CaseStudyClient study={study} />
    </>
  )
}

export function generateStaticParams() {
  const all = [...flagshipCaseStudies, ...supportingCaseStudies]
  return all.map((c) => ({
    slug: c.slug,
  }))
}
