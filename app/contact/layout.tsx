import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Connect',
  description: 'Get in touch with Aryan Panwar for Product Management opportunities, project discussions, or collaborations.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Connect | Aryan Panwar',
    description: 'Get in touch with Aryan Panwar for Product Management opportunities and collaborations.',
    url: 'https://aryanpanwar.in/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
