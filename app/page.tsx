import { Hero } from "@/components/home/Hero";
import { FeaturedCase } from "@/components/home/FeaturedCase";
import { ProductThinking } from "@/components/home/ProductThinking";
import { PlaybookPreview } from "@/components/home/PlaybookPreview";
import { CaseStudiesList } from "@/components/home/CaseStudiesList";
import { BlogSection } from "@/components/home/BlogSection";
import { JourneySection } from "@/components/home/JourneySection";
import { Philosophy } from "@/components/home/Philosophy";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://aryanpanwar.in/#profilepage",
            "name": "Aryan Panwar — Product Evidence Book",
            "url": "https://aryanpanwar.in/",
            "mainEntity": {
              "@type": "Person",
              "@id": "https://aryanpanwar.in/#person",
              "name": "Aryan Panwar",
              "jobTitle": "Aspiring Product Manager",
              "description": "Aspiring Product Manager with a builder background — ships AI products (FitWardrobe, Mithivoices, SEO-GEO Optimizer) and writes about product tradeoffs, AI feature design, and PM frameworks.",
              "url": "https://aryanpanwar.in/",
              "image": "https://aryanpanwar.in/assets/aryan-portrait.webp",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "MIET Meerut",
                "sameAs": "https://www.miet.ac.in/"
              },
              "knowsAbout": [
                "Product Management",
                "AI Product Development",
                "Jobs-to-be-Done",
                "RICE Prioritization",
                "North Star Metrics",
                "On-Device AI",
                "LLM Engineering",
                "React",
                "Python"
              ],
              "sameAs": [
                "https://www.linkedin.com/in/aryan-panwar1",
                "https://github.com/aryanpanwar",
                "https://www.producthunt.com/@aryan_panwar10005"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "B.Tech Electronics & Communication Engineering",
                "credentialCategory": "degree",
                "recognizedBy": { "@type": "CollegeOrUniversity", "name": "MIET Meerut" }
              }
            }
          })
        }}
      />
      <Hero />
      <FeaturedCase />
      <ProductThinking />
      <PlaybookPreview />
      <CaseStudiesList />
      <BlogSection />
      <JourneySection />
      <Philosophy />
      <CTASection />
    </>
  );
}
