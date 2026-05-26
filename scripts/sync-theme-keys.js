import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');

// Optimized Webfont Load Block
const FONT_LINKS = `  <!-- High-Performance Webfont Load (GEO-Optimized) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  console.log(`Auditing and optimizing: ${path.relative(ROOT_DIR, filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Sync localStorage theme keys
  content = content.replace(/localStorage\.getItem\(['"]theme['"]\)/g, "localStorage.getItem('ap_theme')");
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\s*,\s*/g, "localStorage.setItem('ap_theme', ");
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\)/g, "localStorage.setItem('ap_theme')");
  
  // Also handle ap_theme inside standard item sets (like 'theme', theme)
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\s*,\s*theme\)/g, "localStorage.setItem('ap_theme', theme)");

  // 2. Inject high-performance preconnect and font links before styles.css link if not present
  if (!content.includes('fonts.googleapis.com') && !content.includes('fonts.gstatic.com')) {
    // Search for styles.css link (various formats)
    const styleLinkRegex = /<link[^>]*href=["'][^"']*styles\.css[^"']*["'][^>]*>/i;
    const match = content.match(styleLinkRegex);
    if (match) {
      const matchedTag = match[0];
      content = content.replace(matchedTag, `${FONT_LINKS}\n  ${matchedTag}`);
      console.log(`  -> Successfully injected high-performance Google Fonts & preconnect tags.`);
    }
  }

  // 3. Write back only if modified
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  -> File optimized successfully.`);
  } else {
    console.log(`  -> File already in sync.`);
  }
}

function scanDirectory(dirPath) {
  const fullPath = path.resolve(ROOT_DIR, dirPath);
  if (!fs.existsSync(fullPath)) return;

  const files = fs.readdirSync(fullPath);
  files.forEach(file => {
    if (file.endsWith('.html')) {
      processFile(path.join(fullPath, file));
    }
  });
}

function runSync() {
  console.log('--- Starting Design & Theme Optimization Pipeline ---');
  
  // Process root faq.html
  processFile(path.resolve(ROOT_DIR, 'faq.html'));
  
  // Process blog pages
  scanDirectory('blog');
  
  // Process reports pages
  scanDirectory('reports');
  
  console.log('--- Optimization Pipeline Completed Successfully ---');
}

runSync();
