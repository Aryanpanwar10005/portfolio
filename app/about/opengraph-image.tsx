import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'About Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'About',
    title: 'About Aryan Panwar',
    subtitle: 'Background, values and the way I work.',
  })
}
