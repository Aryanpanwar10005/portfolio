import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    turbopackLocalPostcssConfig: true,
  },
  async redirects() {
    return [
      // === BLOG: old /blog/:slug.html URLs (from previous Vite site, indexed by Google) ===
      {
        source: '/blog/:slug.html',
        destination: '/writing/:slug',
        permanent: true,
      },
      // === BLOG: clean /blog/:slug → /writing/:slug (no .html) ===
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
      {
        source: '/blog/:slug',
        destination: '/writing/:slug',
        permanent: true,
      },
      // === OLD BLOG POSTS: indexed by Google but deleted — redirect to closest match ===
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
      // === OLD PDF: /docs/Aryan.pdf → current PM resume ===
      {
        source: '/docs/Aryan.pdf',
        destination: '/docs/Aryan_Panwar_PM_Resume.pdf',
        permanent: true,
      },
      // === CASE STUDIES (old .html paths) ===
      {
        source: '/reports',
        destination: '/case-studies',
        permanent: true,
      },
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
      // === STATIC .html PAGES ===
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
      // === PLAYBOOK → THINKING ===
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
    ];
  },
};

export default nextConfig;
