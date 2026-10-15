import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Product case studies by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Case studies',
    title: 'Product case studies',
    subtitle: 'The problem, the decisions, the trade-offs and what I cut, for each product.',
  })
}
