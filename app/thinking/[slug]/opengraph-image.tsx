import { getPlaybookEntry } from '@/content/playbook'
import { renderOgCard, ogSize, ogContentType, ogSubtitle } from '@/lib/og'

export const alt = 'Product thinking by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = getPlaybookEntry(slug)
  return renderOgCard({
    kicker: 'Product thinking',
    title: entry?.title ?? 'Product thinking',
    subtitle: ogSubtitle(entry?.summary),
  })
}
