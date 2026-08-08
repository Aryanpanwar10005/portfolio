import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Deep-dive Product Management case studies: problem validation, AI systems design, user discovery, and metric execution across FitWardrobe, Mithivoices, and SEO-GEO Optimizer.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Case Studies | Aryan Panwar',
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
