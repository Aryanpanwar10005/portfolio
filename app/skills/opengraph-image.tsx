import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Skills and certifications of Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Skills',
    title: 'Skills and certifications',
    subtitle: 'Product, analysis and AI tools, with verifiable certificates.',
  })
}
