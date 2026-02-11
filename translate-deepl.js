const https = require('https');

const API_KEY = 'd663ff80-58f1-4efa-9625-522eb30834c4';

async function translateText(text, targetLang = 'EN-US') {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({
      auth_key: API_KEY,
      text: text,
      target_lang: targetLang,
      source_lang: 'HU'
    }).toString();

    const options = {
      hostname: 'api.deepl.com',
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(body);
          resolve(result.translations[0].text);
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

// Test translation
translateText('Villamos biztonság, mérnöki precizitással')
  .then(result => console.log('Translation:', result))
  .catch(err => console.error('Error:', err.message));
