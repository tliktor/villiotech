# Villiotech Codebase Audit Report
**Date:** 2026-03-15  
**Scope:** Full codebase — frontend, backend, infrastructure, CI/CD

---

## 🔴 CRITICAL — Fix Immediately

### 1. CSP allows `unsafe-inline` and `unsafe-eval`
**File:** `infrastructure/lib/static-site-stack.ts` (CloudFront Function)  
The Content-Security-Policy header is set to:
```
default-src 'self' 'unsafe-inline' 'unsafe-eval' https:
```
This effectively disables XSS protection. `unsafe-eval` allows arbitrary JS execution, `unsafe-inline` allows inline script injection. This is almost as bad as having no CSP at all.

**Fix:** Use nonce-based CSP or at minimum remove `unsafe-eval`. Since you use React (no `eval`), you don't need it. For inline styles (Tailwind), `unsafe-inline` on `style-src` only is acceptable, but not on `script-src`.

### 2. Backend/frontend type mismatch — form submissions may silently fail
**File:** `backend/functions/contact/types.ts` vs `frontend/src/types/contact.ts`  
The backend `types.ts` defines enum values like `web-development`, `mobile-app`, `cloud-solutions` — these are leftover template values. The frontend sends `felulvizsgalat`, `villanyszereles`, `it-halozat`, etc. The backend validator uses `VALID_SERVICES = ['felulvizsgalat', 'villanyszereles', 'it-halozat', 'keziszerszam', 'egyeb']` which is correct, but the `types.ts` file is completely wrong and misleading. Same issue with `CLIENT_TYPES` — backend has `individual`, `small-business`, `enterprise` but frontend sends `maganszemely`, `tarsashaz`, `vallalkozas`.

**Fix:** Update `backend/functions/contact/types.ts` to match the actual values used by the frontend and validator.

### 3. Rate limiting has a race condition
**File:** `backend/functions/contact/rateLimit.ts`  
`checkRateLimit()` and `updateRateLimit()` are separate calls with no atomic operation. Under concurrent requests from the same IP, multiple requests can pass the check before any update happens. Use DynamoDB conditional writes (`ConditionExpression`) or atomic counters (`UpdateExpression ADD`) instead of separate GET + PUT.

### 4. AWS Account ID hardcoded and committed to git
**Files:** `infrastructure/bin/infrastructure.ts`, `backend/deploy/deploy.sh`, `backend/deploy/lambda-permissions-policy.json`, `README.md`  
The AWS account ID appears in 5 files in the repo. While not a secret per se, it's an information disclosure that aids targeted attacks. Use `cdk.Aws.ACCOUNT_ID` or environment variables instead.

---

## 🟠 HIGH — Fix Soon

### 5. No 404 page
**File:** `frontend/src/App.tsx`  
There's no catch-all route. Any unknown URL silently shows a blank page inside the Layout. Add a `<Route path="*" element={<NotFound />} />`.

### 6. CloudFront 403→200 rewrite hides real errors
**File:** `infrastructure/lib/static-site-stack.ts`  
```ts
errorResponses: [{ httpStatus: 403, responseHttpStatus: 200, responsePagePath: '/index.html' }]
```
This rewrites ALL 403s to 200 with `index.html`. This is needed for SPA routing, but it also masks actual access-denied errors and makes debugging impossible. Also missing: 404 error response mapping.

### 7. `dangerouslySetInnerHTML` in JsonLd component
**File:** `frontend/src/components/JsonLd.tsx`  
While the data is a static object (safe in this case), using `dangerouslySetInnerHTML` is a pattern that should be avoided. Use `react-helmet-async` with `<script>` tag instead (like the SEO component already does).

### 8. `main.tsx` hydration logic is dead code
**File:** `frontend/src/main.tsx`  
The `hydrateRoot` branch checks `rootElement.hasChildNodes()`, but since you removed the prerender script and puppeteer, server-rendered HTML never exists. This is dead code that adds confusion.

### 9. Footer links point to landing pages instead of main pages
**File:** `frontend/src/components/Footer.tsx`  
The "Target groups" section links to `/lakas`, `/tarsashaz`, `/ceg` (landing pages without navbar/footer) instead of `/lakossagnak`, `/tarsashazaknak`, `/munkahelyeknek`. Users clicking these from the footer get a stripped-down page with no navigation back.

### 10. `visualizer()` runs in production builds
**File:** `frontend/vite.config.ts`  
`rollup-plugin-visualizer` generates a `stats.html` file on every build, including CI. This 952KB file is unnecessary in production. Wrap it in a condition: `process.env.ANALYZE && visualizer()`.

### 11. `stats.html` and `test-results/` committed to git
These are build artifacts / test artifacts that should be in `.gitignore`, not in the repo. `stats.html` is 952KB of bundle analysis. `test-results/` contains trace files and screenshots.

---

## 🟡 MEDIUM — Should Fix

### 12. No CORS validation on the backend Lambda
**File:** `backend/functions/contact/index.ts`  
The `ALLOWED_ORIGIN` is set but only used in response headers. There's no check that the incoming `Origin` header matches. Any origin can POST to the API. The API Gateway CORS config only applies to preflight (OPTIONS), not actual POST requests.

