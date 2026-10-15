import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { NextSteps } from '@/components/NextSteps'

export const metadata: Metadata = {
  title: "About",
  description: "A short introduction to Aryan Panwar: ECE graduate from MIET Meerut (2026), Business Analyst Intern at Cloud Ingenious, and builder of AI products.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Aryan Panwar",
    description: "A short introduction to Aryan Panwar: background, values and the way I work.",
    url: "https://aryanpanwar.in/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': 'https://aryanpanwar.in/about/#webpage',
            url: 'https://aryanpanwar.in/about',
            mainEntity: {
              '@type': 'Person',
              '@id': 'https://aryanpanwar.in/#person',
              name: 'Aryan Panwar',
              jobTitle: 'Business Analyst Intern',
              worksFor: {
                '@type': 'Organization',
                name: 'Cloud Ingenious',
                url: 'https://www.cloudingenious.com/',
              },
              description: 'Business Analyst Intern on Salesforce projects at Cloud Ingenious. Builds agentic AI products on the side (FitWardrobe, Mithivoices, SEO-GEO Optimizer) and writes about product decisions, AI trade-offs and PM frameworks.',
              url: 'https://aryanpanwar.in/',
              image: 'https://aryanpanwar.in/assets/aryan-portrait.webp',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'MIET Meerut',
                sameAs: 'https://www.miet.ac.in/'
              },
              knowsAbout: [
                'Product Management',
                'Business Analysis',
                'Salesforce',
                'Agentic AI',
                'MCP',
                'Multimodal AI',
                'AI Product Development',
                'Jobs-to-be-Done (JTBD)',
                'On-Device AI',
                'RICE Prioritization',
                'LLM Evaluation & System Design'
              ],
              sameAs: [
                'https://www.linkedin.com/in/aryan-panwar1',
                'https://github.com/Aryanpanwar10005',
                'https://x.com/aryan_panwar1',
                'https://www.producthunt.com/@aryan_panwar10005',
                'https://orcid.org/0009-0002-4793-4364',
                'https://www.researchgate.net/profile/Aryan-Panwar-7',
                'https://scholar.google.com/citations?view_op=list_works&hl=en&user=a4rB-NMAAAAJ',
                'https://dev.to/aryanpanwar1',
                'https://www.npmjs.com/~aryanpanwar',
              ],
            }
          }).replace(/</g, '\\u003c')
        }}
      />
      <PageHeader
        eyebrow="About"
        title={<>A short <span className="font-serif-italic text-primary-ink">introduction.</span></>}
      />
      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto"><div className="max-w-2xl space-y-14 text-lg text-foreground leading-relaxed">
        <Block label="Who I am">
          I&apos;m Aryan Panwar, an ECE graduate from MIET Meerut (2026). I work as a
          Business Analyst Intern at Cloud Ingenious, a Salesforce consulting partner,
          on Salesforce implementation projects. On the side I build agentic AI
          products and write about the trade-offs. Product management is where I&apos;m
          headed: I want my early PM years in the room where the calls get made.
        </Block>
        <Block label="Why PM">
          Because the interesting problems live at the intersection of user,
          business, and technology - and PM is the seat where you actually get
          to make the tradeoffs. I&apos;d rather own an outcome than a feature.
        </Block>
        <Block label="Values">
          User first, always. Evidence over opinion. Restraint is a feature.
          Ship to learn - the roadmap is a hypothesis, not a promise.
        </Block>
        <Block label="Range">
          Before AI products, I built hardware: a robot arm, a dual-spot
          wireless EV-charging prototype (published in JETIR, ID JETIR2604872),
          and a fistful of embedded side-projects. I keep them around because
          the discipline of shipping physical things quietly makes me a better
          software PM.
        </Block>
        <Block label="Off the clock">
          Reading product essays, disassembling AI features I use every day,
          and running short experiments that end up as writing on this site.
        </Block>
        </div>
      </section>
      <NextSteps next={{ href: '/case-studies', label: 'See the work: product case studies', kicker: 'Next' }} />
    </>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-caps text-accent-ink mb-3">{label}</h2>
      <div className="hairline mb-4" />
      <p>{children}</p>
    </div>
  )
}
