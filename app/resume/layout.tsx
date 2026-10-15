import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Resume Library', template: '%s | Aryan Panwar' },
  description: 'Role-targeted resumes for PM, AI PM, Founder’s Office, and Business Analyst positions.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Resume Library | Aryan Panwar',
    description: 'Role-targeted resumes for PM, AI PM, Founder’s Office, and Business Analyst positions.',
    url: 'https://aryanpanwar.in/resume',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
