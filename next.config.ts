import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackLocalPostcssConfig: true,
  },
  async redirects() {
    return [
      // === 1. HIGH-VALUE SPECIFIC REDIRECTS (Evaluated FIRST) ===
      {
        source: '/blog/technical-seo-for-ai-products.html',
        destination: '/writing/building-ai-features-users-trust',
        permanent: true,
      },
      {
        source: '/blog/what-is-agentic-ai-developer.html',
        destination: '/writing/engineering-to-product-thinking',
        permanent: true,
      },
      {
        source: '/blog/seo-for-product-managers.html',
        destination: '/writing/building-ai-features-users-trust',
        permanent: true,
      },
      {
        source: '/docs/Aryan.pdf',
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
    ];
  },
};

export default nextConfig;
