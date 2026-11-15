import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'

const UPDATED = '16 November 2026'
const EMAIL = 'aryanpanwar12311@gmail.com'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What aryanpanwar.in measures (Google Analytics 4, Microsoft Clarity, Vercel Web Analytics), what it never collects, and how to opt out.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy | Aryan Panwar',
    description: 'What this site measures, what it never collects, and how to opt out.',
    url: 'https://aryanpanwar.in/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title={<>Privacy on <span className="font-serif-italic text-primary-ink">this site.</span></>}
        intro="This is a personal portfolio. It has no accounts, no forms and no ads. It does use analytics so I can see which pages are useful. Here is exactly what runs and how to turn it off."
      />
      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-14 text-lg text-foreground leading-relaxed">
          <p className="label-caps text-foreground-subtle">Last updated {UPDATED}</p>

          <Block label="Who runs this site">
            <p>
              aryanpanwar.in is run by Aryan Panwar, an individual in India. For any privacy question,
              email <a className="underline underline-offset-4 hover:text-primary-ink" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </Block>

          <Block label="What I never collect">
            <p>
              There are no sign-ups, contact forms, comments or payments, so I never receive your name,
              email or phone number through the site. If you email me or message me on LinkedIn, that
              conversation stays in that service and isn&apos;t linked to the analytics below.
            </p>
          </Block>

          <Block label="Analytics that run on this site">
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>Google Analytics 4</strong> (Google). Counts page views, how long pages stay open,
                where visits come from, approximate location (country and city) and device type, plus a few
                clicks I care about, such as resume downloads and contact links. It sets first-party cookies
                (<code>_ga</code>, <code>_ga_*</code>). Google signals is off, and data is kept for 14 months.
              </li>
              <li>
                <strong>Microsoft Clarity</strong> (Microsoft). Records anonymised sessions and heatmaps,
                meaning clicks, scrolling and mouse movement, so I can see where a page confuses people. It sets
                cookies such as <code>_clck</code> and <code>_clsk</code>. Clarity masks sensitive text by default,
                and the site has no input fields for you to type into.
              </li>
              <li>
                <strong>Vercel Web Analytics</strong> (Vercel, the host). Counts page views without cookies.
                Vercel also keeps standard server logs, including IP addresses, to run and protect the site.
              </li>
            </ul>
            <p className="mt-4">
              Google Analytics and Clarity load only on the live site, and only after your first scroll, tap
              or key press, or a few seconds after the page loads. I use the data in aggregate to decide what
              to write and fix. I don&apos;t sell it, and I don&apos;t use it for advertising.
            </p>
          </Block>

          <Block label="How to opt out">
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>On this site:</strong> open any page with <code>?notrack=1</code> at the end of the
                address, for example <code>aryanpanwar.in/?notrack=1</code>. That browser then stops sending
                data to all three tools until you open a page with <code>?notrack=0</code> or clear site data.
              </li>
              <li>
                <strong>Everywhere:</strong> block cookies in your browser, use a content blocker, or install
                Google&apos;s{' '}
                <a
                  className="underline underline-offset-4 hover:text-primary-ink"
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Analytics opt-out add-on
                </a>
                .
              </li>
            </ul>
          </Block>

          <Block label="Links to other sites">
            <p>
              Case studies and essays link to GitHub, npm, LinkedIn and other sites. Their own privacy
              policies apply once you leave this site.
            </p>
          </Block>

          <Block label="Your choices and questions">
            <p>
              The analytics tools don&apos;t tell me who you are, so I usually can&apos;t find your data to
              delete it. If you think I can, or you have any other question, email me and I&apos;ll reply
              within a week. If this page changes in a meaningful way, the date at the top changes too.
            </p>
          </Block>
        </div>
      </section>
    </>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-caps text-accent-ink mb-3">{label}</h2>
      <div className="hairline mb-4" />
      {children}
    </div>
  )
}
