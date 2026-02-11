const https = require('https');
const querystring = require('querystring');

const API_KEY = 'd663ff80-58f1-4efa-9625-522eb34834c4';
const API_URL = 'api-free.deepl.com';

const texts = [
  "Kiszállás – Buda",
  "Kiszállás – Pest (kivételesen)",
  "Sürgős (4 órán belül)",
  "Tételes árajánlat",
  "E-számla a helyszínen",
  "Garancia a munkára",
  "ÁFA-mentes számlát állítok ki",
  "ÁFÁ-s számlát állítok ki",
  "Kártyás fizetés",
  "Bankkártyával is fizethet a helyszínen",
  "Nincsenek rejtett költségek",
  "Minden elvégzett munkára garanciát vállalok",
  "Tételes árajánlat a munka előtt",
  "Garancia minden munkára",
  "Budapest – Buda",
  "Magánszemélyeknek ÁFA-mentes, vállalkozásoknak ÁFÁ-s számlát állítok ki. Társasházaknak ÁFA-mentes számlázás.",
  "Társasházaknak ÁFA-mentes számlát állítok ki.",
  "Vállalkozásoknak ÁFÁ-s számlát állítok ki."
];

async function translateText(text) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      auth_key: API_KEY,
      text: text,
      source_lang: 'HU',
      target_lang: 'EN'
    });

    const options = {
      hostname: API_URL,
      port: 443,
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.translations && result.translations[0]) {
            resolve(result.translations[0].text);
          } else {
            reject(new Error(`Translation failed: ${data}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function translateAll() {
  const result = {};
  
  for (const text of texts) {
    try {
      const translation = await translateText(text);
      result[text] = translation;
      await new Promise(resolve => setTimeout(resolve, 100)); // Rate limiting
    } catch (error) {
      console.error(`Failed to translate "${text}":`, error.message);
      result[text] = "";
    }
  }
  
  console.log(JSON.stringify(result, null, 2));
}

translateAll();