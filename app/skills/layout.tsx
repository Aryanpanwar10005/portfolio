import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills & Certifications',
  description: 'Skills, frameworks, tools, and certifications across product discovery, AI systems, analytics, and execution.',
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
