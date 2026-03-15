import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/lakossagnak',
  '/tarsashazaknak',
  '/munkahelyeknek',
  '/szolgaltatasok/villamos-felulvizsgalat',
  '/szolgaltatasok/villanyszereles',
  '/szolgaltatasok/it-halozat',
  '/szolgaltatasok/keziszerszam-felulvizsgalat',
  '/rolam',
  '/kapcsolat',
];

async function prerender() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    console.log(`Pre-rendering ${route}...`);
    
    const url = `http://localhost:4173${route}`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const html = await page.content();
    
    const filePath = route === '/' 
      ? join(__dirname, '../dist/index.html')
      : join(__dirname, `../dist${route}/index.html`);
    
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, html);
    
    console.log(`✓ Saved ${filePath}`);
  }

  await browser.close();
  console.log('\n✅ Pre-rendering complete!');
}

prerender().catch(console.error);
