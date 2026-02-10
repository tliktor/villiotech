# Villiotech – Fejlesztési Roadmap & Implementációs Terv

---

## 1) PRIORITÁSI ROADMAP

### Fázis 1 – MVP Launch (1-2 hét)
| # | Tétel | Miért fontos | Méret | Kockázat |
|---|---|---|---|---|
| 1 | Form backend (Lambda+SES) | Nélküle az űrlap nem csinál semmit – a weboldal fő célja az ajánlatkérés | L | Közepes – SES sandbox, CORS |
| 2 | SEO meta tagek + JSON-LD | Google indexelés, keresési megjelenés | M | Alacsony |
| 3 | Favicon + PWA manifest | Professzionális megjelenés, böngésző tab ikon | S | Alacsony |
| 4 | Adatvédelem + ÁSZF oldalak | GDPR kötelező, nélküle nem publikálható | M | Alacsony |
| 5 | Cookie banner + consent | GDPR kötelező, GA nem indulhat consent nélkül | M | Alacsony |
| 6 | GA/GTM integráció | Konverzió mérés, forgalom elemzés | S | Alacsony |
| 7 | Alapvető performance (code splitting) | Gyorsabb betöltés, jobb UX | M | Alacsony |

### Fázis 2 – Growth (2-4 hét)
| # | Tétel | Miért fontos | Méret | Kockázat |
|---|---|---|---|---|
| 8 | i18n (HU/EN) | Külföldi ügyfelek kiszolgálása – üzleti cél | L | Közepes – sok szöveg |
| 9 | Google Maps embed | Bizalomépítés, szolgáltatási terület vizualizáció | S | Alacsony |
| 10 | Képek/fotók | Vizuális hitelesség, konverzió növelés | M | Alacsony |
| 11 | Scroll animációk | Prémium érzet, engagement | M | Alacsony |
| 12 | Egyedi domain + SSL | Professzionális URL (villiotech.hu) | M | Közepes – DNS propagáció |

### Fázis 3 – Hardening (4-6 hét)
| # | Tétel | Miért fontos | Méret | Kockázat |
|---|---|---|---|---|
| 13 | AWS CDK infra-as-code | Reprodukálhatóság, verziókezelés | L | Közepes – CDK tanulási görbe |
| 14 | CI/CD (GitHub Actions) | Automatikus deploy, kevesebb hiba | M | Alacsony |
| 15 | Biztonsági hardening (CSP, rate limit) | DDoS védelem, spam csökkentés | M | Alacsony |

---

## 2) IMPLEMENTÁCIÓS CHECKLIST (25 issue)

### Fázis 1 – MVP Launch
- [ ] #1 Lambda function: contact form handler (validate + SES send)
- [ ] #2 API Gateway HTTP API + CORS config
- [ ] #3 SES domain/email verify + sandbox kilépés
- [ ] #4 Frontend: API service layer (src/services/contact.ts)
- [ ] #5 Frontend: Kapcsolat.tsx → API hívás + toast feedback
- [ ] #6 Spam védelem: honeypot + timestamp check
- [ ] #7 react-helmet-async telepítés + SEO komponens
- [ ] #8 Meta tagek minden oldalra (title, description, OG)
- [ ] #9 JSON-LD LocalBusiness schema a Layout-ba
- [ ] #10 Favicon generálás + manifest.json + Vite config
- [ ] #11 /adatvedelem oldal (strukturált tartalom)
- [ ] #12 /aszf oldal (strukturált tartalom)
- [ ] #13 CookieConsent komponens (DaisyUI bottom bar)
- [ ] #14 Consent hook (useConsent) + localStorage
- [ ] #15 GTM/GA integráció consent-alapú betöltéssel
- [ ] #16 Route-szintű code splitting (React.lazy + Suspense)

### Fázis 2 – Growth
- [ ] #17 i18next setup + nyelvváltó a Navbar-ban
- [ ] #18 Kezdőlap + Kapcsolat angol fordítás
- [ ] #19 Google Maps lazy embed komponens
- [ ] #20 Képek: optimalizált formátum, lazy loading
- [ ] #21 Framer Motion: scroll-triggered animációk
- [ ] #22 Route53 hosted zone + ACM cert + CloudFront alias

### Fázis 3 – Hardening
- [ ] #23 AWS CDK stack (S3 + CloudFront + Lambda + API GW)
- [ ] #24 GitHub Actions CI/CD pipeline
- [ ] #25 Security headers (CSP, rate limiting, WAF alapok)

---

## 3) JAVASOLT FÁJLSTRUKTÚRA (új fájlok)

```
frontend/src/
├── services/
│   └── contact.ts              # API hívás a Lambda-hoz
├── hooks/
│   ├── useTheme.tsx            # (meglévő)
│   └── useConsent.ts           # Cookie consent state
├── components/
│   ├── SEO.tsx                 # react-helmet-async wrapper
│   ├── CookieConsent.tsx       # GDPR banner
│   ├── GoogleMap.tsx           # Lazy loaded Maps embed
│   ├── ScrollReveal.tsx        # Framer Motion wrapper
│   └── ... (meglévők)
├── pages/
│   ├── Adatvedelem.tsx         # Adatvédelmi tájékoztató
│   ├── ASZF.tsx                # ÁSZF
│   └── ... (meglévők)
├── i18n/
│   ├── config.ts               # i18next konfig
│   ├── hu.json                 # Magyar fordítások
│   └── en.json                 # Angol fordítások
└── lib/
    └── gtm.ts                  # GTM helper

backend/
├── functions/
│   └── contact/
│       ├── index.ts            # Lambda handler
│       └── validator.ts        # Input validáció
└── package.json

infrastructure/
├── lib/
│   ├── static-site-stack.ts    # S3 + CloudFront
│   └── api-stack.ts            # Lambda + API GW + SES
└── bin/
    └── app.ts                  # CDK entry
```

---

## 4) AWS ARCHITEKTÚRA – Form Backend

```
[Kapcsolat űrlap] → [API Gateway HTTP API] → [Lambda] → [SES] → [Email értesítés]
                          ↓                       ↓
                     CORS headers            Validáció
                     Rate limit              Honeypot check
                     Throttling              Timestamp check
```

**Döntés: Lambda Function URL vs API Gateway**
→ **API Gateway HTTP API** (alapértelmezett)
- Beépített throttling (rate limit)
- CORS kezelés
- Könnyebb monitoring (CloudWatch)
- Alternatíva: Lambda Function URL – egyszerűbb, de nincs beépített rate limit

---

## 5) BIZTONSÁG / GDPR

| Terület | Megoldás | Hol a kódban |
|---|---|---|
| Spam: honeypot | Rejtett mező az űrlapban | Kapcsolat.tsx + Lambda validator |
| Spam: timestamp | Min. 3 sec kitöltési idő | Kapcsolat.tsx + Lambda validator |
| Rate limit | API GW throttling: 10 req/sec, 100/nap | infrastructure/api-stack.ts |
| CORS | Csak a saját domain engedélyezve | Lambda handler headers |
| CSP | Content-Security-Policy header | CloudFront response headers policy |
| GDPR consent | Cookie banner, localStorage consent | useConsent.ts + CookieConsent.tsx |
| GA consent mode | GTM csak consent után tölt be | lib/gtm.ts |
| Input sanitization | Server-side validáció, HTML strip | backend/functions/contact/validator.ts |
