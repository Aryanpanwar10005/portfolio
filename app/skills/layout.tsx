import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Skills & Certifications', template: '%s | Aryan Panwar' },
  description: 'Skills, frameworks, tools, and certifications across product discovery, AI systems, analytics, and execution.',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'Skills & Certifications | Aryan Panwar',
    description: 'Skills, frameworks, tools, and certifications across product discovery, AI systems, analytics, and execution.',
    url: 'https://aryanpanwar.in/skills',
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
