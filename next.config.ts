import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackLocalPostcssConfig: true,
  },
  async redirects() {
    return [
      // === 1. HIGH-VALUE SPECIFIC REDIRECTS (Evaluated FIRST) ===
      {
        source: '/blog/llm-orchestration-tools.html',
        destination: '/writing/llm-orchestration-tools',
        permanent: true,
      },
      {
        source: '/blog/building-llm-orchestration-tools.html',
        destination: '/writing/llm-orchestration-tools',
        permanent: true,
      },
      {
        source: '/blog/agentic-ai-vs-ml.html',
        destination: '/writing/agentic-ai-vs-ml',
        permanent: true,
      },
      {
        source: '/blog/agentic-ai-faq.html',
        destination: '/writing/agentic-ai-developer-guide',
        permanent: true,
      },
      {
        source: '/blog/technical-seo-for-ai-products.html',
        destination: '/writing/generative-ai-technical-seo',
        permanent: true,
      },
      {
        source: '/blog/what-is-agentic-ai-developer.html',
        destination: '/writing/agentic-ai-developer-guide',
        permanent: true,
      },
      {
        source: '/blog/seo-for-product-managers.html',
        destination: '/writing/generative-ai-technical-seo',
        permanent: true,
      },
      {
        source: '/blog/seo-product-management-faq.html',
        destination: '/writing/generative-ai-technical-seo',
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
      {
        source: '/writing/what-is-agentic-ai-developer.html',
        destination: '/writing/agentic-ai-developer-guide',
        permanent: true,
      },
      {
        source: '/blog/hardware-logic-in-ai.html',
        destination: '/writing/local-vs-cloud-ai-fitwardrobe',
        permanent: true,
      },
      {
        source: '/blog/embedded-iot-automation.html',
        destination: '/writing/engineering-to-product-thinking',
        permanent: true,
      },
      {
        source: '/blog/embedded-engineer-faq.html',
        destination: '/writing/engineering-to-product-thinking',
        permanent: true,
      },
      {
        source: '/blog/modern-embedded-engineer.html',
        destination: '/writing/engineering-to-product-thinking',
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
