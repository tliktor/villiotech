# Villiotech – Remaining Development Tasks (Kiro-CLI Prompt)

## CONTEXT
You're working on the **Villiotech** project – a React 19 + TypeScript + Vite 7 + DaisyUI 5 website for a Budapest-based electrician. The frontend is complete and deployed to AWS S3 + CloudFront. Most P0 tasks are done. You need to complete the remaining MVP tasks and prepare for launch.

**Current state:**
- ✅ Frontend: 12 pages, 12 components, 2 custom DaisyUI themes (neumorphism day + liquid glass night)
- ✅ SEO: meta tags, JSON-LD LocalBusiness schema on all pages
- ✅ Contact form: frontend + backend Lambda code ready (honeypot, timestamp anti-spam)
- ✅ Code splitting: React.lazy + Suspense on all routes
- ✅ Adatvédelem + ÁSZF pages created
- ✅ Google Maps lazy embed on Kapcsolat page
- ❌ Backend NOT deployed yet (Lambda + API Gateway + SES)
- ❌ No favicon/PWA manifest
- ❌ No i18n (English version)
- ❌ No scroll animations
- ❌ No CI/CD pipeline
- ❌ No AWS CDK infra-as-code

**AWS resources:**
- S3 bucket: `villiotech-website` (eu-central-1)
- CloudFront: `E3NYUDMA72TSET` (domain: `d1wsqe7tpbsupy.cloudfront.net`)
- AWS profile: `nntech-developer` (Account: 335716056515)
- Tagging: `app: villiotech` on ALL resources

**Repo:** `tliktor/villiotech` (GitHub)

**Important:** User said "nem használunk cookiekat" – NO cookies, NO cookie consent, NO GA/GTM.

---

## YOUR TASKS (in priority order)

### TASK 1: Favicon + PWA Manifest (P0 – Critical)
**Goal:** Professional browser tab icon + PWA support.

**Requirements:**
1. Generate favicon set (16x16, 32x32, 180x180 Apple touch icon, 192x192, 512x512 for PWA)
2. Create `public/manifest.json`:
   - name: "Villiotech – Villamos biztonsági felülvizsgálat Budán"
   - short_name: "Villiotech"
   - description: "Villamos felülvizsgálat, villanyszerelés, IT hálózat – Budán, kalibrált műszerekkel"
   - theme_color: match `--color-primary` from `villiotech-day` theme (oklch(0.55 0.18 250) → convert to hex)
   - background_color: match `--color-base-100` from `villiotech-day` (oklch(0.95 0.01 250) → convert to hex)
   - icons: 192x192, 512x512 (maskable + any)
3. Update `index.html` with favicon links + manifest link + theme-color meta
4. Update `vite.config.ts` to copy manifest.json to dist/

**Icon design:** Simple, professional. Use a lightning bolt (⚡) or electrical plug icon. Colors: primary blue from the theme. If you can't generate images, provide placeholder SVG code and instructions for the user to generate PNGs.

**Files to create/modify:**
- `frontend/public/manifest.json`
- `frontend/public/favicon.svg` (or provide SVG code)
- `frontend/index.html` (add favicon + manifest links)
- `frontend/vite.config.ts` (ensure public/ assets are copied)

---

### TASK 2: Deploy Backend (Lambda + API Gateway + SES) (P1 – Important)
**Goal:** Make the contact form functional – emails should arrive when users submit.

**Backend code is ready:**
- `backend/functions/contact/index.ts` – Lambda handler (SES send, validation, CORS)
- `backend/functions/contact/validator.ts` – input validation + sanitization
- `backend/package.json` – dependencies (@aws-sdk/client-ses)

**What you need to do:**

#### 2.1 SES Setup
1. Verify sender email: `noreply@villiotech.hu` (or use `info@villiotech.hu` if domain not verified)
2. Verify recipient email: `info@villiotech.hu`
3. Request SES sandbox exit (production access) – or document that it's in sandbox mode for now
4. Region: `eu-central-1`

#### 2.2 Lambda Function
1. Create Lambda function: `villiotech-contact-handler`
   - Runtime: Node.js 20.x
   - Handler: `index.handler`
   - Timeout: 10 seconds
   - Memory: 256 MB
   - Environment variables:
     - `RECIPIENT_EMAIL=info@villiotech.hu`
     - `SENDER_EMAIL=noreply@villiotech.hu`
     - `ALLOWED_ORIGIN=https://d1wsqe7tpbsupy.cloudfront.net` (update when custom domain is ready)
   - IAM role: needs `ses:SendEmail` permission
   - Tag: `app: villiotech`
