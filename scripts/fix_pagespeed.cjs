const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

walkDir('.', function(filePath) {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // 1. Minified CSS
        if (content.includes('href="/styles.css"')) {
            content = content.replace(/href="\/styles.css"/g, 'href="/styles.min.css"');
            modified = true;
        }
        if (content.includes('href="../styles.css"')) {
            content = content.replace(/href="\.\.\/styles.css"/g, 'href="../styles.min.css"');
            modified = true;
        }
        if (content.includes('href="styles.css"')) {
            content = content.replace(/href="styles\.css"/g, 'href="styles.min.css"');
            modified = true;
        }

        // 2. CSP meta tag frame-ancestors removal
        // The CSP meta tag usually looks like: content="default-src 'self'; ... frame-ancestors 'none';"
        // CSP level 2 spec says frame-ancestors is ignored in <meta>, so removing it avoids the browser console error.
        if (content.includes("frame-ancestors 'none';")) {
            content = content.replace(/frame-ancestors 'none';\s*/g, '');
            modified = true;
        }

        // 3. Accessibility labels for project links
        // We will look for <a> tags inside <div class="project-links"> that don't have aria-label
        // Typical structure: <a href="https://github.com/..." target="_blank" rel="noopener noreferrer"><i data-lucide="github">...
        // Let's use a regex to inject aria-label
        let projectLinksMatches = content.matchAll(/<div class="project-links">(.*?)<\/div>/gs);
        for (const match of projectLinksMatches) {
            let innerHTML = match[1];
            let newInnerHTML = innerHTML;

            // Find and process all anchor tags
            newInnerHTML = newInnerHTML.replace(/<a\s+([^>]*?)>/g, (match, aAttrs) => {
                if (!aAttrs.includes('aria-label')) {
                    modified = true;
                    if (aAttrs.includes('github.com')) {
                        return `<a ${aAttrs} aria-label="View Source Code on GitHub">`;
                    } else {
                        return `<a ${aAttrs} aria-label="View Live Project">`;
                    }
                }
                return match;
            });
            if (innerHTML !== newInnerHTML) {
                content = content.replace(match[0], `<div class="project-links">${newInnerHTML}</div>`);
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
