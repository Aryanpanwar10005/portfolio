import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');

// Standardized Navigation CSS Block
const NAV_CSS = `
        /* Navigation (Standardized with index.html) */
        body > nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            height: 64px;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(9, 9, 11, 0.85);
            border-bottom: 1px solid var(--color-border);
            transition: background 0.3s, border-color 0.3s;
        }
        [data-theme="light"] body > nav {
            background: rgba(250, 250, 250, 0.9);
        }
        .nav-inner {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
        }
        .nav-logo {
            font-family: var(--font-mono);
            font-size: 15px;
            font-weight: 500;
            letter-spacing: .05em;
            border: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            text-transform: none !important;
        }
        .nav-logo em {
            font-style: normal;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .nav-links {
            display: flex;
            gap: 22px;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .nav-links a {
            font-size: 13px;
            font-weight: 500;
            color: var(--color-text-dim);
            letter-spacing: .02em;
            position: relative;
            padding-bottom: 2px;
            transition: color 0.2s;
            text-decoration: none;
            font-family: var(--font-body);
        }
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1.5px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            transition: width 0.25s ease;
        }
        .nav-links a:hover,
        .nav-links a.active {
            color: var(--color-text-main);
        }
        .nav-links a:hover::after,
        .nav-links a.active::after {
            width: 100%;
        }
        .nav-right {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .theme-btn {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            border: 1px solid var(--color-border);
            background: rgba(255, 255, 255, 0.03);
            color: var(--color-text-dim);
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            cursor: pointer;
        }
        [data-theme="light"] .theme-btn {
            background: rgba(0, 0, 0, 0.03);
        }
        .theme-btn:hover {
            color: var(--color-text-main);
            border-color: var(--color-primary);
        }
        .nav-cta {
            font-size: 13px;
            font-weight: 600;
            padding: 7px 16px;
            border-radius: 8px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: #fff !important;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
            text-decoration: none;
            border: none !important;
        }
        .nav-cta:hover {
            opacity: .9;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
        }
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            padding: 6px;
            cursor: pointer;
        }
        .hamburger span {
            display: block;
            width: 20px;
            height: 1.5px;
            background: var(--color-text-main);
            border-radius: 2px;
            transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translate(4px, 5px);
        }
        .hamburger.open span:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translate(4px, -5px);
        }
        @media(max-width: 1024px) {
            .nav-links {
                display: none;
                flex-direction: column;
                gap: 0;
                position: fixed;
                top: 64px;
                left: 0;
                right: 0;
                background: var(--color-bg);
                border-bottom: 1px solid var(--color-border);
                z-index: 98;
                padding: 8px 0;
            }
            .nav-links.open {
                display: flex;
            }
            .nav-links a {
                padding: 13px 24px;
                font-size: 15px;
                border-bottom: 1px solid var(--color-border);
                width: 100%;
                display: block;
            }
            .nav-links a:last-child {
                border-bottom: none;
            }
            .hamburger {
                display: flex;
            }
        }
`;

// Standardized Inline Bottom Script
const BOTTOM_SCRIPT = `    <!-- Navigation and Theme Script -->
    <script>
    (function(){
      // Theme Management
      var h=document.documentElement,btn=document.getElementById('themeBtn'),ic=document.getElementById('themeIcon');
      if(btn && ic) {
        function apply(t){h.setAttribute('data-theme',t);ic.className=t==='dark'?'ti ti-sun':'ti ti-moon';try{localStorage.setItem('ap_theme',t)}catch(e){}}
        try{apply(localStorage.getItem('ap_theme')||'dark')}catch(e){apply('dark')}
        btn.addEventListener('click',function(){apply(h.getAttribute('data-theme')==='dark'?'light':'dark')});
      }
      
      // Mobile Menu
      var mBtn=document.getElementById('menuBtn'),links=document.getElementById('navLinks');
      if(mBtn && links) {
        mBtn.addEventListener('click',function(){links.classList.toggle('open');mBtn.classList.toggle('open')});
        links.querySelectorAll('a').forEach(function(a){
          a.addEventListener('click',function(){links.classList.remove('open');mBtn.classList.remove('open')})});
      }
    })();
    </script>`;

function standardizeHTMLFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const relativePath = path.relative(ROOT_DIR, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  console.log(`\nProcessing file: ${relativePath}`);

  // 1. Unify theme key to ap_theme (GDPR compliance and bright-flash prevention)
  content = content.replace(/localStorage\.getItem\(['"]theme['"]\)/g, "localStorage.getItem('ap_theme')");
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\s*,\s*/g, "localStorage.setItem('ap_theme', ");
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\)/g, "localStorage.setItem('ap_theme')");
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\s*,\s*theme\)/g, "localStorage.setItem('ap_theme', theme)");
  content = content.replace(/localStorage\.setItem\(['"]theme['"]\s*,\s*nextTheme\)/g, "localStorage.setItem('ap_theme', nextTheme)");

  // 2. Reduce the massive 200px bottom spacing holes globally to a tight, beautiful 100px total
  // Replace footer margin-top: 120px; with margin-top: 60px;
  content = content.replace(/margin-top:\s*120px/g, 'margin-top: 60px');
  
  // Replace main section bottom padding of 80px with 40px
  content = content.replace(/padding:\s*120px\s+0\s+80px/g, 'padding: 120px 0 40px');
  content = content.replace(/padding-bottom:\s*80px/g, 'padding-bottom: 40px');

  // 3. Inject standardized CSS navigation rules inside <style> blocks
  if (content.includes('/* Navigation (Standardized with index.html) */')) {
    content = content.replace(/\/\* Navigation \(Standardized with index.html\) \*\/\s*nav\s*\{/g, '/* Navigation (Standardized with index.html) */\n        body > nav {');
    content = content.replace(/\[data-theme="light"\]\s*nav\s*\{/g, '[data-theme="light"] body > nav {');
  } else {
    const styleTagRegex = /<style>([\s\S]*?)<\/style>/i;
    const match = content.match(styleTagRegex);
    if (match) {
      const originalStyleContent = match[1];
      const newStyleContent = `${NAV_CSS}\n${originalStyleContent}`;
      content = content.replace(match[0], `<style>${newStyleContent}</style>`);
      console.log(`  -> Standardized Navigation CSS styles injected.`);
    }
  }

  // 4. Clean up and standardize the inline theme switcher script under <head>
  const headScriptRegex = /<script>\s*\(function\(\)\s*\{[\s\S]*?theme[\s\S]*?localStorage[\s\S]*?\}\)\(\);\s*<\/script>/i;
  if (content.match(headScriptRegex)) {
    const standardizedHeadScript = `<script>
      (function() {
        try {
          var theme = localStorage.getItem('ap_theme') || 'dark';
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {}
      })();
    </script>`;
    content = content.replace(headScriptRegex, standardizedHeadScript);
    console.log(`  -> Head pre-render theme script standardized.`);
  }

  // 5. Purge old mobile overlays to prevent visual bloated elements
  content = content.replace(/<!-- Mobile Navigation Overlay -->[\s\S]*?<!-- Navigation -->/i, '<!-- Navigation -->');
  content = content.replace(/<div class="mobile-nav-overlay" id="mobile-menu">[\s\S]*?<\/div>/gi, '');

  // 6. Programmatically replace the legacy navigation HTML markup with the unified structure
  const isBlog = filePath.includes(path.sep + 'blog') || relativePath.startsWith('blog');
  const isFAQ = relativePath === 'faq.html';
  
  const blogActive = isBlog ? ' class="active"' : '';
  const faqActive = isFAQ ? ' class="active"' : '';

  const STANDARD_NAV = `<!-- Navigation -->
    <nav>
      <div class="nav-inner">
        <a href="/" class="nav-logo"><em>AP</em></a>
        <ul class="nav-links" id="navLinks">
          <li><a href="/#about">About</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#research">Research</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#experience">Experience</a></li>
          <li><a href="/#certifications">Certifications</a></li>
          <li><a href="/blog/"${blogActive}>Blog</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <div class="nav-right">
          <button class="theme-btn" id="themeBtn" aria-label="Toggle light/dark mode">
            <i class="ti ti-sun" id="themeIcon"></i>
          </button>
          <a href="/docs/Aryan.pdf?v=1.2" target="_blank" rel="noopener" class="nav-cta">
            Resume <i class="ti ti-arrow-up-right"></i>
          </a>
          <button class="hamburger" id="menuBtn" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>`;

  // Sweep various header/nav wrapper versions
  content = content.replace(/<header>\s*<nav id="navbar">[\s\S]*?<\/nav>\s*<\/header>/gi, STANDARD_NAV);
  content = content.replace(/<nav id="navbar">[\s\S]*?<\/nav>/gi, STANDARD_NAV);
  content = content.replace(/<nav>\s*<div class="nav-inner">[\s\S]*?<\/nav>/gi, STANDARD_NAV);
  console.log(`  -> Navigation HTML structure standardized.`);

  // 7. Strip old inline theme togglers script tags from footer
  content = content.replace(/<!-- Zero-Third-Party icons strategy via inlined SVGs -->\s*<script>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<script>[\s\S]*?const themeToggle = document\.getElementById\('themeToggle'\)[\s\S]*?<\/script>/gi, '');

  // 8. Replace script.js module loading with the consolidated inline responsive scripts
  const scriptModuleRegex = /<script type="module" src="\/script\.js" defer><\/script>/gi;
  const scriptModuleRegexAlt = /<script defer src="\/script\.js" type="module"><\/script>/gi;
  const scriptModuleRegexAlt2 = /<script defer="" src="\/script\.js" type="module"><\/script>/gi;

  if (content.match(scriptModuleRegex)) {
    content = content.replace(scriptModuleRegex, BOTTOM_SCRIPT);
    console.log(`  -> Standardized Bottom script modules bound.`);
  } else if (content.match(scriptModuleRegexAlt)) {
    content = content.replace(scriptModuleRegexAlt, BOTTOM_SCRIPT);
    console.log(`  -> Standardized Bottom script modules bound.`);
  } else if (content.match(scriptModuleRegexAlt2)) {
    content = content.replace(scriptModuleRegexAlt2, BOTTOM_SCRIPT);
    console.log(`  -> Standardized Bottom script modules bound.`);
  }

  // 9. If modified, write back to disk
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  -> [SUCCESS] File aligned & optimized perfectly.`);
  } else {
    console.log(`  -> [SYNC] File already fully in visual sync.`);
  }
}

function scanSubDirectories(dirName) {
  const dirPath = path.resolve(ROOT_DIR, dirName);
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanSubDirectories(path.relative(ROOT_DIR, fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      standardizeHTMLFile(fullPath);
    }
  });
}

function runSweep() {
  console.log('=== Starting E2E Visual Alignment and Layout Standardization Sweep ===');

  // Sweep root subpages
  const rootFiles = ['faq.html', 'services.html', 'privacy.html', 'terms.html', 'cookies.html'];
  rootFiles.forEach(file => {
    standardizeHTMLFile(path.resolve(ROOT_DIR, file));
  });

  // Sweep blog and reports recursively
  scanSubDirectories('blog');
  scanSubDirectories('reports');

  console.log('\n=== E2E Visual Standardization Sweep Completed Successfully ===');
}

runSweep();
