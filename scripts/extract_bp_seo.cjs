const fs = require('fs');

try {
    const report = JSON.parse(fs.readFileSync('report.json', 'utf8'));

    console.log('--- BEST PRACTICES FAILED ---');
    if (report.categories && report.categories['best-practices'] && Array.isArray(report.categories['best-practices'].auditRefs)) {
        const bpAuditRefIds = new Set(report.categories['best-practices'].auditRefs.map(r => r.id));
        for (let auditId in report.audits) {
            let audit = report.audits[auditId];
            if (audit && audit.score != null && audit.score < 0.9 && bpAuditRefIds.has(auditId)) {
                console.log(`[${Math.round(audit.score*100)}] ${audit.title} (${auditId})`);
            }
        }
    }
    
    console.log('--- SEO FAILED ---');
    if (report.categories && report.categories.seo && Array.isArray(report.categories.seo.auditRefs)) {
        const seoAuditRefIds = new Set(report.categories.seo.auditRefs.map(r => r.id));
        for (let auditId in report.audits) {
            let audit = report.audits[auditId];
            if (audit && audit.score != null && audit.score < 0.9 && seoAuditRefIds.has(auditId)) {
                console.log(`[${Math.round(audit.score*100)}] ${audit.title} (${auditId})`);
                console.log(`    ${audit.description}`);
                if(audit.details && audit.details.items) {
                   console.log(JSON.stringify(audit.details.items));
                }
            }
        }
    }
} catch (err) {
    console.error(err);
}
