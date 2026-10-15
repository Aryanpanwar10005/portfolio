import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Aryan Panwar portfolio'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Portfolio',
    title: 'Aryan Panwar',
    subtitle: 'Case studies, AI products and writing on how I make product decisions.',
  })
}
