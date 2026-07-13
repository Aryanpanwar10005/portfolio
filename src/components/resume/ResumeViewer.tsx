import { AnimatePresence, motion } from "framer-motion";
import { Download, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";
import { resumeVariants, type ResumeVariant } from "@/content/resumeLibrary";
import { trackEvent } from "@/lib/analytics";

type TabKey = keyof ResumeVariant["summary"];
const TABS: { key: TabKey; label: string }[] = [
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "achievements", label: "Achievements" },
  { key: "publications", label: "Publications" },
];

export function ResumeViewer({ activeId }: { activeId: ResumeVariant["id"] }) {
  const variant = useMemo(() => resumeVariants.find((v) => v.id === activeId)!, [activeId]);
  const [tab, setTab] = useState<TabKey>("experience");

  return (
    <section id="preview" className="section-padding pt-0 md:pt-0 lg:pt-0">
      <div className="max-w-7xl mx-auto">
        <p className="label-caps mb-4">03 · Interactive Preview</p>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <h2 className="font-display text-large text-foreground max-w-3xl">
            Read the resume, <span className="font-serif-italic text-primary">or skim the map.</span>
          </h2>
          <div className="flex gap-2">
            <a
              href={variant.pdfUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("resume_fullscreen", { role: variant.id })}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground-muted hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Fullscreen
            </a>
            <a
              href={variant.pdfUrl}
              download
              onClick={() => trackEvent("resume_download", { role: variant.id, surface: "viewer" })}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:bg-primary-hover transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download {variant.version}
            </a>
          </div>
        </div>
        <div className="hairline-gold mb-10 max-w-24" />

        {/* Tablist */}
        <div role="tablist" aria-label="Resume sections" className="flex flex-wrap gap-2 border-b border-border pb-3 mb-6">
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTab(t.key);
                  trackEvent("resume_tab", { tab: t.key, role: variant.id });
                }}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-[hsl(var(--primary))] text-primary-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          {/* PDF frame */}
          <AnimatePresence mode="wait">
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden border border-border bg-[hsl(var(--surface-2))] shadow-[0_40px_80px_-50px_hsl(var(--primary)/0.5)]"
            >
              <div className="aspect-[1/1.35] w-full bg-background">
                <iframe
                  title={`${variant.role} resume preview`}
                  src={`${variant.pdfUrl}#toolbar=0&view=FitH`}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tab summary */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${variant.id}-${tab}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-border bg-[hsl(var(--surface-2))] p-8"
            >
              <p className="label-caps mb-3">{TABS.find((t) => t.key === tab)?.label}</p>
              <h3 className="font-display text-2xl text-foreground mb-6">{variant.role}</h3>
              <ul className="space-y-4">
                {variant.summary[tab].map((line, i) => (
                  <li key={i} className="flex gap-3 text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}