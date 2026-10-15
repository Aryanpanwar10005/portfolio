import { allBlogTags, blogTagToSlug, postsForTag } from '@/content/blog'
import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Essays by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params
  const tag = allBlogTags().find((t) => blogTagToSlug(t) === tagSlug)
  const count = tag ? postsForTag(tag).length : 0
  return renderOgCard({
    kicker: 'Writing',
    title: tag ? `Essays on ${tag}` : 'Writing',
    subtitle: count ? `${count} essays by Aryan Panwar` : undefined,
  })
}
