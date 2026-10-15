import { ImageResponse } from 'next/og'

// Shared renderer for every opengraph-image.tsx route. One branded 1200x630
// PNG card per page: PNG (not WebP) because LinkedIn, the main referral
// channel, does not render WebP previews reliably.

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const IVORY = '#F8F4EE'
const WINE = '#5B1E2D'
const GOLD = '#C7A36A'
const INK = '#222222'
const MUTED = '#5C5650'

// Fetches a subset of a Google font as TTF (satori cannot read WOFF2). Falls
// back to the built-in font if the network is unavailable at build time.
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
    if (!src) return null
    const res = await fetch(src[1])
    return res.ok ? await res.arrayBuffer() : null
  } catch {
    return null
  }
}

type OgCard = {
  kicker: string
  title: string
  subtitle?: string
}

export async function renderOgCard({ kicker, title, subtitle }: OgCard) {
  const titleSize = title.length > 64 ? 56 : title.length > 36 ? 66 : 80
  const glyphs = `${kicker.toUpperCase()}${title}${subtitle ?? ''}Aryan Panwararyanpanwar.inAP`

  const [display, body] = await Promise.all([
    loadGoogleFont('Fraunces', 500, glyphs),
    loadGoogleFont('Inter', 500, glyphs),
  ])
  const fonts = [
    ...(display ? [{ name: 'Fraunces', data: display, weight: 500 as const, style: 'normal' as const }] : []),
    ...(body ? [{ name: 'Inter', data: body, weight: 500 as const, style: 'normal' as const }] : []),
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: IVORY,
          borderLeft: `28px solid ${WINE}`,
          padding: '64px 80px 56px 72px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, letterSpacing: 4, color: WINE }}>
          <div style={{ width: 56, height: 4, background: GOLD, marginRight: 20 }} />
          {kicker.toUpperCase()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: titleSize, lineHeight: 1.08, color: INK, letterSpacing: -1 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: 'flex', marginTop: 24, fontSize: 30, lineHeight: 1.35, color: MUTED, maxWidth: 980 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 28, color: INK }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                background: WINE,
                color: IVORY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Fraunces',
                fontSize: 26,
                marginRight: 18,
              }}
            >
              AP
            </div>
            Aryan Panwar
          </div>
          <div style={{ display: 'flex', color: MUTED }}>aryanpanwar.in</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  )
}

// Trims a subtitle to roughly two lines on the card, cutting at a word.
export function ogSubtitle(text: string | undefined, max = 120) {
  if (!text) return undefined
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(' ', max)).replace(/[\s,;:.-]+$/, '') + '…'
}
