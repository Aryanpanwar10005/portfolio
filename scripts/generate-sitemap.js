import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_URL = 'https://aryanpanwar.in';

const pages = [
  { rel: 'index.html', url: '/', priority: '1.0', changefreq: 'weekly' },
  { rel: 'blog/index.html', url: '/blog/', priority: '0.9', changefreq: 'weekly' },
  { rel: 'reports/fitwardrobe-case-study.html', url: '/reports/fitwardrobe-case-study.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'reports/mithivoices-case-study.html', url: '/reports/mithivoices-case-study.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'reports/seo-geo-case-study.html', url: '/reports/seo-geo-case-study.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/technical-seo-for-ai-products.html', url: '/blog/technical-seo-for-ai-products.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/llm-orchestration-tools.html', url: '/blog/llm-orchestration-tools.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/what-is-agentic-ai-developer.html', url: '/blog/what-is-agentic-ai-developer.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/modern-embedded-engineer.html', url: '/blog/modern-embedded-engineer.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/agentic-ai-vs-ml.html', url: '/blog/agentic-ai-vs-ml.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/hardware-logic-in-ai.html', url: '/blog/hardware-logic-in-ai.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/embedded-iot-automation.html', url: '/blog/embedded-iot-automation.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/seo-for-product-managers.html', url: '/blog/seo-for-product-managers.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/seo-product-management-faq.html', url: '/blog/seo-product-management-faq.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/agentic-ai-faq.html', url: '/blog/agentic-ai-faq.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'blog/embedded-engineer-faq.html', url: '/blog/embedded-engineer-faq.html', priority: '0.8', changefreq: 'monthly' },
  { rel: 'resume.html', url: '/resume.html', priority: '0.9', changefreq: 'monthly' },
  { rel: 'privacy.html', url: '/privacy.html', priority: '0.3', changefreq: 'yearly' },
  { rel: 'terms.html', url: '/terms.html', priority: '0.3', changefreq: 'yearly' },
  { rel: 'cookies.html', url: '/cookies.html', priority: '0.3', changefreq: 'yearly' },
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach((page) => {
    const filePath = path.join(ROOT_DIR, page.rel);
    let lastmod = '2026-04-19'; // Fallback

    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        lastmod = formatDate(stats.mtime);
      }
    } catch (err) {
      console.error(`Error getting stats for ${filePath}:`, err);
    }

    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xml);
  console.log('sitemap.xml generated successfully!');
}

generateSitemap();
