import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills & Certifications | Aryan Panwar',
  description: 'Skills, tools, and certifications spanning Product Management, AI, and Engineering.',
  alternates: {
    canonical: '/skills',
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
