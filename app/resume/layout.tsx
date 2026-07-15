import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Library | Aryan Panwar',
  description: 'Download the standard one-page resume or explore detailed credentials tailored for PM roles.',
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
