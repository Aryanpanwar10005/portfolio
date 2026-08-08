import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions on hiring, product philosophy, technical background, and project discovery answered by Aryan Panwar.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Aryan Panwar',
    description: 'Common questions on hiring, product philosophy, and technical background answered by Aryan Panwar.',
    url: 'https://aryanpanwar.in/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
