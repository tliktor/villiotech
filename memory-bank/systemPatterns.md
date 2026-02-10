# System Patterns

## Architektúra
```
[Felhasználó] → [CloudFront CDN] → [S3 Bucket: villiotech-website]
                  ↓
            HTTPS, HTTP/2+3
            Gzip tömörítés
            PriceClass_100 (EU+NA)
            OAC (Origin Access Control)
```

## Komponens hierarchia
```
App (ThemeProvider + BrowserRouter)
└── Layout
    ├── Navbar (sticky, témaváltó, dropdown menü, sürgős badge)
    ├── <Outlet /> (oldalak)
    │   ├── Home (hero + 3 bento kártya + WhyMe + ProcessSteps + PricingTable + DeliverablesList + angol szekció + CTASection)
    │   ├── Lakossagnak / Tarsashazaknak / Munkahelyeknek (landing oldalak, azonos struktúra)
    │   ├── szolgaltatasok/* (4 aloldal)
    │   ├── Rolam
    │   └── Kapcsolat (űrlap + validáció)
    ├── Footer (4 oszlopos)
    └── StickyMobileCTA (csak mobilon)
```

## Újrafelhasználható komponensek
| Komponens | Leírás | Props |
|---|---|---|
| `Hero` | Főcím + alcím + 2 CTA | title, subtitle, cta1, cta2 |
| `ThemeCard` | Auto neumorphism/glass kártya | children, className, hover |
| `SectionTitle` | Szekció cím + opcionális alcím | title, subtitle |
| `WhyMe` | 8 kártyás grid (fix tartalom) | – |
| `ProcessSteps` | Lépésenkénti folyamat | steps[] |
| `PricingTable` | Árazási táblázat | rows[], note |
| `FAQ` | Accordion kérdés-válasz | items[] |
| `DeliverablesList` | "Mit kap kézhez" ikon lista | items[] |
| `CTASection` | Záró konverziós blokk | title, subtitle, cta1, cta2 |

## Mintázatok
- Minden oldal ugyanazt a szekció-sorrendet követi: Hero → Kinek szól → Miért én → Szolgáltatások → Folyamat → Árazás → Mit kap kézhez → FAQ → Záró CTA
- A `ThemeCard` automatikusan alkalmazza a megfelelő stílust a téma alapján
- CTA-k mindig konkrétak: „Ajánlatot kérek", „Visszahívást kérek", „Sürgős? 4 órán belül"
- Minden oldalon legalább 2 CTA

## URL struktúra
```
/                                          Kezdőlap
/lakossagnak                               Lakosság landing
/tarsashazaknak                            Társasház landing
/munkahelyeknek                            Munkahelyek landing
/szolgaltatasok/villamos-felulvizsgalat    Szolgáltatás aloldal
/szolgaltatasok/villanyszereles            Szolgáltatás aloldal
/szolgaltatasok/it-halozat                 Szolgáltatás aloldal
/szolgaltatasok/keziszerszam-felulvizsgalat Szolgáltatás aloldal
/rolam                                     Bemutatkozás
/kapcsolat                                 Ajánlatkérés + űrlap
```
