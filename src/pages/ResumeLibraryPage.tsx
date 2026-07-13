import { Seo } from "@/components/Seo";
import { HeroLibrary } from "@/components/resume/HeroLibrary";
import { ResumeCards } from "@/components/resume/ResumeCards";
import { RecruiterResources } from "@/components/resume/RecruiterResources";
import { ResumeFooterCTA } from "@/components/resume/ResumeFooterCTA";

export default function ResumeLibraryPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Resume Library", item: "/resume" },
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aryan Panwar",
    jobTitle: "Aspiring Product Manager",
    url: "/",
    sameAs: [
      "https://www.linkedin.com/in/aryan-panwar1",
      "https://github.com/Aryanpanwar10005",
    ],
  };

  return (
    <>
      <Seo
        title="Resume Library — Aryan Panwar"
        description="Four role-tailored resumes for Product Management, Business Analyst, Technical PM, and GenAI Engineering roles. Pick the version written for the seat you're hiring for."
        path="/resume"
        keywords={[
          "aryan panwar resume",
          "product manager resume",
          "APM resume",
          "business analyst resume",
          "technical product manager resume",
          "genai engineer resume",
        ]}
        jsonLd={[person, breadcrumb]}
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
