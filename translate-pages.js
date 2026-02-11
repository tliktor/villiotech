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

async function translatePages() {
  const enPath = 'frontend/src/i18n/en.json';
  const existingEn = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // Translate Lakossagnak page
  console.log('Translating Lakossagnak page...');
  
  const bullets = [
    "Eladja az ingatlanát – a vevő vagy a közjegyző kéri a villamos biztonsági felülvizsgálatot",
    "Bérbe adja a lakását – a bérlő és a biztosító is elvárja az érvényes jegyzőkönyvet",
    "Felújítás után van – az új villamos hálózatot dokumentálni kell",
    "Villanyszerelőt keres – kapcsoló, konnektor, biztosíték, elosztó, világítás",
    "WiFi vagy hálózat kell – otthoni iroda, home office, stabil internetkapcsolat",
    "Külföldi és angolul beszél – teljes körű szolgáltatás angol nyelven is"
  ];

  const whyMePoints = [
    "Kalibrált, hitelesített műszerekkel dolgozom – a mérések joghatályosak",
    "Joghatályos jegyzőkönyvet kap, amit a hatóság, közjegyző, biztosító elfogad",
    "Tételes árajánlatot adok a munka megkezdése előtt",
    "Garanciát vállalok minden elvégzett munkára",
    "Magam után takarítok – a munkaterületet tisztán hagyom",
    "Kártyás fizetés a helyszínen",
    "Magánszemélyeknek ÁFA-mentes számla"
  ];

  const services = [
    {
      title: "Villamos biztonsági felülvizsgálat",
      desc: "Ingatlan eladás vagy bérbeadás előtt kötelező. Kalibrált műszerekkel végzem, joghatályos jegyzőkönyvet kap kézhez."
    },
    {
      title: "Villanyszerelés, javítás, kivitelezés",
      desc: "Kapcsolócsere, konnektor, biztosítéktábla, világítás, teljes lakás villanyszerelés. Tételes árajánlat, garancia."
    },
    {
      title: "IT hálózat – WiFi / UTP",
      desc: "Otthoni iroda, home office, stabil WiFi lefedettség. Különösen ajánlom külföldi ügyfeleknek."
    }
  ];

  const processSteps = [
    { title: "Ajánlatkérés", description: "Írja le röviden, mire van szüksége – az űrlapon vagy telefonon." },
    { title: "Egyeztetés", description: "Visszajelzek, egyeztetjük az időpontot és a részleteket." },
    { title: "Helyszíni munka", description: "Megérkezem pontosan, elvégzem a méréseket vagy a szerelési munkát." },
    { title: "Dokumentáció", description: "Joghatályos jegyzőkönyvet vagy tételes elszámolást és garanciajegyet kap." },
    { title: "Fizetés", description: "Készpénzzel vagy bankkártyával, a helyszínen. Számlát azonnal kiállítom." }
  ];

  try {
    // Translate basic texts
    const heroSubtitle = await translateText("Eladás, bérbeadás vagy felújítás előtt áll? Villamos biztonsági felülvizsgálat joghatályos jegyzőkönyvvel, villanyszerelés garanciával, IT hálózat kiépítés – egy megbízható mérnöktől.");
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const targetSection = await translateText("Önnek szól, ha…");
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const whyMeSection = await translateText("Miért engem válasszon?");
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const whyMeIntro = await translateText("Képzett villamosmérnök, villanyszerelő vagyok. Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. 20 évet dolgoztam multinacionális környezetben, ahol a pontosság és a felelősség nem opció, hanem alapelvárás volt.");
    await new Promise(resolve => setTimeout(resolve, 200));

    // Translate bullets
    const translatedBullets = [];
    for (const bullet of bullets) {
      const translated = await translateText(bullet);
      translatedBullets.push(translated);
      console.log(`✓ Bullet: "${bullet}" -> "${translated}"`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Translate why me points
    const translatedWhyMePoints = [];
    for (const point of whyMePoints) {
      const translated = await translateText(point);
      translatedWhyMePoints.push(translated);
      console.log(`✓ Why me: "${point}" -> "${translated}"`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Translate services
    const translatedServices = [];
    for (const service of services) {
      const translatedTitle = await translateText(service.title);
      await new Promise(resolve => setTimeout(resolve, 200));
      const translatedDesc = await translateText(service.desc);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      translatedServices.push({
        title: translatedTitle,
        desc: translatedDesc
      });
      console.log(`✓ Service: "${service.title}" -> "${translatedTitle}"`);
    }

    // Translate process steps
    const translatedProcessSteps = [];
    for (const step of processSteps) {
      const translatedTitle = await translateText(step.title);
      await new Promise(resolve => setTimeout(resolve, 200));
      const translatedDesc = await translateText(step.description);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      translatedProcessSteps.push({
        title: translatedTitle,
        description: translatedDesc
      });
      console.log(`✓ Step: "${step.title}" -> "${translatedTitle}"`);
    }

    // Update English file
    const updatedEn = {
      ...existingEn,
      pages: {
        ...existingEn.pages,
        lakossagnak: {
          hero_subtitle: heroSubtitle,
          target_section: targetSection,
          bullets: translatedBullets,
          why_me_section: whyMeSection,
          why_me_intro: whyMeIntro,
          why_me_points: translatedWhyMePoints,
          services_section: await translateText("Szolgáltatásaim lakosságnak"),
          services: translatedServices,
          process_section: await translateText("Így dolgozunk együtt"),
          process_steps: translatedProcessSteps,
          pricing_section: await translateText("Átlátható árazás"),
          pricing_note: await translateText("Magánszemélyeknek ÁFA-mentes számlát állítok ki."),
          deliverables_section: await translateText("Mit kap kézhez?"),
          faq_section: await translateText("Gyakori kérdések"),
          cta_title: await translateText("Kérjen ajánlatot"),
          cta_subtitle: await translateText("Válaszolok 1 munkanapon belül. Budán dolgozom, kalibrált műszerekkel, garanciával.")
        }
      }
    };

    fs.writeFileSync(enPath, JSON.stringify(updatedEn, null, 2), 'utf8');
    console.log('✅ English translations updated successfully!');

  } catch (error) {
    console.error('❌ Translation failed:', error);
  }
}

translatePages();