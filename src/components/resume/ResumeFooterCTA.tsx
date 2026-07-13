import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { resumeVariants } from "@/content/resumeLibrary";

export function ResumeFooterCTA() {
  const recommended = resumeVariants.find((v) => v.recommended)!;
  return (
    <section className="px-6 md:px-10 pb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-[hsl(var(--primary))] text-primary-foreground px-8 md:px-16 py-16 md:py-24"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--accent)) 0%, transparent 50%)",
          }} />
          <p className="label-caps text-primary-foreground/70 mb-4">07 · Let's talk</p>
          <h2 className="font-display text-hero leading-[0.95] max-w-4xl">
            Let's build meaningful <span className="font-serif-italic text-[hsl(var(--accent))]">products</span> together.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Let's connect
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={recommended.pdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3.5 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}