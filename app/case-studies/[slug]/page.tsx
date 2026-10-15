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
            ...(study.slug === 'seo-geo-optimizer' ? [{
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is Generative Engine Optimization (GEO)?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Generative Engine Optimization (GEO) is the practice of structuring content so that it is easily parsed, cited, and recommended by AI answer engines like ChatGPT, Perplexity, and Google AI Overviews.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How does the seo-geo-optimizer npm package work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It is a 10-phase agentic workflow that runs inside AI IDEs (Cursor, Windsurf, Copilot). It auto-detects your environment and installs rules to guide the AI through technical SEO, schema generation, and content formatting.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Why is traditional SEO insufficient for AI search?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Traditional SEO focuses on keyword density to rank as a blue link. AI search engines (LLMs) prioritize clarity, direct answers, and structured data to synthesize responses and cite sources.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is seo-geo-optimizer an agentic AI or machine learning tool?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It is an agentic AI tool. It takes multi-step actions across 10 phases, modifies your workspace files, and validates its own output, unlike machine learning which only makes predictions.'
                  }
                }
              ]
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
