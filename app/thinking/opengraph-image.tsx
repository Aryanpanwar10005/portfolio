import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Product thinking frameworks by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Product thinking',
    title: 'Frameworks I actually use',
    subtitle: 'JTBD, RICE, opportunity trees and north-star metrics, applied to real products.',
  })
}
