# Tech Context

## Stack
- **Frontend**: React 19 + TypeScript + Vite 7
- **UI**: Tailwind CSS 4 + DaisyUI 5
- **Routing**: React Router DOM 7 (client-side)
- **Ikonok**: Lucide React
- **Hosting**: AWS S3 (statikus) + CloudFront (CDN)
- **AWS Account**: nntech-developer (335716056515), régió: eu-central-1
- **AWS CLI profil**: `--profile nntech-developer`
- **Repo**: https://github.com/tliktor/villiotech

## Témarendszer
Két DaisyUI custom téma az `index.css`-ben definiálva:
- `villiotech-day` – modern neumorphism (soft shadows, domború kártyák, világos háttér)
- `villiotech-night` – liquid glass (glassmorphism, backdrop-blur, átlátszóság, sötét háttér)

Témaváltás: `ThemeProvider` context (`src/hooks/useTheme.tsx`), localStorage-ban perzisztál.

CSS utility class-ok:
- Day: `.neu-flat`, `.neu-pressed`, `.neu-convex`, `.neu-subtle`
- Night: `.glass-card`, `.glass-card-strong`, `.glass-subtle`
- A `ThemeCard` komponens automatikusan alkalmazza a megfelelő stílust.

## Layout
- Bento box grid design (aszimmetrikus kártyaelrendezés)
- Responsive: mobile-first, 1→2→3 oszlopos grid
- Sticky navbar + sticky mobil CTA gomb alul

## Tagelés
Minden AWS erőforráson: `app: villiotech`

## Build & Deploy
```bash
# Build
cd villiotech/frontend && npx vite build

# Deploy S3-ra
aws s3 sync villiotech/frontend/dist/ s3://villiotech-website/ --delete --profile nntech-developer

# CloudFront invalidáció (deploy után)
aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*" --profile nntech-developer
```

## Fontos fájlok
- `frontend/src/index.css` – Tailwind config + DaisyUI témák + neumorphism/glass CSS
- `frontend/src/hooks/useTheme.tsx` – ThemeProvider context
- `frontend/src/App.tsx` – routing + ThemeProvider wrapper
- `frontend/src/components/ThemeCard.tsx` – automatikus téma-alapú kártya
- `infrastructure/cloudfront-config.json` – CloudFront disztribúció config
- `infrastructure/s3-bucket-policy.json` – S3 bucket policy
- `content/*.md` – teljes weboldal szöveges tartalom (13 fájl)
