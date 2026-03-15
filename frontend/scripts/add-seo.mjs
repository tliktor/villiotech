import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const seoConfig = {
  '/': {
    title: 'Villamos biztonság, mérnöki precizitással – Budán | Villiotech',
    description: 'Joghatályos villamos felülvizsgálat, szakszerű villanyszerelés és IT hálózat kiépítés Budán. Kalibrált műszerek, tételes árajánlat, garancia. Villamosmérnök, 20 év tapasztalat.',
    keywords: 'villamos felülvizsgálat Budapest, villanyszerelés Buda, IT hálózat kiépítés, kéziszerszám felülvizsgálat, villamosmérnök Budapest',
  },
  '/lakossagnak': {
    title: 'Lakossági villanyszerelés és felülvizsgálat | Villiotech',
    description: 'Villamos biztonsági felülvizsgálat eladás/bérbeadás előtt, villanyszerelés, javítás, korszerűsítés otthonokhoz. WiFi/UTP hálózat kiépítés.',
    keywords: 'lakossági villanyszerelés, lakás villamos felülvizsgálat, otthoni villanyszerelés Budapest',
  },
  '/tarsashazaknak': {
    title: 'Társasházi villamos felülvizsgálat | Villiotech',
    description: '5 éves kötelező villamos felülvizsgálat társasházakhoz. Közös helyiségek, lépcsőház, pince, tetőtér. Joghatályos jegyzőkönyv, ÁFA-mentes számlázás.',
    keywords: 'társasház villamos felülvizsgálat, 5 éves felülvizsgálat, közös helyiségek villamos mérés',
  },
  '/munkahelyeknek': {
    title: 'Munkahelyi villamos felülvizsgálat és IT hálózat | Villiotech',
    description: 'Éves kötelező villamos felülvizsgálat munkahelyekhez. Kéziszerszám felülvizsgálat, IT hálózat kiépítés, villanyszerelés irodákhoz és üzletekhez.',
    keywords: 'munkahelyi villamos felülvizsgálat, éves felülvizsgálat, kéziszerszám felülvizsgálat, irodai IT hálózat',
  },
  '/szolgaltatasok/villamos-felulvizsgalat': {
    title: 'Villamos felülvizsgálat - Joghatályos jegyzőkönyv | Villiotech',
    description: 'Villamos biztonsági felülvizsgálat kalibrált műszerekkel. Joghatályos jegyzőkönyv, 5 éves és éves felülvizsgálat. Budapesten, Budán.',
    keywords: 'villamos felülvizsgálat, villamos biztonsági felülvizsgálat, joghatályos jegyzőkönyv',
  },
  '/szolgaltatasok/villanyszereles': {
    title: 'Villanyszerelés - Szakszerű kivitelezés | Villiotech',
    description: 'Villanyszerelés, javítás, korszerűsítés. Kapcsolók, lámpák, konnektorok cseréje. Biztosítótábla bővítés. Garancia minden munkára.',
    keywords: 'villanyszerelés Budapest, villanyszerelő Buda, kapcsoló csere, lámpa szerelés',
  },
  '/szolgaltatasok/it-halozat': {
    title: 'IT hálózat kiépítés - WiFi és UTP | Villiotech',
    description: 'IT hálózat kiépítés otthonokhoz és irodákhoz. WiFi hálózat tervezés, UTP kábel szerelés, hálózati rack kiépítés.',
    keywords: 'IT hálózat kiépítés, WiFi hálózat, UTP kábel szerelés, hálózati rack',
  },
  '/szolgaltatasok/keziszerszam-felulvizsgalat': {
    title: 'Kéziszerszám felülvizsgálat - Éves kötelező | Villiotech',
    description: 'Kéziszerszám villamos felülvizsgálat munkahelyekhez. Éves kötelező mérés, joghatályos jegyzőkönyv.',
    keywords: 'kéziszerszám felülvizsgálat, villamos kéziszerszám mérés, éves kéziszerszám felülvizsgálat',
  },
  '/rolam': {
    title: 'Rólam - Villamosmérnök, 20 év tapasztalat | Villiotech',
    description: 'Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. 20 év multinacionális tapasztalat.',
    keywords: 'villamosmérnök Budapest, villamos biztonsági felülvizsgáló, tűzvédelmi szakértő',
  },
  '/kapcsolat': {
    title: 'Kapcsolat - Ajánlatkérés | Villiotech',
    description: 'Kérjen ajánlatot villamos felülvizsgálatra vagy villanyszerelésre. Telefonon, e-mailben vagy űrlapon. Gyors visszajelzés, Budán.',
    keywords: 'villanyszerelő elérhetőség Budapest, villamos felülvizsgálat ajánlat',
  },
};

const baseHtml = readFileSync(join(__dirname, '../dist/index.html'), 'utf-8');

for (const [route, seo] of Object.entries(seoConfig)) {
  let html = baseHtml;
  
  // Replace title
  html = html.replace('<title>Villiotech</title>', `<title>${seo.title}</title>`);
  
  // Add meta tags after viewport
  const metaTags = `
    <meta name="description" content="${seo.description}" />
    <meta name="keywords" content="${seo.keywords}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="https://villiotech.hu${route}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="hu_HU" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <link rel="canonical" href="https://villiotech.hu${route}" />`;
  
  html = html.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />${metaTags}`
  );
  
  const filePath = route === '/' 
    ? join(__dirname, '../dist/index.html')
    : join(__dirname, `../dist${route}/index.html`);
  
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
  
  console.log(`✓ ${route}`);
}

console.log('\n✅ SEO meta tags added to all pages');
