# Architecture Decisions

## AD-001: DaisyUI 5 + Tailwind CSS 4
**Döntés:** DaisyUI-t használunk UI framework-ként.
**Miért:** Gyors fejlesztés, beépített komponensek (btn, card, navbar, dropdown, collapse, table, form elemek), egyszerű custom téma rendszer. A Tailwind CSS 4 natív CSS-ben definiálja a témákat (`@plugin` szintaxis).

## AD-002: Két custom téma – Neumorphism + Liquid Glass
**Döntés:** Nem a beépített DaisyUI témákat használjuk, hanem két teljesen custom témát.
**Miért:** A megrendelő kérése: nappal neumorphism, éjjel liquid glass. A témák az `index.css`-ben vannak definiálva `@plugin "daisyui/theme"` szintaxissal, a neumorphism/glass utility class-ok pedig `[data-theme="..."]` szelektorokkal.

## AD-003: ThemeProvider Context
**Döntés:** A téma state-et React Context-ben tároljuk, nem lokális hook-ban.
**Miért:** Kezdetben `useState` hook volt minden komponensben külön, ami nem szinkronizálta a témát. A `ThemeProvider` context megoldja, hogy az egész app egységesen váltson témát.

## AD-004: S3 + CloudFront (nem Amplify)
**Döntés:** Manuális S3 + CloudFront setup, nem AWS Amplify.
**Miért:** Teljes kontroll az infrastruktúra felett, olcsóbb, átláthatóbb. Az Amplify túl sok absztrakciót ad egy egyszerű statikus oldalhoz.

## AD-005: PriceClass_100
**Döntés:** CloudFront PriceClass_100 (csak EU + Észak-Amerika edge location-ök).
**Miért:** A célközönség Budapesten van. Nincs szükség ázsiai/dél-amerikai edge-ekre. Költségcsökkentés.

## AD-006: OAC (Origin Access Control)
**Döntés:** OAC-t használunk, nem OAI-t (Origin Access Identity).
**Miért:** Az OAC az AWS ajánlott, modernebb megoldása. Az S3 bucket teljesen privát, csak a CloudFront fér hozzá.

## AD-007: SPA routing – 403 → index.html
**Döntés:** CloudFront custom error response: 403 → /index.html (200).
**Miért:** React Router client-side routing-ot használ. Ha a felhasználó közvetlenül egy aloldalra navigál (pl. `/lakossagnak`), az S3 404/403-at adna. A CloudFront átirányítja az index.html-re, és a React Router kezeli a route-ot.

## AD-008: Monorepo struktúra
**Döntés:** Egyetlen repo, npm workspaces-szel (frontend / backend / infrastructure / shared / content).
**Miért:** Egyszerűbb kezelés, egy helyen van minden. A backend és infrastructure még üres, de a struktúra kész.

## AD-009: Tartalom duplikáció (content/*.md + React komponensek)
**Döntés:** A szöveges tartalom két helyen van: `content/*.md` (referencia) és a React komponensekben (hardcoded).
**Miért:** Egyszerűség. Nincs CMS, nincs markdown parser. A `content/*.md` fájlok a szövegíró AI referenciája, a React komponensek a tényleges megjelenítés. Ha a szöveg változik, mindkét helyen frissíteni kell. Később CMS-re migrálható.

## AD-011: react-i18next (nem i18next-browser-languagedetector)
**Döntés:** Egyszerű react-i18next setup, manuális nyelv váltó gomb.
**Miért:** Nem akarunk automatikus nyelv detektálást (zavaró lehet). A felhasználó explicit választ HU/EN között. A localStorage perzisztálja a választást.

## AD-012: CI/CD GitHub Actions
**Döntés:** GitHub Actions workflow, nem AWS CodePipeline.
**Miért:** Egyszerűbb setup, ingyenes GitHub-on, jól integrálódik a repo-val. A CodePipeline túlzás egy statikus oldalhoz.

## AD-013: AWS CDK (nem CloudFormation vagy Terraform)
**Döntés:** AWS CDK TypeScript-ben.
**Miért:** Type-safe, jobb developer experience, könnyebb karbantartás. A CloudFormation YAML túl verbose, a Terraform pedig külön tool.

## AD-014: Playwright E2E tesztek
**Döntés:** Playwright, nem Cypress vagy Selenium.
**Miért:** Gyorsabb, modernebb, jobb TypeScript support, beépített trace viewer. A Cypress lassabb és nehezebb debugolni.

## AD-015: Vitest (nem Jest)
**Döntés:** Vitest unit tesztekhez.
**Miért:** Natív Vite integráció, gyorsabb, modernebb. A Jest lassabb és külön config kell.

## AD-016: Lambda Node.js 20 (nem Python vagy Go)
**Döntés:** Node.js 20 TypeScript-ben.
**Miért:** Ugyanaz a nyelv mint a frontend, könnyebb megosztani a típusokat. A Python és Go külön skillset lenne.

## AD-017: SES email (nem SendGrid vagy Mailgun)
**Döntés:** AWS SES.
**Miért:** Natív AWS integráció, olcsóbb, nincs külső dependency. A SendGrid/Mailgun drágább és külön account kell.

## AD-018: Egyedi domain Route53-ban
**Döntés:** villiotech.hu Route53 hosted zone-ban.
**Miért:** Teljes kontroll a DNS felett, könnyű SSL cert kezelés ACM-mel. Külső DNS provider (pl. Cloudflare) külön tool lenne.
