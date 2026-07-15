"use client"

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ResumePreviewStack } from "./ResumePreviewStack";
import { resumeTrustBadges } from "@/content/resumeLibrary";
import { BackButton } from "@/components/BackButton";

export function HeroLibrary({ onExplore }: { onExplore: () => void }) {
  return (
    <header className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-caps mb-4"
          >
            Resume Library
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-section text-foreground"
          >
            Resume <span className="font-serif-italic text-primary">Library.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-6 text-lg text-foreground-muted max-w-xl leading-relaxed"
          >
            One resume rarely fits every hiring bar. Pick the version written for the seat
            you're hiring for — each is tailored to the signals that role actually screens for.
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-8 max-w-xl rounded-2xl border border-border bg-[hsl(var(--surface-2))] p-6 relative overflow-hidden"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-[hsl(var(--accent))] opacity-70" />
            <p className="font-serif-italic text-lg text-foreground leading-relaxed">
              "A resume isn't a document — it's a filter. The best filter is the one written for
              the reader on the other side."
            </p>
          </motion.blockquote>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {resumeTrustBadges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary))]/25 bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground-muted"
              >
                <Check className="w-3.5 h-3.5 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                {b}
              </li>
            ))}
          </motion.ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
            >
              Choose a resume ↓
            </button>
          </div>

          <div className="hairline-gold mt-10 max-w-24" />
        </div>

        <div className="hidden lg:block">
          <ResumePreviewStack />
        </div>
      </div>
    </header>
  );
}