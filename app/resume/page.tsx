"use client"

import { HeroLibrary } from "@/components/resume/HeroLibrary";
import { ResumeCards } from "@/components/resume/ResumeCards";
import { RecruiterResources } from "@/components/resume/RecruiterResources";
import { ResumeFooterCTA } from "@/components/resume/ResumeFooterCTA";

export default function ResumeLibraryPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aryanpanwar.in/" },
      { "@type": "ListItem", position: 2, name: "Resume Library", item: "https://aryanpanwar.in/resume" },
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://aryanpanwar.in/#person",
    name: "Aryan Panwar",
    jobTitle: "AI Product Manager",
    url: "https://aryanpanwar.in/",
    sameAs: [
      "https://www.linkedin.com/in/aryan-panwar1",
      "https://github.com/Aryanpanwar10005",
      "https://x.com/aryan_panwar1",
      "https://www.producthunt.com/@aryan_panwar10005",
      "https://orcid.org/0009-0002-4793-4364",
      "https://www.researchgate.net/profile/Aryan-Panwar-7",
      "https://scholar.google.com/citations?view_op=list_works&hl=en&user=a4rB-NMAAAAJ",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([person, breadcrumb]).replace(/</g, '\u003c')
        }}
      />
      <HeroLibrary
        onExplore={() => document.getElementById("choose")?.scrollIntoView({ behavior: "smooth" })}
      />
      <ResumeCards />
      <RecruiterResources />
      <ResumeFooterCTA />
    </>
  );
}