2. Package and deploy the Lambda code:
   ```bash
   cd backend/functions/contact
   npm install
   zip -r function.zip .
   aws lambda create-function --function-name villiotech-contact-handler --runtime nodejs20.x --role <IAM_ROLE_ARN> --handler index.handler --zip-file fileb://function.zip --timeout 10 --memory-size 256 --environment Variables="{RECIPIENT_EMAIL=info@villiotech.hu,SENDER_EMAIL=noreply@villiotech.hu,ALLOWED_ORIGIN=https://d1wsqe7tpbsupy.cloudfront.net}" --tags app=villiotech --profile nntech-developer
   ```

#### 2.3 API Gateway HTTP API
1. Create HTTP API: `villiotech-contact-api`
2. Create route: `POST /contact`
3. Integration: Lambda proxy to `villiotech-contact-handler`
4. CORS: allow origin `https://d1wsqe7tpbsupy.cloudfront.net`, methods `POST, OPTIONS`, headers `Content-Type`
5. Throttling: 10 req/sec burst, 100 req/day quota
6. Tag: `app: villiotech`
7. Get the API Gateway invoke URL (e.g., `https://abc123.execute-api.eu-central-1.amazonaws.com/contact`)

#### 2.4 Update Frontend
1. Create `.env.production` in `frontend/`:
   ```
   VITE_CONTACT_API_URL=https://<API_GW_ID>.execute-api.eu-central-1.amazonaws.com/contact
   ```
2. Rebuild and redeploy:
   ```bash
   cd frontend
   npx vite build
   aws s3 sync dist/ s3://villiotech-website/ --delete --profile nntech-developer
   aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*" --profile nntech-developer
   ```

#### 2.5 Test
1. Submit the contact form on the live site
2. Check CloudWatch Logs for Lambda execution
3. Verify email arrives at `info@villiotech.hu`

**Deliverables:**
- Lambda function deployed
- API Gateway HTTP API created + URL documented
- `.env.production` created with API URL
- Frontend redeployed
- Test email received

---

### TASK 3: i18n (English version) (P2 – Nice to have)
**Goal:** Add English language support for international clients.

**Requirements:**
1. Install `i18next`, `react-i18next`, `i18next-browser-languagedetector`
2. Create `frontend/src/i18n/config.ts` – i18next setup (HU default, EN fallback, localStorage persistence)
3. Create translation files:
   - `frontend/src/i18n/hu.json` – extract all Hungarian strings from components
   - `frontend/src/i18n/en.json` – English translations (use DeepL API key: `d663ff80-58f1-4efa-9625-522eb30834c4`)
4. Add language switcher to `Navbar.tsx` – HU/EN toggle button (flag icons or text)
5. Wrap strings in `useTranslation()` hook – start with:
   - Navbar (menu items)
   - Footer
   - Home page (hero, sections)
   - Kapcsolat page (form labels, placeholders, validation errors)
6. Route strategy: NO route prefix (e.g., `/en/contact`) – just toggle language in-place with localStorage

**Translation priority:**
- High: Navbar, Footer, Home, Kapcsolat
- Medium: Lakossagnak, Tarsashazaknak, Munkahelyeknek
- Low: Service pages, Rolam, Adatvedelem, ASZF

**Deliverables:**
- i18next configured
- HU/EN toggle in Navbar
- At minimum: Navbar, Footer, Home, Kapcsolat translated
- Language persists in localStorage

---

### TASK 4: Scroll Animations (Framer Motion) (P2 – Nice to have)
**Goal:** Add smooth scroll-triggered animations for premium feel.

**Requirements:**
1. Install `framer-motion`
2. Create `frontend/src/components/ScrollReveal.tsx` – reusable wrapper component:
   - Fade in + slide up on scroll into view
   - Configurable delay, duration, threshold
3. Wrap key sections:
   - Hero sections (fade in from top)
   - ThemeCard grids (stagger children)
   - SectionTitle (fade in)
   - CTASection (fade in + scale)
4. Keep animations subtle – no bouncing, no excessive motion (accessibility)
5. Respect `prefers-reduced-motion` media query – disable animations if user prefers

**Example usage:**
```tsx
<ScrollReveal>
  <SectionTitle title="..." />
</ScrollReveal>

<ScrollReveal stagger={0.1}>
  <div className="grid ...">
    {items.map(item => <ThemeCard key={item.id}>...</ThemeCard>)}
  </div>
</ScrollReveal>
```

**Deliverables:**
- `ScrollReveal.tsx` component
- Animations applied to Home, Lakossagnak, Tarsashazaknak, Munkahelyeknek pages
- Respects `prefers-reduced-motion`

---

### TASK 5: CI/CD Pipeline (GitHub Actions) (P1 – Important)
**Goal:** Automate build + deploy on every push to `main`.

