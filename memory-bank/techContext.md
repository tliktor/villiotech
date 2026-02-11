# Tech Context

## Stack
- **Frontend**: React 19 + TypeScript + Vite 7
- **UI**: Tailwind CSS 4 + DaisyUI 5
- **Routing**: React Router DOM 7 (client-side)
- **i18n**: react-i18next (HU/EN)
- **Fordítás**: DeepL API (KÖTELEZŐ minden fordításhoz)
- **Ikonok**: Lucide React
- **Backend**: AWS Lambda (Node.js 24) + API Gateway
- **Email**: AWS SES (info@villiotech.hu)
- **Hosting**: AWS S3 (statikus) + CloudFront (CDN)
- **Domain**: Route53 (villiotech.hu) + ACM SSL
- **IaC**: AWS CDK (TypeScript)
- **CI/CD**: GitHub Actions
- **Testing**: Playwright (E2E), Vitest (unit)
- **AWS Account**: nntech-developer (335716056515), régió: eu-central-1
- **AWS CLI profil**: `--profile nntech-developer`
- **Repo**: https://github.com/tliktor/villiotech

## DeepL API
**API Key**: `d663ff80-58f1-4efa-9625-522eb30834c4`
**Használat**: MINDEN fordítást DeepL API-val kell végezni, KÖTELEZŐ!
**Endpoint**: https://api-free.deepl.com/v2/translate

## Subagent használat
**KÖTELEZŐ**: Minden komplex feladathoz subagenteket kell használni a fő kontextus tisztán tartására és a munka gyorsítására.

## Témarendszer
Két DaisyUI custom téma az `index.css`-ben definiálva:
- `villiotech-day` – modern neumorphism (soft shadows, domború kártyák, világos háttér)
- `villiotech-night` – liquid glass (glassmorphism, backdrop-blur, átlátszóság, sötét háttér)

Témaváltás: `ThemeProvider` context (`src/hooks/useTheme.tsx`), localStorage-ban perzisztál.

CSS utility class-ok:
- Day: `.neu-flat`, `.neu-pressed`, `.neu-convex`, `.neu-subtle`
- Night: `.glass-card`, `.glass-card-strong`, `.glass-subtle`
- A `ThemeCard` komponens automatikusan alkalmazza a megfelelő stílust.

## i18n (Nemzetköziesítés)
- **Könyvtár**: react-i18next
- **Nyelvek**: Magyar (hu), Angol (en)
- **Fordítási fájlok**: `src/i18n/hu.json`, `src/i18n/en.json`
- **Konfiguráció**: `src/i18n/config.ts`
- **Inicializálás**: `src/utils/i18n.ts`
- **Nyelv váltó**: Navbar-ban, localStorage perzisztencia
- **Fordítási kulcsok**: 200+ kulcs, 30,000+ szó

## Layout
- Bento box grid design (aszimmetrikus kártyaelrendezés)
- Responsive: mobile-first, 1→2→3 oszlopos grid
- Sticky navbar + sticky mobil CTA gomb alul
- Skip-to-main link (accessibility)

## Backend API
- **Endpoint**: https://qqpmxpz0kf.execute-api.eu-central-1.amazonaws.com/contact
- **Method**: POST
- **Lambda**: villiotech-contact-handler
- **Validáció**: honeypot, timestamp, rate limiting
- **Email**: SES (info@villiotech.hu)
- **CORS**: Engedélyezett origin: villiotech.hu

## Tagelés
Minden AWS erőforráson: `app: villiotech`

## Build & Deploy

### Lokális build
```bash
cd frontend && npm run build
```

### Manuális deploy
```bash
# Deploy S3-ra
aws s3 sync frontend/dist/ s3://villiotech-website/ --delete --profile nntech-developer

# CloudFront invalidáció
aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*" --profile nntech-developer
```

### CI/CD (GitHub Actions)
Push to `main` → auto build → S3 sync → CloudFront invalidation

## Fontos fájlok
- `frontend/src/index.css` – Tailwind config + DaisyUI témák + neumorphism/glass CSS
- `frontend/src/hooks/useTheme.tsx` – ThemeProvider context
- `frontend/src/utils/i18n.ts` – i18next inicializálás
- `frontend/src/i18n/hu.json` – Magyar fordítások
- `frontend/src/i18n/en.json` – Angol fordítások
- `frontend/src/App.tsx` – routing + ThemeProvider + i18n wrapper
- `frontend/src/components/ThemeCard.tsx` – automatikus téma-alapú kártya
- `backend/functions/contact/handler.ts` – Lambda contact handler
- `infrastructure/lib/villiotech-stack.ts` – CDK stack definition
- `.github/workflows/deploy.yml` – CI/CD pipeline
- `content/*.md` – teljes weboldal szöveges tartalom (13 fájl)

## Környezeti változók
- `VITE_API_URL` – API Gateway endpoint (production: .env.production)
- `AWS_REGION` – eu-central-1
- `SES_FROM_EMAIL` – info@villiotech.hu
