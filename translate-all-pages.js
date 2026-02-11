const fs = require('fs');
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

async function translateAllPages() {
  const huPath = 'frontend/src/i18n/hu.json';
  const enPath = 'frontend/src/i18n/en.json';
  
  const existingHu = JSON.parse(fs.readFileSync(huPath, 'utf8'));
  const existingEn = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // Add all remaining page translations to Hungarian
  const newHuPages = {
    tarsashazaknak: {
      hero_subtitle: 'Közös képviselőként Ön felel a lakók biztonságáért. Elvégzem a kötelező villamos biztonsági felülvizsgálatot, joghatályos jegyzőkönyvvel, tételes árajánlattal a közgyűléshez.',
      target_section: 'Önnek szól, ha…',
      bullets: [
        'Közös képviselő és a társasház villamos felülvizsgálása esedékes',
        'Társasházi döntéshozó és a közgyűlés elé kell vinni az árajánlatot',
        'Hatósági felszólítást kapott a társasház villamos hálózatának ellenőrzésére',
        'Közös területek villanyszerelése szükséges (lépcsőház, pince, garázs)',
        'Biztosítási esemény miatt kell dokumentáció',
        'Felújítás előtt áll a társasház és felmérés kell'
      ],
      why_me_section: 'Miért engem válasszon?',
      why_me_intro: 'Tudom, hogy közös képviselőként Önnek a közgyűlés felé is el kell számolnia. Ezért adok tételes árajánlatot, amit bemutathat a lakóközösségnek, és joghatályos jegyzőkönyvet, amit a hatóság elfogad.',
      why_me_points: [
        'Vizsgázott villamos biztonsági felülvizsgáló – villamosmérnöki végzettséggel',
        'Kalibrált műszerek – joghatályos mérési eredmények',
        'Tételes árajánlat – bemutatható a közgyűlésen',
        'Joghatályos jegyzőkönyv – hatóság előtt elfogadott',
        'ÁFA-mentes számlázás társasházaknak',
        '20 év multinacionális tapasztalat – pontosság, korrekt kommunikáció',
        'Garancia a munkára, magam után takarítok'
      ],
      process_section: 'Így dolgozunk együtt',
      cta_title: 'Kérjen árajánlatot a közgyűléshez',
      cta_subtitle: 'Tételes árajánlatot küldök, amit bemutathat a lakóközösségnek.'
    },
    munkahelyeknek: {
      hero_subtitle: 'Irodája, üzlete vagy vendéglátóhelye van? A villamos biztonsági felülvizsgálat 3 évente kötelező. Az elektromos kéziszerszámok éves ellenőrzését helyszínen végzem.',
      target_section: 'Önnek szól, ha…',
      bullets: [
        'Irodát üzemeltet és esedékes a 3 évenkénti villamos felülvizsgálat',
        'Üzletet vagy boltot vezet és szüksége van az érvényes jegyzőkönyvre',
        'Vendéglátóhelye van és a hatóság kéri a dokumentációt',
        'Fodrászatot, szépségszalont működtet és az eszközök éves felülvizsgálata esedékes',
        'Rendelőt, orvosi praxist vezet és a villamos biztonság dokumentálása szükséges',
        'Kéziszerszámokat használ és az éves felülvizsgálat esedékes'
      ],
      why_me_section: 'Miért engem válasszon?',
      why_me_intro: 'Tudom, hogy egy vállalkozásnak a hatósági megfelelés nem opció – kötelesség. Ezért gyorsan, precízen és minimális fennakadással dolgozom.',
      services_section: 'Szolgáltatásaim munkahelyeknek',
      cta_title: 'Ne várja meg a hatósági ellenőrzést',
      cta_subtitle: 'A kötelező felülvizsgálat elmulasztása bírságot vonhat maga után. Kérjen ajánlatot, és legyen naprakész.'
    },
    rolam: {
      hero_title: 'Villamosmérnök, 20 év tapasztalattal – most Önnek dolgozom.',
      hero_subtitle: 'Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. Két évtizednyi multinacionális tapasztalat után a budai otthonok, társasházak és munkahelyek villamos biztonságáért dolgozom.',
      intro_section: 'Ki áll a Villiotech mögött?',
      intro_content: [
        'Villamosmérnök vagyok, vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. Hamarosan villámvédelmi felülvizsgálóként is rendelkezésre állok.',
        '20 évet dolgoztam multinacionális környezetben, ahol megtanultam, hogy a pontosság, a felelősség és a korrekt kommunikáció nem választható extra – hanem alapelvárás. Ezt a szemléletet hoztam magammal a magánszektorba is.',
        'Budán élek és dolgozom. Fő területem a II. kerület és egész Buda, de kivételesen Pesten is vállalok munkát.',
        'Magyarul és angolul egyaránt dolgozom – külföldi ügyfeleimet ugyanazzal a precizitással szolgálom ki.'
      ],
      qualifications_section: 'Képesítéseim',
      values_section: 'Amiben hiszek',
      english_title: 'About me – for English-speaking clients',
      english_content: 'I\'m a qualified electrical engineer and certified electrical safety inspector based in Buda, Budapest. With 20 years of experience in multinational environments, I bring precision, accountability, and clear communication to every project.',
      cta_title: 'Dolgozzunk együtt',
      cta_subtitle: 'Ha precíz, megbízható villamos szakembert keres Budán – keressen bizalommal.'
    }
  };

  // Update Hungarian file
  const updatedHu = {
    ...existingHu,
    pages: {
      ...existingHu.pages,
      ...newHuPages
    }
  };

  fs.writeFileSync(huPath, JSON.stringify(updatedHu, null, 2), 'utf8');
  console.log('✅ Hungarian file updated');

  // Now translate all the new content
  console.log('Starting translation of all pages...');
  
  const translatedPages = {};
  
  for (const [pageName, pageContent] of Object.entries(newHuPages)) {
    console.log(`\nTranslating ${pageName}...`);
    translatedPages[pageName] = {};
    
    for (const [key, value] of Object.entries(pageContent)) {
      if (typeof value === 'string') {
        try {
          translatedPages[pageName][key] = await translateText(value);
          console.log(`✓ ${pageName}.${key}`);
          await new Promise(resolve => setTimeout(resolve, 150));
        } catch (error) {
          console.error(`✗ Error translating ${pageName}.${key}:`, error.message);
          translatedPages[pageName][key] = value;
        }
      } else if (Array.isArray(value)) {
        translatedPages[pageName][key] = [];
        for (let i = 0; i < value.length; i++) {
          try {
            translatedPages[pageName][key][i] = await translateText(value[i]);
            console.log(`✓ ${pageName}.${key}[${i}]`);
            await new Promise(resolve => setTimeout(resolve, 150));
          } catch (error) {
            console.error(`✗ Error translating ${pageName}.${key}[${i}]:`, error.message);
            translatedPages[pageName][key][i] = value[i];
          }
        }
      }
    }
  }

  // Update English file
  const updatedEn = {
    ...existingEn,
    pages: {
      ...existingEn.pages,
      ...translatedPages
    }
  };

  fs.writeFileSync(enPath, JSON.stringify(updatedEn, null, 2), 'utf8');
  console.log('\n✅ All translations completed and files updated!');
}

translateAllPages().catch(console.error);