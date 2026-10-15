import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'AI Product Case Studies', template: '%s | Aryan Panwar' },
  description: 'Product case studies by Aryan Panwar: problem validation, AI system design, user discovery and metrics across FitWardrobe, Mithivoices and SEO-GEO Optimizer.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'AI Product Case Studies | Aryan Panwar',
    description: 'Deep-dive Product Management case studies across FitWardrobe, Mithivoices, and SEO-GEO Optimizer by Aryan Panwar.',
    url: 'https://aryanpanwar.in/case-studies',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
