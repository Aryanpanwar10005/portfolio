import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Frequently asked questions'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'Background, how I work and what I am looking for.',
  })
}
