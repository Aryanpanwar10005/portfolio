import { getBlogPost } from '@/content/blog'
import { renderOgCard, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Essay by Aryan Panwar'
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  return renderOgCard({
    kicker: post?.category ?? 'Writing',
    title: post?.title ?? 'Writing',
  })
}
