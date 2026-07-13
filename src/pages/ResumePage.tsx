import { PageHeader } from '@/components/PageHeader'
import { resumeData } from '@/content/resume'
import { Seo } from '@/components/Seo'

export default function ResumePage() {
  return (
    <>
      <Seo
        title="Resume — Aryan Panwar"
        description="Aryan Panwar's PM resume — target roles, experience shipping AI products, flagship projects, publications, and education."
        path="/resume"
      />
      <PageHeader
        eyebrow="Resume"
        title={<>The <span className="font-serif-italic text-primary">short version.</span></>}
        intro={resumeData.summary}
      />
      <div className="px-6 md:px-10 max-w-4xl mx-auto -mt-6 mb-8">
        <p className="label-caps text-accent mb-2">Target roles</p>
        <p className="text-foreground">{resumeData.target}</p>
      </div>
      <section className="px-6 md:px-10 pb-24 max-w-4xl mx-auto space-y-14">
        <div className="flex flex-wrap gap-4">
          <a href="#" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary-hover transition-colors">
            Download PDF ↓
          </a>
        </div>

        <Section label="Experience">
          <div className="space-y-10">
            {resumeData.experience.map((e) => (
              <div key={e.role}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl text-foreground">{e.role}</h3>
                  <span className="label-caps">{e.period}</span>
                </div>
                <p className="mt-1 text-foreground-muted">{e.company}</p>
                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-foreground">
                      <span className="text-accent">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Projects">
          <ul className="space-y-3">
            {resumeData.projects.map((p) => (
              <li key={p.name} className="flex justify-between border-b border-border py-3">
                <span className="font-display text-xl text-foreground">{p.name}</span>
                <span className="text-foreground-muted text-sm">{p.note}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Publications">
          {resumeData.publications.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-wrap justify-between gap-2 border-b border-border py-3 hover:border-primary/40 transition-colors"
            >
              <div>
                <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                  {p.title} <span className="inline-block text-xs align-top ml-1 text-foreground-muted group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </h3>
                <p className="text-foreground-muted text-sm">{p.venue}</p>
              </div>
              <span className="label-caps self-start mt-1">{p.year}</span>
            </a>
          ))}
        </Section>

        <Section label="Education">
          {resumeData.education.map((e) => (
            <div key={e.degree} className="flex flex-wrap justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl text-foreground">{e.degree}</h3>
                <p className="text-foreground-muted">{e.school}</p>
              </div>
              <span className="label-caps">{e.period}</span>
            </div>
          ))}
        </Section>
      </section>
    </>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="label-caps text-accent mb-3">{label}</p>
      <div className="hairline mb-8" />
      {children}
    </section>
  )
}