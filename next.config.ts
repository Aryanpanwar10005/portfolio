import type { NextConfig } from "next";

// Old article URLs from the static site. The same file lived under both
// /blog/ and /writing/, so each one is redirected from both prefixes.
const legacyPosts: Record<string, string> = {
  'llm-orchestration-tools': 'llm-orchestration-tools',
  'building-llm-orchestration-tools': 'llm-orchestration-tools',
  'agentic-ai-vs-ml': 'agentic-ai-vs-ml',
  'agentic-ai-faq': 'agentic-ai-developer-guide',
  'what-is-agentic-ai-developer': 'agentic-ai-developer-guide',
  'technical-seo-for-ai-products': 'generative-ai-technical-seo',
  'seo-for-product-managers': 'generative-ai-technical-seo',
  'seo-product-management-faq': 'generative-ai-technical-seo',
  'hardware-logic-in-ai': 'local-vs-cloud-ai-fitwardrobe',
  'embedded-engineer-faq': 'engineering-to-product-thinking',
  'modern-embedded-engineer': 'engineering-to-product-thinking',
};

// Content Security Policy. Inline scripts stay allowed because Next.js and the
// analytics loader (components/AnalyticsScripts.tsx) inject them; everything
// external is limited to GA4, Clarity and Vercel. When adding a third-party
// script, image or API, add its origin here or the browser will block it.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.clarity.ms https://va.vercel-scripts.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://vitals.vercel-insights.com",
  "img-src 'self' data: blob: https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  // Vercel sends "Access-Control-Allow-Origin: *" by default; nothing here is
  // meant to be read cross-origin by scripts.
  { key: 'Access-Control-Allow-Origin', value: 'https://aryanpanwar.in' },
]

const nextConfig: NextConfig = {
  experimental: {
    turbopackLocalPostcssConfig: true,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      // === 1. HIGH-VALUE SPECIFIC REDIRECTS (Evaluated FIRST) ===
      ...Object.entries(legacyPosts).flatMap(([oldSlug, slug]) =>
        ['blog', 'writing'].map((prefix) => ({
          source: `/${prefix}/${oldSlug}.html`,
          destination: `/writing/${slug}`,
          permanent: true,
        })),
      ),
      // The hardware/IoT post is closest to the career journey page, not an essay.
      ...['blog', 'writing'].map((prefix) => ({
        source: `/${prefix}/embedded-iot-automation.html`,
        destination: '/journey',
        permanent: true,
      })),
      // This tag was removed; Mithivoices content lives in its case study.
      {
        source: '/writing/tag/mithivoices',
        destination: '/case-studies/mithivoices',
        permanent: true,
      },
      {
        source: '/docs/Aryan.pdf',
        destination: '/docs/Aryan_Panwar_PM_Resume.pdf',
        permanent: true,
      },
      {
        source: '/docs/Aryan_panwar.pdf',
        destination: '/docs/Aryan_Panwar_PM_Resume.pdf',
        permanent: true,
      },
      {
        source: '/resume.html',
        destination: '/resume',
        permanent: true,
      },
      // Legacy URLs that Google and Bing still list but that returned 404
      // (checked against Search Console and Bing Webmaster data, Oct 2026).
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Aryan_Panwar.pdf',
        destination: '/docs/Aryan_Panwar_PM_Resume.pdf',
        permanent: true,
      },
      {
        source: '/assets/docs/Aryan_Panwar.pdf',
        destination: '/docs/Aryan_Panwar_PM_Resume.pdf',
        permanent: true,
      },

      // === 2. CASE STUDIES (old .html & reports paths) ===
      {
        source: '/reports/fitwardrobe-case-study.html',
        destination: '/case-studies/fitwardrobe',
        permanent: true,
      },
      {
        source: '/reports/mithivoices-case-study.html',
        destination: '/case-studies/mithivoices',
        permanent: true,
      },
      {
        source: '/reports/seo-geo-case-study.html',
        destination: '/case-studies/seo-geo-optimizer',
        permanent: true,
      },
      {
        source: '/reports',
        destination: '/case-studies',
        permanent: true,
      },

      // === 3. STATIC .html LEGACY PAGES ===
      {
        source: '/faq.html',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/services.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/privacy.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/cookies.html',
        destination: '/privacy',
        permanent: true,
      },

      // === 4. PLAYBOOK → THINKING ===
      {
        source: '/playbook',
        destination: '/thinking',
        permanent: true,
      },
      {
        source: '/playbook/:slug',
        destination: '/thinking/:slug',
        permanent: true,
      },

      // === 5. BLOG SECTION ROOT & TAGS ===
      {
        source: '/blog',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/blog/tag/:tag',
        destination: '/writing/tag/:tag',
        permanent: true,
      },

      // === 6. CATCH-ALLS (evaluated LAST) ===
      // A current article requested with the old .html suffix.
      {
        source: '/writing/:slug.html',
        destination: '/writing/:slug',
        permanent: true,
      },
      // Any other old blog post or report lands on its section index instead
      // of a 404, so stray backlinks and stale index entries keep their value.
      {
        source: '/blog/:path*',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/reports/:path*',
        destination: '/case-studies',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
