# Progress

## Kész ✅
- [x] GitHub repo (`tliktor/villiotech`)
- [x] Projekt struktúra (monorepo: frontend / backend / infrastructure / shared / content)
- [x] Teljes weboldal szöveges tartalom (13 fájl, magyar, konverzió-optimalizált)
- [x] React frontend (10 oldal, 12 újrafelhasználható komponens)
- [x] DaisyUI 5 + Tailwind CSS 4 integráció
- [x] Neumorphism (day) téma
- [x] Liquid Glass (night) téma
- [x] Témaváltó (ThemeProvider context, localStorage)
- [x] Bento box grid layout
- [x] Responsive design (mobile-first)
- [x] Sticky navbar + mobil CTA
- [x] Ajánlatkérő űrlap (frontend validáció)
- [x] S3 bucket (villiotech-website, eu-central-1)
- [x] CloudFront disztribúció (E3NYUDMA72TSET, PriceClass_100)
- [x] OAC (Origin Access Control)
- [x] S3 bucket policy (csak CloudFront hozzáférés)
- [x] Első deploy

## Nincs kész ❌ – Prioritás szerint

### P0 – Kritikus (launch előtt kell)
- [x] Backend: form submission Lambda handler kód kész (deploy még nem történt – SES verify + API GW szükséges)
- [x] Frontend: Kapcsolat.tsx API service integráció (honeypot, timestamp, async submit, loading, error handling)
- [x] SEO: meta tagek, Open Graph, title per oldal (SEO komponens minden oldalon)
- [x] SEO: JSON-LD LocalBusiness schema (Layout-ban)
- [x] Adatvédelmi tájékoztató oldal (GDPR)
- [x] ÁSZF oldal
- [x] Code splitting (React.lazy + Suspense)
- [x] Google Maps embed a Kapcsolat oldalon (lazy loaded)
- [ ] Favicon + PWA manifest
- ~~Cookie banner~~ – nem kell, nem használunk cookie-kat
- ~~GA/GTM~~ – nem kell, nem használunk cookie-kat

### P1 – Fontos (launch után rövid távon)
- [ ] Egyedi domain (villiotech.hu) + Route53 + ACM SSL cert
- [ ] Backend deploy: Lambda + API Gateway + SES verify
- [ ] Képek / fotók (munkák, eszközök, portré)
- [ ] Scroll-triggered animációk (Framer Motion)
- [ ] CI/CD pipeline (GitHub Actions → build → S3 sync → CloudFront invalidation)

### P2 – Nice to have
- [ ] Teljes angol nyelvű változat (i18n)
- [ ] Blog / cikkek szekció (SEO tartalommarketing)
- [ ] Online időpontfoglaló rendszer
- [ ] Google Business Profile integráció
- [ ] Testimonials / referenciák szekció (ha lesznek)
- [ ] A/B tesztelés a hero szövegekre

## Ismert problémák
- Az űrlap jelenleg csak frontend-en validál, nincs backend – az adatok nem mennek sehová
- Placeholder telefonszám (+36 00 000 0000) és email (info@villiotech.hu) – cserélni kell valódi adatokra
- A `content/*.md` fájlok és a React komponensek szövegei manuálisan szinkronizáltak – ha a szöveg változik, mindkét helyen frissíteni kell
