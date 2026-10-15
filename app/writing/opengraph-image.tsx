import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Writing by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Writing',
    title: 'Essays on product, AI and career',
    subtitle: 'Product discovery, prioritisation, AI trade-offs and moving from engineering to product.',
  })
}
