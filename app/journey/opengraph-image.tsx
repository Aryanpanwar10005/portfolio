import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Journey and milestones of Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Journey',
    title: 'Journey and milestones',
    subtitle: 'From ECE to product: timeline, research and the projects in between.',
  })
}
