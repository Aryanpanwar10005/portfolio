import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { resumeVariants } from "@/content/resumeLibrary";
import { trackEvent } from "@/lib/analytics";

export function ResumeCards() {
  return (
    <section id="choose" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <p className="label-caps mb-4">02 · Choose Your Resume</p>
        <h2 className="font-display text-large text-foreground max-w-3xl">
          Every resume highlights different <span className="font-serif-italic text-primary">experiences.</span>
        </h2>
        <p className="mt-4 text-foreground-muted max-w-2xl">
          Four versions, each rewritten for the signals its target recruiter actually reads.
        </p>
        <div className="hairline-gold mt-8 max-w-24" />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {resumeVariants.map((v, i) => (
            <Card key={v.id} variant={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  variant: v,
  index,
}: {
  variant: (typeof resumeVariants)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[22px] border border-border bg-[hsl(var(--surface-2))] p-8 transition-all duration-500 hover:border-[hsl(var(--primary))]/50 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_hsl(var(--primary)/0.4)]"
    >
      {v.recommended && (
        <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-3 py-1 text-[11px] font-semibold tracking-wider uppercase shadow-sm">
          <Sparkles className="w-3 h-3" strokeWidth={2.5} />
          Recommended
        </div>
      )}

      <header>
        <p className="label-caps text-[hsl(var(--primary))]">{v.tagline}</p>
        <h3 className="mt-3 font-display text-3xl text-foreground">{v.role}</h3>
      </header>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted mb-2">Best for</p>
        <div className="flex flex-wrap gap-1.5">
          {v.bestFor.map((b) => (
            <span
              key={b}
              className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-xs text-foreground-muted"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 text-xs">
        <div>
          <dt className="text-foreground-muted uppercase tracking-wider">Updated</dt>
          <dd className="mt-1 font-display text-lg text-foreground">{v.lastUpdated}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={v.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("resume_view", { role: v.id, placeholder: v.isPlaceholder })}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </a>
      </div>

      {v.isPlaceholder && (
        <p className="mt-4 text-[11px] text-foreground-muted">
          Sample PDF while the tailored version is being uploaded — on-page summary reflects the current version.
        </p>
      )}
    </motion.article>
  );
}
