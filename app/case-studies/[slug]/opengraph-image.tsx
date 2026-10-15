import { getCaseStudy } from '@/content/caseStudies'
import { renderOgCard, ogSize, ogContentType, ogSubtitle } from '@/lib/og'

export const alt = 'Product case study by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  return renderOgCard({
    kicker: 'Case study',
    title: study?.title ?? 'Product case study',
    subtitle: ogSubtitle(study?.tagline),
  })
}
