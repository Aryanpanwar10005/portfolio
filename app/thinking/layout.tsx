import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Thinking & Frameworks',
  description: 'Mental models, evaluation playbooks, and decision frameworks for product managers navigating AI and software systems by Aryan Panwar.',
  alternates: {
    canonical: '/thinking',
  },
  openGraph: {
    title: 'Product Thinking & Frameworks | Aryan Panwar',
    description: 'Mental models, evaluation playbooks, and decision frameworks by Aryan Panwar.',
    url: 'https://aryanpanwar.in/thinking',
  },
}

export default function ThinkingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
