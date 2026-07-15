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
    name: "Aryan Panwar",
    jobTitle: "Aspiring Product Manager",
    url: "https://aryanpanwar.in/",
    sameAs: [
      "https://www.linkedin.com/in/aryan-panwar1",
      "https://github.com/Aryanpanwar10005",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([person, breadcrumb])
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
