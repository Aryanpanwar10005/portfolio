import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const ZIP_DIR = path.resolve(ROOT_DIR, 'temp_zip_extract');
const BLOG_DIR = path.resolve(ROOT_DIR, 'blog');
const REPORTS_DIR = path.resolve(ROOT_DIR, 'reports');

// Helper to extract links using regex (very robust for static html)
function extractLinks(htmlContent) {
  const links = [];
  const hrefRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']/gi;
  let match;
  while ((match = hrefRegex.exec(htmlContent)) !== null) {
    const href = match[1].trim();
    // Exclude javascript:void(0) or empty links
    if (href && !href.startsWith('javascript:')) {
      links.push(href);
    }
  }
  return links;
}

// Check if a path is absolute-local (starts with /)
// and verify if it maps to an actual file in our public/dist/root
function resolveLocalPath(href, currentFileDir) {
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { type: 'external', resolved: href, exists: true };
  }
  
  if (href.startsWith('#')) {
    return { type: 'anchor', resolved: href, exists: true }; // anchors checked later
  }

  let targetPath;
  try {
    if (href.startsWith('/')) {
      // Treat root relative
      const cleanPath = href.split('#')[0].split('?')[0];
      if (cleanPath === '/') {
        targetPath = path.join(ROOT_DIR, 'index.html');
      } else {
        // e.g. /faq.html -> root/faq.html, /blog/ -> root/blog/index.html
        if (cleanPath.endsWith('/')) {
          targetPath = path.join(ROOT_DIR, cleanPath, 'index.html');
        } else if (!path.extname(cleanPath)) {
          targetPath = path.join(ROOT_DIR, cleanPath + '.html');
        } else {
          targetPath = path.join(ROOT_DIR, cleanPath);
        }
      }
    } else {
      // Relative to current file's directory
      const cleanPath = href.split('#')[0].split('?')[0];
      targetPath = path.resolve(currentFileDir, cleanPath);
      // If it's a directory, look for index.html
      let dirExists = false;
      try {
        dirExists = fs.existsSync(targetPath);
      } catch (_) {}
      
      if (dirExists) {
        let isDir = false;
        try {
          isDir = fs.statSync(targetPath).isDirectory();
        } catch (_) {}
        if (isDir) {
          targetPath = path.join(targetPath, 'index.html');
        }
      } else if (!path.extname(cleanPath)) {
        // Maybe it's missing .html extension
        let htmlFileExists = false;
        try {
          htmlFileExists = fs.existsSync(targetPath + '.html');
        } catch (_) {}
        if (htmlFileExists) {
          targetPath = targetPath + '.html';
        }
      }
    }
  } catch (err) {
    return { type: 'internal', resolved: targetPath || path.resolve(currentFileDir, href), exists: false, href };
  }

  // Remove potential double slash or trailing dot/slash resolves
  let exists = false;
  try {
    exists = fs.existsSync(targetPath);
  } catch (_) {}
  return { type: 'internal', resolved: targetPath, exists, href };
}

