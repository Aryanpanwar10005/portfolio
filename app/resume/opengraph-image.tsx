import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Resume library of Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Resume',
    title: 'Resume library',
    subtitle: 'Role-specific resumes, ready to download.',
  })
}
