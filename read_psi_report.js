import puppeteer from 'puppeteer';

(async () => {
    // Launch headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set a normal viewport
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log("Navigating to PageSpeed Insights...");
        // Wait until network is mostly idle to ensure the report loads
        await page.goto("https://pagespeed.web.dev/analysis/https-aryanpanwar-in/wwjm7mdhsz?form_factor=mobile", { waitUntil: 'networkidle2', timeout: 60000 });
        
        // Wait an additional 10 seconds to make sure the metrics tab renders
        await new Promise(r => setTimeout(r, 10000));
        
        console.log("Extracting text content...");
        const text = await page.evaluate(() => document.body.innerText);
        console.log("--- START OF REPORT TEXT ---");
        console.log(text.substring(0, 10000)); // We'll log the first 10k chars which should be enough
        console.log("--- END OF REPORT TEXT ---");

    } catch (e) {
        console.error("Error evaluating page:", e);
    } finally {
        await browser.close();
    }
})();
