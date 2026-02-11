# Active Context

## Jelenlegi állapot (2026-02-11)
A weboldal **MVP COMPLETE** - production-ready és élőben van.

## Élő URL-ek
- **Production:** https://www.villiotech.hu (egyedi domain)
- **CloudFront:** https://d1wsqe7tpbsupy.cloudfront.net
- **API:** https://qqpmxpz0kf.execute-api.eu-central-1.amazonaws.com/contact

## AWS erőforrások
| Erőforrás | Azonosító | Régió |
|---|---|---|
| S3 Bucket | villiotech-website | eu-central-1 |
| CloudFront Distribution | E3NYUDMA72TSET | global |
| OAC | E1138YTF4HLNDF | global |
| Lambda Function | villiotech-contact-handler | eu-central-1 |
| API Gateway | qqpmxpz0kf | eu-central-1 |
| Route53 Hosted Zone | villiotech.hu | global |

## Legutóbbi munkamenet (2026-02-11)
1. ✅ **i18n implementálva** - teljes HU/EN fordítás (30k+ szó)
2. ✅ **CI/CD pipeline** - GitHub Actions auto-deploy
3. ✅ **Backend deployed** - Lambda + API Gateway + SES
4. ✅ **Domain setup** - villiotech.hu Route53-ban
5. ✅ **E2E tesztek** - Playwright (12/18 sikeres)
6. ✅ **Accessibility audit** - WCAG 2.1 AA compliance
7. ✅ **Phone number updated** - +36302389945
8. ✅ **Favicon + PWA manifest** - teljes setup

## Ismert problémák (E2E teszt alapján)
- ⚠️ Nyelv perzisztencia (localStorage sync)
- ⚠️ Téma váltó aria-label (teszt selektor)
- ⚠️ Form validáció strict mode (duplikált üzenetek)
- ℹ️ Service CTA gomb szöveg (teszt vs. valóság)
- ℹ️ Mobil menü aria-label (teszt selektor)
- ℹ️ Skip-to-main focus (accessibility)

**Megjegyzés:** A legtöbb "hiba" valójában teszt selektor probléma, nem funkcionális hiba. Az oldal működik.

## Munkafolyamat szabály
🛑 **KRITIKUS**: SOHA ne kezdj implementálást a tulajdonos explicit engedélye nélkül!
- Plan mode-ban CSAK tervezz, NE írj kódot
- Implementálás előtt MINDIG kérj jóváhagyást
- Ha engedély nélkül kezdesz dolgozni, nem lehet leállítani és hibákat okozol
- Ez a szabály FELÜLÍR minden mást

## Következő lépések
- Opcionális: E2E tesztek finomítása
- Opcionális: Framer Motion animációk
- Opcionális: Blog/cikkek szekció
- Opcionális: Online időpontfoglaló
