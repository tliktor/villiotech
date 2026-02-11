const fs = require('fs');
const path = require('path');
const { translateObject } = require('./translate-all.js');

// Load existing i18n files
const huPath = path.join(__dirname, 'frontend/src/i18n/hu.json');
const enPath = path.join(__dirname, 'frontend/src/i18n/en.json');

const existingHu = JSON.parse(fs.readFileSync(huPath, 'utf8'));
const existingEn = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// New Hungarian texts to add
const newHuTexts = {
  pages: {
    lakossagnak: {
      hero_subtitle: 'Eladás, bérbeadás vagy felújítás előtt áll? Villamos biztonsági felülvizsgálat joghatályos jegyzőkönyvvel, villanyszerelés garanciával, IT hálózat kiépítés – egy megbízható mérnöktől.',
      target_section: 'Önnek szól, ha…',
      bullets: [
        'Eladja az ingatlanát – a vevő vagy a közjegyző kéri a villamos biztonsági felülvizsgálatot',
        'Bérbe adja a lakását – a bérlő és a biztosító is elvárja az érvényes jegyzőkönyvet',
        'Felújítás után van – az új villamos hálózatot dokumentálni kell',
        'Villanyszerelőt keres – kapcsoló, konnektor, biztosíték, elosztó, világítás',
        'WiFi vagy hálózat kell – otthoni iroda, home office, stabil internetkapcsolat',
        'Külföldi és angolul beszél – teljes körű szolgáltatás angol nyelven is'
      ],
      why_me_section: 'Miért engem válasszon?',
      why_me_intro: 'Képzett villamosmérnök, villanyszerelő vagyok. Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. 20 évet dolgoztam multinacionális környezetben, ahol a pontosság és a felelősség nem opció, hanem alapelvárás volt.',
      why_me_points: [
        'Kalibrált, hitelesített műszerekkel dolgozom – a mérések joghatályosak',
        'Joghatályos jegyzőkönyvet kap, amit a hatóság, közjegyző, biztosító elfogad',
        'Tételes árajánlatot adok a munka megkezdése előtt',
        'Garanciát vállalok minden elvégzett munkára',
        'Magam után takarítok – a munkaterületet tisztán hagyom',
        'Kártyás fizetés a helyszínen',
        'Magánszemélyeknek ÁFA-mentes számla'
      ],
      services_section: 'Szolgáltatásaim lakosságnak',
      services: [
        {
          title: 'Villamos biztonsági felülvizsgálat',
          desc: 'Ingatlan eladás vagy bérbeadás előtt kötelező. Kalibrált műszerekkel végzem, joghatályos jegyzőkönyvet kap kézhez.'
        },
        {
          title: 'Villanyszerelés, javítás, kivitelezés',
          desc: 'Kapcsolócsere, konnektor, biztosítéktábla, világítás, teljes lakás villanyszerelés. Tételes árajánlat, garancia.'
        },
        {
          title: 'IT hálózat – WiFi / UTP',
          desc: 'Otthoni iroda, home office, stabil WiFi lefedettség. Különösen ajánlom külföldi ügyfeleknek.'
        }
      ],
      process_section: 'Így dolgozunk együtt',
      process_steps: [
        { title: 'Ajánlatkérés', description: 'Írja le röviden, mire van szüksége – az űrlapon vagy telefonon.' },
        { title: 'Egyeztetés', description: 'Visszajelzek, egyeztetjük az időpontot és a részleteket.' },
        { title: 'Helyszíni munka', description: 'Megérkezem pontosan, elvégzem a méréseket vagy a szerelési munkát.' },
        { title: 'Dokumentáció', description: 'Joghatályos jegyzőkönyvet vagy tételes elszámolást és garanciajegyet kap.' },
        { title: 'Fizetés', description: 'Készpénzzel vagy bankkártyával, a helyszínen. Számlát azonnal kiállítom.' }
      ],
      pricing_section: 'Átlátható árazás',
      pricing_note: 'Magánszemélyeknek ÁFA-mentes számlát állítok ki.',
      deliverables_section: 'Mit kap kézhez?',
      faq_section: 'Gyakori kérdések',
      cta_title: 'Kérjen ajánlatot',
      cta_subtitle: 'Válaszolok 1 munkanapon belül. Budán dolgozom, kalibrált műszerekkel, garanciával.'
    }
  }
};

async function main() {
  console.log('Starting translation process...');
  
  try {
    // Translate the new Hungarian texts
    console.log('Translating new Hungarian texts...');
    const translatedTexts = await translateObject(newHuTexts);
    
    // Merge with existing translations
    const updatedHu = { ...existingHu, ...newHuTexts };
    const updatedEn = { ...existingEn, ...translatedTexts };
    
    // Write updated files
    fs.writeFileSync(huPath, JSON.stringify(updatedHu, null, 2), 'utf8');
    fs.writeFileSync(enPath, JSON.stringify(updatedEn, null, 2), 'utf8');
    
    console.log('✅ Translation complete!');
    console.log(`Updated ${huPath}`);
    console.log(`Updated ${enPath}`);
    
  } catch (error) {
    console.error('❌ Translation failed:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };