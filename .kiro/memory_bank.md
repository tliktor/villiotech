# Villiotech Memory Bank

## Project Overview
Budai villamos szakember (villamosmérnök) üzleti weboldala. Célja: ajánlatkérés és időpontfoglalás generálása három célcsoportra (lakosság, társasházak, munkahelyek). Prémium, biztonságcentrikus hangnem.

**Tulajdonos:** Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi vizsgákkal, hamarosan villámvédelmi felülvizsgáló is. 20 év multinacionális tapasztalat. Fő terület: Budapest Buda.

**Szolgáltatások:** Villamos biztonsági felülvizsgálat, villanyszerelés, IT hálózat kiépítés, elektromos kéziszerszámok felülvizsgálata.

## Tech Stack
- **Frontend:** React 19 + TypeScript + Vite 7
- **UI:** Tailwind CSS 4 + DaisyUI 5 (két custom téma: `villiotech-day` neumorphism + `villiotech-night` liquid glass)
- **Routing:** React Router DOM 7 (client-side)
- **i18n:** i18next + react-i18next (HU/EN)
- **Animations:** Framer Motion (scroll reveal)
- **Hosting:** AWS S3 (`villiotech-website`) + CloudFront (`E3NYUDMA72TSET`)
- **Backend:** AWS Lambda (Node.js 24) + API Gateway HTTP API
- **Infrastructure:** AWS CDK (TypeScript)
- **AWS Account:** nntech-developer (335716056515), régió: eu-central-1
- **Repo:** https://github.com/tliktor/villiotech

## Architecture
```
[User] → [CloudFront CDN] → [S3: villiotech-website]
         (OAC, PriceClass_100, SPA routing: 403→index.html)
```

**Monorepo:** frontend / backend / infrastructure / shared / content

**Témaváltás:** ThemeProvider context (`src/hooks/useTheme.tsx`), localStorage perzisztencia

**Layout:** Bento box grid, responsive (mobile-first), sticky navbar + mobil CTA

## Key Files
- `frontend/src/index.css` – Tailwind + DaisyUI témák + neumorphism/glass CSS
- `frontend/src/hooks/useTheme.tsx` – ThemeProvider context
- `frontend/src/components/ThemeCard.tsx` – auto téma-alapú kártya
- `content/*.md` – 13 fájl, teljes weboldal tartalom (referencia)

## Build & Deploy
```bash
cd frontend && npx vite build
aws s3 sync dist/ s3://villiotech-website/ --delete --profile nntech-developer
aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*" --profile nntech-developer
```

## Current State (2026-02-10)
✅ **Kész:** 
- Frontend (10 oldal, 12 komponens)
- Két custom téma (neumorphism day + liquid glass night)
- S3+CloudFront deploy
- SEO (meta + JSON-LD)
- Code splitting
- Adatvédelem/ÁSZF oldalak
- Kapcsolat űrlap (API service integráció)
- **Backend deployed (Lambda + API Gateway, Node.js 24)**
- **CI/CD (GitHub Actions)**
- **i18n (HU/EN, Navbar + Footer + Home + Kapcsolat)**
- **Framer Motion scroll animációk (Home oldal)**
- **AWS CDK infrastructure-as-code (static-site-stack + api-stack)**

❌ **Nincs kész:** Favicon + PWA manifest (kihagyva), SES email verification (sandbox mode, később domain-nel)

**Élő URL:** https://d1wsqe7tpbsupy.cloudfront.net
**API URL:** https://qqpmxpz0kf.execute-api.eu-central-1.amazonaws.com/contact

## Key Decisions
1. DaisyUI 5 + Tailwind 4 (gyors fejlesztés, custom témák)
2. Két custom téma: neumorphism (day) + liquid glass (night)
3. ThemeProvider Context (egységes témaváltás)
4. S3 + CloudFront (nem Amplify – teljes kontroll, olcsóbb)
5. OAC (Origin Access Control, modern megoldás)
6. SPA routing: CloudFront 403 → index.html (React Router client-side)
7. Monorepo (npm workspaces)
8. Tartalom duplikáció: `content/*.md` (referencia) + React komponensek (hardcoded)
9. Lucide React ikonok (tree-shakeable, könnyű)

## Component Patterns
**Újrafelhasználható komponensek:** Hero, ThemeCard, SectionTitle, WhyMe, ProcessSteps, PricingTable, FAQ, DeliverablesList, CTASection

**Oldal struktúra:** Hero → Kinek szól → Miért én → Szolgáltatások → Folyamat → Árazás → Mit kap kézhez → FAQ → Záró CTA

## URL Structure
- `/` – Kezdőlap
- `/lakossagnak`, `/tarsashazaknak`, `/munkahelyeknek` – Landing oldalak
- `/szolgaltatasok/*` – 4 szolgáltatás aloldal
- `/rolam` – Bemutatkozás
- `/kapcsolat` – Ajánlatkérés + űrlap

## Next Steps
- SES email verification (sandbox mode)
- Real telefonszám + email (placeholder csere)
- Google Business Profile setup
- Domain setup (villiotech.hu) + Route53 + ACM
- GitHub Secrets (AWS credentials)
- TODO.md implementálása (lásd: TODO.md)

## Known Issues
- Placeholder telefonszám/email – cserélni kell valódi adatokra
- Backend még nincs deployolva – űrlap adatok nem mennek sehová
- Tartalom szinkronizáció: `content/*.md` és React komponensek manuálisan frissítendők