**Requirements:**
1. Create `.github/workflows/deploy.yml`:
   - Trigger: push to `main` branch
   - Jobs:
     - `build`: Install deps, run `npx vite build`, upload `dist/` as artifact
     - `deploy`: Download artifact, sync to S3, invalidate CloudFront
   - Use GitHub Secrets for AWS credentials:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `AWS_REGION=eu-central-1`
   - S3 sync: `aws s3 sync dist/ s3://villiotech-website/ --delete`
   - CloudFront invalidation: `aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*"`
2. Add status badge to `README.md`

**Deliverables:**
- `.github/workflows/deploy.yml` created
- GitHub Secrets configured (document what the user needs to add)
- First successful automated deploy

---

### TASK 6: AWS CDK Infrastructure-as-Code (P3 – Hardening)
**Goal:** Reproduce the entire AWS infrastructure from code.

**Requirements:**
1. Install AWS CDK: `npm install -g aws-cdk`
2. Create `infrastructure/` folder with CDK app:
   ```
   infrastructure/
   ├── bin/
   │   └── app.ts          # CDK entry point
   ├── lib/
   │   ├── static-site-stack.ts   # S3 + CloudFront + OAC
   │   └── api-stack.ts           # Lambda + API Gateway + SES permissions
   ├── cdk.json
   ├── package.json
   └── tsconfig.json
   ```
3. `static-site-stack.ts`:
   - S3 bucket (private, no public access)
   - CloudFront distribution (OAC, HTTP→HTTPS redirect, SPA routing 403→/index.html)
   - Outputs: CloudFront domain, S3 bucket name
4. `api-stack.ts`:
   - Lambda function (from `backend/functions/contact/`)
   - API Gateway HTTP API (POST /contact, CORS, throttling)
   - IAM role for Lambda (SES send permission)
   - Outputs: API Gateway URL
5. Tag all resources: `app: villiotech`
6. Deploy: `cdk deploy --all --profile nntech-developer`

**Note:** This is a refactor – the infrastructure already exists manually. CDK should recreate it. You may need to import existing resources or recreate from scratch (document the approach).

**Deliverables:**
- CDK app in `infrastructure/`
- `cdk deploy` successfully creates/imports all resources
- Outputs documented (CloudFront URL, API URL)

---

## EXECUTION STRATEGY

**Use subagents for parallel work:**
1. **Task 1 (Favicon)** – quick, can be done by one subagent
2. **Task 2 (Backend deploy)** – critical, needs AWS CLI access, can be done by one subagent
3. **Task 3 (i18n)** – large, can be done by one subagent (use DeepL API for translations)
4. **Task 4 (Animations)** – medium, can be done by one subagent
5. **Task 5 (CI/CD)** – quick, can be done by one subagent
6. **Task 6 (CDK)** – large, can be done by one subagent

**Suggested order:**
1. Start with Task 1 + Task 2 in parallel (both are P0/P1 critical)
2. Then Task 5 (CI/CD) so future deploys are automated
3. Then Task 3 + Task 4 in parallel (both P2, can be done independently)
4. Finally Task 6 (CDK) – this is a refactor, not blocking launch

---

## IMPORTANT NOTES

- **AWS CLI profile:** ALWAYS use `--profile nntech-developer`
- **AWS region:** `eu-central-1`
- **Tagging:** `app: villiotech` on ALL AWS resources
- **No cookies:** User explicitly said no cookies, no GA/GTM, no consent banner
- **Placeholder data:** Phone `+36 00 000 0000`, email `info@villiotech.hu` – these are placeholders, user will update later
- **Build command:** `cd villiotech/frontend && npx vite build`
- **Deploy command:** `aws s3 sync villiotech/frontend/dist/ s3://villiotech-website/ --delete --profile nntech-developer`
- **CloudFront invalidation:** `aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*" --profile nntech-developer`

---

## MEMORY-BANK FILES (read these first)
- `villiotech/memory-bank/techContext.md` – tech stack, themes, build/deploy commands
- `villiotech/memory-bank/progress.md` – what's done, what's not
- `villiotech/memory-bank/activeContext.md` – current state, last changes
- `villiotech/docs/development-roadmap.md` – full roadmap with 25 issues

---

## SUCCESS CRITERIA

After completing these tasks:
- ✅ Favicon visible in browser tab
- ✅ Contact form sends emails to `info@villiotech.hu`
- ✅ English version available (at least Home + Kapcsolat)
- ✅ Smooth scroll animations on key sections
- ✅ GitHub Actions auto-deploys on push to `main`
- ✅ AWS CDK can recreate the entire infrastructure

**Ready to launch!** 🚀
