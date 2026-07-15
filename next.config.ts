import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    turbopackLocalPostcssConfig: true,
  },
  async redirects() {
    return [
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
