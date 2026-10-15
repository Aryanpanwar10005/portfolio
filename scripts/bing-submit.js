const fs = require('fs');
const https = require('https');

async function submitToBing() {
  console.log('🚀 Starting Bing URL Submission...');

  // 1. Load API Key from .env.local
  let apiKey = '';
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const keyLine = envFile.split('\n').find(line => line.startsWith('BING_API_KEY='));
    if (!keyLine) throw new Error('BING_API_KEY not found in .env.local');
    apiKey = keyLine.split('=')[1].trim();
  } catch (error) {
    console.error('❌ Error reading .env.local. Make sure the file exists and contains BING_API_KEY.', error.message);
    process.exit(1);
  }

  // 2. Fetch sitemap.xml to get all current URLs
  console.log('📡 Fetching sitemap from https://aryanpanwar.in/sitemap.xml...');
  const urlList = await new Promise((resolve, reject) => {
    https.get('https://aryanpanwar.in/sitemap.xml', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Extract all <loc> tags using Regex
        const regex = /<loc>(.*?)<\/loc>/g;
        const urls = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          urls.push(match[1]);
        }
        resolve(urls);
      });
    }).on('error', reject);
  });

  if (!urlList.length) {
    console.error('❌ No URLs found in sitemap.');
    process.exit(1);
  }

  console.log(`✅ Found ${urlList.length} URLs to submit.`);

  // 3. Prepare payload for Bing Webmaster API
  const payload = JSON.stringify({
    siteUrl: 'https://aryanpanwar.in',
    urlList: urlList
  });

  const options = {
    hostname: 'www.bing.com', // ssl.bing.com times out on some networks; www serves the same API
    path: `/webmaster/api.svc/json/SubmitUrlbatch?apikey=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  // 4. Send POST request to Bing
  console.log('📤 Submitting to Bing Webmaster API...');
  const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', chunk => responseData += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('🎉 Success! Bing has received your URLs for indexing.');
        console.log('Response:', responseData);
      } else {
        console.error(`❌ Bing API returned status code ${res.statusCode}`);
        console.error('Response:', responseData);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Error communicating with Bing API:', e);
  });

  req.write(payload);
  req.end();
}

submitToBing();