### 13. Hardcoded Hungarian strings in validation and some pages
**Files:** `backend/functions/contact/validator.ts`, `frontend/src/pages/Kapcsolat.tsx`, `frontend/src/pages/Munkahelyeknek.tsx`  
Some validation error messages are hardcoded in Hungarian (`'Kérem, adja meg a nevét'`) while others use `t()`. The Munkahelyeknek page has hardcoded section titles like `"Így dolgozunk együtt"` and `"Átlátható árazás"` instead of using i18n keys.

### 14. Email regex is too permissive
**Files:** `backend/functions/contact/validator.ts`, `frontend/src/pages/Kapcsolat.tsx`  
The regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` accepts things like `a@b.c` or `"@"@[.].`. Use a stricter pattern or just rely on the browser's built-in `type="email"` validation on the frontend and a proper library on the backend.

### 15. No input length limits on the frontend form
**File:** `frontend/src/pages/Kapcsolat.tsx`  
The backend validates max lengths (name: 200, description: 2000), but the frontend inputs have no `maxLength` attribute. Users can type unlimited text and only get an error after submission.

### 16. `ScrollReveal` reads `window.matchMedia` on every render
**File:** `frontend/src/components/ScrollReveal.tsx`  
`window.matchMedia('(prefers-reduced-motion: reduce)').matches` is called on every render. This should be memoized or moved to a hook/context.

### 17. Language switching side effects in render
**File:** `frontend/src/pages/Kapcsolat.tsx`  
```tsx
if (isEnglish && i18n.language !== 'en') {
  i18n.changeLanguage('en')
}
```
This is a side effect during render — it should be in a `useEffect`. React strict mode will call this twice.

### 18. Missing `rel="noopener noreferrer"` on some external links
**File:** `frontend/src/pages/EnglishSpeaking.tsx`  
The WhatsApp links (`https://wa.me/...`) don't have `rel="noopener noreferrer"`. The LinkedIn link does.

### 19. No error monitoring / alerting
There's no Sentry, LogRocket, or similar error tracking. The `ErrorBoundary` catches errors but only logs to `console.error`. In production, you'll never know when users hit errors.

### 20. `ErrorBoundary` shows English text on a Hungarian site
**File:** `frontend/src/components/ErrorBoundary.tsx`  
Shows "Something went wrong" and "Reload Page" — should use i18n or at least Hungarian text.

---

## 🔵 LOW — Nice to Fix

### 21. No `<meta name="viewport">` in `index.html`
Verify this exists — mobile rendering depends on it. (It may be in the HTML file but wasn't in the files I reviewed.)

### 22. `logo.jpg` is 157KB
**File:** `frontend/public/logo.jpg`  
A logo should be under 20KB. Convert to WebP or optimize the JPEG. The SVG version exists at 965 bytes — use that instead.

### 23. Duplicate `ThemeProvider` in landing pages
**File:** `frontend/src/pages/landing/LandingLakas.tsx`  
Landing pages wrap themselves in `<ThemeProvider>` even though they're outside the Layout. This creates a separate theme context — theme changes on landing pages won't persist when navigating to the main site.

### 24. `deploy.sh` is a manual deployment script alongside CDK
**File:** `backend/deploy/deploy.sh`  
You have both CDK infrastructure and a manual `deploy.sh` script. This creates confusion about which is the source of truth. The CDK stack should be the single deployment mechanism.

### 25. No `robots.txt` disallow for landing pages
Landing pages (`/lakas`, `/tarsashaz`, `/ceg`) are marked `noindex` in their `<meta>` tags, but `robots.txt` doesn't disallow them. Belt and suspenders — add `Disallow` rules.

### 26. `master` branch still exists on remote
You have both `main` (production) and `master` branches. This caused confusion earlier. Delete `master` to avoid future mistakes.

### 27. `.env.production` is committed to git
**File:** `frontend/.env.production`  
Contains the API Gateway URL. While this is a public endpoint (the frontend calls it from the browser anyway), committing `.env` files is a bad habit. The URL should be in the CI/CD pipeline or build config.

### 28. No tests running in CI
The GitHub Actions workflow only builds and deploys. There are Playwright e2e tests and vitest unit tests, but neither runs in CI. Failed tests won't block deployment.

---

## Summary

| Severity | Count | Key themes |
|----------|-------|------------|
| 🔴 Critical | 4 | CSP, type mismatch, race condition, account ID exposure |
| 🟠 High | 7 | Missing 404, dead code, wrong footer links, build artifacts in git |
| 🟡 Medium | 9 | CORS, i18n gaps, input validation, no error monitoring |
| 🔵 Low | 8 | Image optimization, branch cleanup, test coverage in CI |

**Top 3 priorities:**
1. Fix the CSP header (remove `unsafe-eval`, tighten `unsafe-inline`)
2. Fix the backend types to match actual form values
3. Add atomic rate limiting with DynamoDB conditional writes
