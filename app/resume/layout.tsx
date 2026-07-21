import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Library',
  description: 'Role-targeted resumes for PM, AI PM, Founder’s Office, and Business Analyst positions.',
  alternates: {
    canonical: '/resume',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
