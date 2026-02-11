const https = require('https');
const fs = require('fs');

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

async function translateObject(obj, path = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    console.log(`Translating: ${currentPath}`);
    
    if (typeof value === 'string') {
      try {
        result[key] = await translateText(value);
        console.log(`✓ ${currentPath}: "${value}" -> "${result[key]}"`);
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`✗ Error translating ${currentPath}:`, error.message);
        result[key] = value; // Keep original if translation fails
      }
    } else if (Array.isArray(value)) {
      result[key] = [];
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string') {
          try {
            result[key][i] = await translateText(value[i]);
            console.log(`✓ ${currentPath}[${i}]: "${value[i]}" -> "${result[key][i]}"`);
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.error(`✗ Error translating ${currentPath}[${i}]:`, error.message);
            result[key][i] = value[i];
          }
        } else if (typeof value[i] === 'object') {
          result[key][i] = await translateObject(value[i], `${currentPath}[${i}]`);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, currentPath);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

module.exports = { translateText, translateObject };