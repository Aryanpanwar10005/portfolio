"use client"

import Link from "next/link";
import { ArrowRight, Mail, MessageCircleQuestion } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { resumeFaqCategories } from "@/content/resumeLibrary";
import { contactLinks } from "@/content/tools";
import { trackEvent } from "@/lib/analytics";

function CategorySection({
  category,
  index,
}: {
  category: (typeof resumeFaqCategories)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border last:border-b-0 pb-12 md:pb-16"
      aria-labelledby={`faq-category-${category.id}`}
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="label-caps text-primary mt-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2
          id={`faq-category-${category.id}`}
          className="font-display text-2xl md:text-3xl text-foreground"
        >
          {category.label}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {category.questions.map((item, i) => (
          <AccordionItem
            key={`${category.id}-${i}`}
            value={`${category.id}-${i}`}
            className="border-border"
          >
            <AccordionTrigger
              onClick={() =>
                trackEvent("faq_expand", {
                  category: category.label,
                  question: item.q,
                  page: "/faq",
                })
              }
              className="font-display text-lg md:text-xl text-left hover:no-underline text-foreground py-5"
            >
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-foreground-muted leading-relaxed text-base md:text-lg max-w-3xl">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}

export default function ResumeFaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resumeFaqCategories.flatMap((category) =>
      category.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aryanpanwar.in/" },
      { "@type": "ListItem", position: 2, name: "Resume Library", item: "https://aryanpanwar.in/resume" },
      { "@type": "ListItem", position: 3, name: "FAQ", item: "https://aryanpanwar.in/faq" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumb, faqSchema])
        }}
      />

      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-24">
          <div className="mb-10">
            <BackButton to="/resume" label="Back to resume library" />
          </div>

          <header className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-2 mb-5">
              <MessageCircleQuestion className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium tracking-wider uppercase text-foreground-muted">
                Resume FAQ
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-foreground max-w-3xl mb-5">
              Questions,{" "}
              <span className="font-serif-italic text-primary">answered.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted max-w-2xl leading-relaxed">
              A short, recruiter-focused guide to my resumes, projects, and the best way to reach me.
            </p>
            <div className="hairline-gold mt-8 max-w-24" />
          </header>

          <div className="space-y-12 md:space-y-16">
            {resumeFaqCategories.map((category, index) => (
              <CategorySection key={category.id} category={category} index={index} />
            ))}
          </div>

          <section className="mt-20 md:mt-24 rounded-2xl border border-border bg-surface-2 p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              Still have a question?
            </h2>
            <p className="text-foreground-muted max-w-lg mx-auto mb-8 leading-relaxed">
              If you didn't find the answer you're looking for, feel free to reach out. I'm always happy to discuss products, opportunities, or ideas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="rounded-full px-6 py-3 h-auto text-sm font-medium tracking-wider uppercase"
                onClick={() => trackEvent("faq_cta_click", { cta: "lets_connect", page: "/faq" })}
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Let's Connect
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 py-3 h-auto text-sm font-medium tracking-wider uppercase border-border"
                onClick={() => trackEvent("faq_email_click", { page: "/faq" })}
              >
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email me
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
