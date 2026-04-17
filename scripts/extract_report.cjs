const fs = require('fs');

try {
    const report = JSON.parse(fs.readFileSync('report.json', 'utf8'));

    console.log('--- SCORE SUMMARY ---');
    console.log('Performance:', report.categories.performance.score * 100);
    console.log('Accessibility:', report.categories.accessibility.score * 100);
    console.log('Best Practices:', report.categories['best-practices'].score * 100);
    console.log('SEO:', report.categories.seo.score * 100);

    console.log('\n--- FAILED AND WARNING AUDITS (< 90) ---');
    // We only care about opportunities, diagnostics, and metrics that failed.
    for (let auditId in report.audits) {
        let audit = report.audits[auditId];
        // Score is between 0 and 1. 
        if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'manual' && audit.scoreDisplayMode !== 'notApplicable' && audit.scoreDisplayMode !== 'informative') {
            console.log(`[Score: ${Math.round(audit.score * 100)}] ${audit.title}`);
            console.log(`    Id: ${audit.id}`);
            console.log(`    ${audit.description}`);
            if(audit.details && audit.details.items && audit.details.items.length > 0) {
               console.log(`    Items: ${audit.details.items.length}`);
               for(let i=0; i<Math.min(3, audit.details.items.length); i++) {
                   let item = audit.details.items[i];
                   console.log(`      - ${JSON.stringify(item)}`);
               }
            }
        }
    }
} catch (err) {
    console.error('Error parsing report:', err);
}
