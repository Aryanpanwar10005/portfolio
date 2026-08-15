import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
  title: "About",
  description: "A short introduction to Aryan Panwar - ECE graduate from MIET Meerut (2026), AI Product Manager with a builder background, and the values that shape how I ship.",
  alternates: {
    canonical: "/about",
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
              jobTitle: 'AI Product Manager',
              description: 'AI Product Manager with a builder background - ships agentic AI systems (FitWardrobe, Mithivoices, SEO-GEO Optimizer) and writes about product tradeoffs, AI feature design, and PM frameworks.',
              url: 'https://aryanpanwar.in/about',
              image: 'https://aryanpanwar.in/assets/aryan-portrait.webp',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'MIET Meerut',
                sameAs: 'https://www.miet.ac.in/'
              },
              knowsAbout: [
                'Product Management',
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
                'https://x.com/aryanpanwar',
              ],
            }
          })
        }}
      />
      <PageHeader
        eyebrow="About"
        title={<>A short <span className="font-serif-italic text-primary">introduction.</span></>}
      />
      <section className="px-6 md:px-10 pb-24 max-w-2xl mx-auto space-y-14 text-lg text-foreground leading-relaxed">
        <Block label="Who I am">
          I&apos;m Aryan Panwar, an ECE graduate from MIET Meerut (2026) and an AI
          Product Manager. I came to product from the builder side: I ship agentic
          AI systems, write about the tradeoffs, and want to spend my early PM
          years in the room where the calls get made.
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
      </section>
    </>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-caps text-accent mb-3">{label}</h2>
      <div className="hairline mb-4" />
      <p>{children}</p>
    </div>
  )
}
