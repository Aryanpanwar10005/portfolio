import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journey & Milestones',
  description: 'Timeline, published research papers, academic background, and the engineering-to-PM evolution of Aryan Panwar.',
  alternates: {
    canonical: '/journey',
  },
  openGraph: {
    title: 'Journey & Milestones | Aryan Panwar',
    description: 'Timeline, published research, and the engineering-to-PM evolution of Aryan Panwar.',
    url: 'https://aryanpanwar.in/journey',
  },
}

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
