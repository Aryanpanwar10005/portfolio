import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Privacy on aryanpanwar.in'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgCard({
    kicker: 'Privacy',
    title: 'Privacy on this site',
    subtitle: 'What is measured, what is never collected, and how to opt out.',
  })
}