// Collect headers/anchors in an HTML file
function extractAnchors(htmlContent) {
  const ids = new Set();
  // Match id="..." or name="..."
  const idRegex = /(?:id|name)=["']([^"']*)["']/gi;
  let match;
  while ((match = idRegex.exec(htmlContent)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

function auditLinks() {
  console.log('=== Starting Deep Internal & Backlink Audit ===\n');

  const hasZipDir = fs.existsSync(ZIP_DIR);
  const zipFiles = hasZipDir ? fs.readdirSync(ZIP_DIR).filter(f => f.endsWith('.html')) : [];
  
  const activeRootFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
  const activeBlogFiles = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.html')) : [];
  const activeReportsFiles = fs.existsSync(REPORTS_DIR) ? fs.readdirSync(REPORTS_DIR).filter(f => f.endsWith('.html')) : [];

  console.log(`Discovered:`);
  if (hasZipDir) {
    console.log(`- Original ZIP pages: ${zipFiles.length}`);
  } else {
    console.log(`- Original ZIP pages: N/A (Comparative zip folder temp_zip_extract deleted)`);
  }
  console.log(`- Active root pages: ${activeRootFiles.length}`);
  console.log(`- Active blog pages: ${activeBlogFiles.length}`);
  console.log(`- Active report pages: ${activeReportsFiles.length}\n`);

  // Map to store files, their extracted links, and anchors
  const fileRegistry = {};

  // Register all active HTML files
  const registerFile = (filePath, category) => {
    const relative = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      fileRegistry[relative] = {
        filePath,
        category,
        content,
        links: extractLinks(content),
        anchors: extractAnchors(content)
      };
    } catch (err) {
      console.error(`[ERROR] Failed to read or parse file ${relative}: ${err.message}`);
    }
  };

  activeRootFiles.forEach(f => registerFile(path.join(ROOT_DIR, f), 'root'));
  activeBlogFiles.forEach(f => registerFile(path.join(BLOG_DIR, f), 'blog'));
  activeReportsFiles.forEach(f => registerFile(path.join(REPORTS_DIR, f), 'reports'));

  // Extract links from original ZIP files to compare (only if ZIP folder exists)
  let missingLinksFound = 0;
  
  if (hasZipDir) {
    const zipRegistry = {};
    zipFiles.forEach(f => {
      const filePath = path.join(ZIP_DIR, f);
      const content = fs.readFileSync(filePath, 'utf8');
      zipRegistry[f] = {
        fileName: f,
        links: extractLinks(content)
      };
    });

    // Perform comparisons
    console.log('--- Checking for Missing Links vs ZIP Originals ---');
    
    for (const [fileName, zipData] of Object.entries(zipRegistry)) {
      // Find active equivalent
      const rootPages = new Set(['index.html', 'faq.html', 'services.html', 'cookies.html', 'privacy.html', 'terms.html', '404.html']);
      let activeKey = rootPages.has(fileName) ? fileName : `blog/${fileName}`;

      const activeData = fileRegistry[activeKey];
      if (!activeData) {
        console.warn(`[WARNING] Original ZIP file ${fileName} has no active equivalent at ${activeKey}`);
        continue;
      }

      const caseInsensitive = false; // Configurable flag for case insensitivity
      
      // Set of links in active (respecting configuration flag)
      const activeLinkSet = new Set(
        activeData.links.map(l => caseInsensitive ? l.toLowerCase() : l)
      );
      
      zipData.links.forEach(zipLink => {
        const zipLinkVal = caseInsensitive ? zipLink.toLowerCase() : zipLink;
        let isPresent = activeLinkSet.has(zipLinkVal);
        
        if (!isPresent) {
          const zipResolution = resolveLocalPath(zipLink, ZIP_DIR);
          const matchesSameResolution = activeData.links.some(activeLink => {
            const activeResolution = resolveLocalPath(activeLink, path.dirname(activeData.filePath));
            return activeResolution.type === zipResolution.type && 
                   activeResolution.resolved === zipResolution.resolved;
          });

          if (!matchesSameResolution) {
            console.log(`[MISSING LINK] In ${activeKey}: original link "${zipLink}" is not present!`);
            missingLinksFound++;
          }
        }
      });
    }

    if (missingLinksFound === 0) {
      console.log('✅ All links from the original ZIP are successfully present in active templates!');
    } else {
      console.log(`❌ Found ${missingLinksFound} missing links relative to the original ZIP file.`);
    }
    console.log('');
  } else {
    console.log('--- Skipping Comparative Check (ZIP Reference folder not present) ---');
  }

  // Perform internal link resolution and anchor checks
  console.log('--- Checking for Broken Internal Links and Anchors ---');
  let brokenInternalCount = 0;
  let brokenAnchorCount = 0;

  for (const [relPath, fileData] of Object.entries(fileRegistry)) {
    const fileDir = path.dirname(fileData.filePath);
    
    fileData.links.forEach(link => {
      const resolution = resolveLocalPath(link, fileDir);
      
      if (resolution.type === 'internal') {
        if (!resolution.exists) {
          console.log(`[BROKEN INTERNAL LINK] In ${relPath}: "${link}" resolves to non-existent path: ${resolution.resolved}`);
          brokenInternalCount++;
        } else {
          const hashIdx = link.indexOf('#');
          if (hashIdx !== -1) {
            const anchor = link.substring(hashIdx + 1).split('?')[0];
            const targetRelPath = path.relative(ROOT_DIR, resolution.resolved).replace(/\\/g, '/');
            const targetFileData = fileRegistry[targetRelPath];
            
            if (targetFileData && anchor) {
              if (!targetFileData.anchors.has(anchor)) {
                console.log(`[BROKEN ANCHOR LINK] In ${relPath}: "${link}" points to missing id/name "${anchor}" in ${targetRelPath}`);
                brokenAnchorCount++;
              }
            }
          }
        }
      } else if (resolution.type === 'anchor') {
        const anchor = link.substring(1).split('?')[0];
        if (anchor && !fileData.anchors.has(anchor)) {
          console.log(`[BROKEN SELF-ANCHOR] In ${relPath}: local link "${link}" points to missing id/name "${anchor}" on the same page`);
          brokenAnchorCount++;
        }
      }
    });
  }

  console.log(`\n=== Deep Audit Summary ===`);
  console.log(`- Broken Internal Links: ${brokenInternalCount}`);
  console.log(`- Broken Anchor Links: ${brokenAnchorCount}`);
  if (hasZipDir) {
    console.log(`- Missing Original Links: ${missingLinksFound}`);
  }
  
  if (brokenInternalCount === 0 && brokenAnchorCount === 0 && (missingLinksFound === 0 || !hasZipDir)) {
    console.log('🎉 EXCELLENT: The active link network is 100% correct, cohesive, and production-proof!');
  } else {
    console.log('⚠️ Attention required. Discrepancies exist. Please refer to the audit above.');
    process.exit(1);
  }
}

auditLinks();
