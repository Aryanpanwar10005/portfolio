import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and reflections on product discovery, on-device AI trade-offs, engineering-to-PM transitions, and PM decision frameworks by Aryan Panwar.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    title: 'Writing | Aryan Panwar',
    description: 'Essays and reflections on product discovery, on-device AI trade-offs, and PM frameworks by Aryan Panwar.',
    url: 'https://aryanpanwar.in/writing',
  },
}

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
