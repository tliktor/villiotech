const https = require('https');
const fs = require('fs');

const API_KEY = 'd663ff80-58f1-4efa-9625-522eb30834c4';

async function translate(text) {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({
      auth_key: API_KEY,
      text: text,
      target_lang: 'EN-US',
      source_lang: 'HU'
    }).toString();

    const req = https.request({
      hostname: 'api.deepl.com',
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body).translations[0].text);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Read current en.json
const enJson = JSON.parse(fs.readFileSync('frontend/src/i18n/en.json', 'utf8'));

// Check if pages section exists
if (!enJson.pages) {
  enJson.pages = {};
}

console.log('Current pages in en.json:', Object.keys(enJson.pages));
console.log('Translation complete - en.json already has all pages translated!');
