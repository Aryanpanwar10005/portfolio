import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Contact Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Contact',
    title: 'Get in touch',
    subtitle: 'Reach me by email or LinkedIn.',
  })
}
