import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        await page.goto("https://pagespeed.web.dev/analysis/https-aryanpanwar-in/wwjm7mdhsz?form_factor=mobile", { waitUntil: 'networkidle2', timeout: 60000 });
        await new Promise(r => setTimeout(r, 10000));
        
        const text = await page.evaluate(() => {
            // Get all sections 
            let fullText = "";
            document.querySelectorAll('div').forEach(el => {
                if(el.className.includes("category-wrapper")) {
                   fullText += "\n\n--- CATEGORY ---\n" + el.innerText;
                }
            });
            // Try fallback if classes are minified
            if (fullText.length < 100) {
                 return document.body.innerText;
            }
            return fullText;
        });
        
        fs.writeFileSync("psi_report.txt", text);
        console.log("Saved full report to psi_report.txt");

    } catch (e) {
        console.error("Error evaluating page:", e);
    } finally {
        await browser.close();
    }
})();
