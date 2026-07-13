import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  Linkedin,
  Globe,
  FileText,
  BookOpen,
  PenLine,
  Mail,
  Github,
} from "lucide-react";
import { contactLinks } from "@/content/tools";
import { resumeVariants } from "@/content/resumeLibrary";
import { trackEvent } from "@/lib/analytics";

export function RecruiterResources() {
  const recommended = resumeVariants.find((v) => v.recommended)!;

  const cards = [
    { icon: Download, label: "Download resume", href: recommended.pdfUrl, download: true, event: "resource_download" },
    { icon: Linkedin, label: "LinkedIn", href: contactLinks.linkedin, external: true, event: "resource_linkedin" },
    { icon: Globe, label: "Portfolio", to: "/", event: "resource_portfolio" },
    { icon: FileText, label: "Case Studies", to: "/case-studies", event: "resource_case_studies" },
    { icon: BookOpen, label: "Product Playbook", to: "/skills", event: "resource_playbook" },
    { icon: PenLine, label: "Writing", to: "/writing", event: "resource_writing" },
    { icon: Github, label: "GitHub", href: contactLinks.github, external: true, event: "resource_github" },
    { icon: Mail, label: "Email", href: `mailto:${contactLinks.email}`, event: "resource_email" },
  ] as const;

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <p className="label-caps mb-4">05 · Recruiter Resources</p>
        <h2 className="font-display text-large text-foreground max-w-3xl">
          Everything, <span className="font-serif-italic text-primary">in one place.</span>
        </h2>
        <div className="hairline-gold mt-8 mb-12 max-w-24" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="flex flex-col items-start gap-3 h-full rounded-2xl border border-border bg-[hsl(var(--surface-2))] p-5 transition-all duration-300 hover:border-[hsl(var(--primary))] hover:-translate-y-1 hover:shadow-[0_20px_40px_-30px_hsl(var(--primary)/0.4)]">
                <span className="rounded-full bg-[hsl(var(--primary))]/8 p-2">
                  <Icon className="w-4 h-4 text-[hsl(var(--primary))]" />
                </span>
                <span className="font-display text-lg text-foreground">{c.label}</span>
                <span className="text-xs text-foreground-muted mt-auto">Open →</span>
              </div>
            );
            const onClick = () => trackEvent(c.event, {});
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {"to" in c ? (
                  <Link to={c.to!} onClick={onClick}>{inner}</Link>
                ) : (
                  <a
                    href={c.href}
                    onClick={onClick}
                    {...("external" in c && c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    {...("download" in c && c.download ? { download: true } : {})}
                  >
                    {inner}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}