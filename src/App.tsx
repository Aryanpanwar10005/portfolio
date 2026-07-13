import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Analytics } from "@vercel/analytics/react";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CaseStudiesIndex = lazy(() => import("./pages/CaseStudiesIndex"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const PlaybookIndex = lazy(() => import("./pages/PlaybookIndex"));
const PlaybookEntryPage = lazy(() => import("./pages/PlaybookEntryPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const BlogTagPage = lazy(() => import("./pages/BlogTagPage"));
const JourneyPage = lazy(() => import("./pages/JourneyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ResumeLibraryPage = lazy(() => import("./pages/ResumeLibraryPage"));
const ResumeFaqPage = lazy(() => import("./pages/ResumeFaqPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<div className="min-h-screen" aria-hidden />}>{node}</Suspense>
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: withSuspense(<Index />) },
      { path: "/case-studies", element: withSuspense(<CaseStudiesIndex />) },
      { path: "/case-studies/:slug", element: withSuspense(<CaseStudyPage />) },
      { path: "/thinking", element: withSuspense(<PlaybookIndex />) },
      { path: "/thinking/:slug", element: withSuspense(<PlaybookEntryPage />) },
      { path: "/playbook", element: withSuspense(<PlaybookIndex />) },
      { path: "/playbook/:slug", element: withSuspense(<PlaybookEntryPage />) },
      { path: "/writing", element: withSuspense(<BlogIndex />) },
      { path: "/writing/tag/:tag", element: withSuspense(<BlogTagPage />) },
      { path: "/writing/:slug", element: withSuspense(<BlogPostPage />) },
      { path: "/blog", element: <Navigate to="/writing" replace /> },
      { path: "/blog/tag/:tag", element: <Navigate to="/writing/tag/:tag" replace /> },
      { path: "/blog/:slug", element: <Navigate to="/writing/:slug" replace /> },
      { path: "/reports", element: <Navigate to="/case-studies" replace /> },
      { path: "/reports/fitwardrobe-case-study.html", element: <Navigate to="/case-studies/fitwardrobe" replace /> },
      { path: "/reports/mithivoices-case-study.html", element: <Navigate to="/case-studies/mithivoices" replace /> },
      { path: "/reports/seo-geo-case-study.html", element: <Navigate to="/case-studies/seo-geo-optimizer" replace /> },
      { path: "/faq.html", element: <Navigate to="/faq" replace /> },
      { path: "/services.html", element: <Navigate to="/" replace /> },
      { path: "/privacy.html", element: <Navigate to="/" replace /> },
      { path: "/terms.html", element: <Navigate to="/" replace /> },
      { path: "/cookies.html", element: <Navigate to="/" replace /> },
      { path: "/journey", element: withSuspense(<JourneyPage />) },
      { path: "/about", element: withSuspense(<AboutPage />) },
      { path: "/resume", element: withSuspense(<ResumeLibraryPage />) },
      { path: "/faq", element: withSuspense(<ResumeFaqPage />) },
      { path: "/contact", element: withSuspense(<ContactPage />) },
      { path: "/skills", element: withSuspense(<SkillsPage />) },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
