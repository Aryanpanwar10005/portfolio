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
  'embedded-iot-automation': 'engineering-to-product-thinking',
  'embedded-engineer-faq': 'engineering-to-product-thinking',
  'modern-embedded-engineer': 'engineering-to-product-thinking',
};

const nextConfig: NextConfig = {
  experimental: {
    turbopackLocalPostcssConfig: true,
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
        destination: '/',
        permanent: true,
      },
      {
        source: '/terms.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cookies.html',
        destination: '/',
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
