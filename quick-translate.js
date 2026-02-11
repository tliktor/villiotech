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
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const texts = {
  adatvedelem: {
    title: "Adatvédelmi tájékoztató",
    intro: "Az adatkezelő neve és elérhetősége",
    sections: [
      "Kezelt adatok köre",
      "Az adatkezelés célja",
      "Az adatkezelés jogalapja",
      "Az adatok tárolásának időtartama",
      "Az érintettek jogai"
    ]
  },
  aszf: {
    title: "Általános Szerződési Feltételek",
    sections: [
      "A szolgáltató adatai",
      "Szolgáltatások",
      "Árak és fizetési feltételek",
      "Felelősség",
      "Szerzői jogok"
    ]
  }
};

(async () => {
  const results = {};
  for (const [key, obj] of Object.entries(texts)) {
    results[key] = {};
    for (const [k, v] of Object.entries(obj)) {
      if (Array.isArray(v)) {
        results[key][k] = [];
        for (const item of v) {
          const t = await translate(item);
          results[key][k].push(t);
          console.log(`${key}.${k}: ${item} -> ${t}`);
        }
      } else {
        const t = await translate(v);
        results[key][k] = t;
        console.log(`${key}.${k}: ${v} -> ${t}`);
      }
    }
  }
  fs.writeFileSync('translations-legal.json', JSON.stringify(results, null, 2));
  console.log('Done! Saved to translations-legal.json');
})();
