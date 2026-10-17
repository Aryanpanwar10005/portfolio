import { blogPosts } from '@/content/blog'

// RSS 2.0 feed of the writing section, newest first. Feed readers use it, and
// so does the GitHub profile README, which lists the latest posts from it.
// Posts dated in the future stay out until their publish date (daily rebuild).
export const dynamic = 'force-static'
export const revalidate = 86400

const SITE = 'https://aryanpanwar.in'
const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[ch]!)
// Posts go live at 08:00 IST, which is 02:30 UTC.
const rfc822 = (isoDate: string) => new Date(`${isoDate}T02:30:00Z`).toUTCString()

export function GET() {
  const today = new Date().toISOString().slice(0, 10)
  const posts = blogPosts
    .filter((p) => p.publishedAtISO <= today)
    .sort((a, b) => b.publishedAtISO.localeCompare(a.publishedAtISO))
  const lastChange = posts.map((p) => p.updatedAtISO ?? p.publishedAtISO).sort().pop()

  const items = posts
    .map((p) => {
      const url = `${SITE}/writing/${p.slug}`
      const tags = p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.publishedAtISO)}</pubDate>
      <description>${esc(p.summary)}</description>
${tags}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aryan Panwar: Writing</title>
    <link>${SITE}/writing</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Product decisions, AI trade-offs and PM frameworks from Aryan Panwar.</description>
    <language>en</language>${lastChange ? `\n    <lastBuildDate>${rfc822(lastChange)}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
