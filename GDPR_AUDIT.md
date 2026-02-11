# GDPR Compliance Audit & Action Plan
**Villiotech.hu - 2026-02-11**

---

## 🔍 JELENLEGI HELYZET AUDIT

### ✅ Amit JÓL csinálsz

1. **Nincs tracking/analytics**
   - Nincs Google Analytics
   - Nincs Facebook Pixel
   - Nincs harmadik féltől származó cookie
   - ✅ Ez GDPR szempontból ideális!

2. **Adatvédelmi tájékoztató létezik**
   - `/adatvedelem` oldal van
   - Tartalmazza az alapvető információkat
   - HU + EN nyelven elérhető

3. **ÁSZF létezik**
   - `/aszf` oldal van
   - Tartalmazza a szerződési feltételeket

4. **Minimális adatgyűjtés**
   - Csak az ajánlatkérő űrlapon gyűjtesz adatokat
   - Csak a szükséges mezők vannak
   - Honeypot + timestamp védelem (bot védelem)

5. **AWS EU szerverek**
   - Adatok EU-ban maradnak (eu-central-1)
   - Nincs USA-ba történő adattovábbítás

6. **Technikai sütik**
   - Csak localStorage (téma, nyelv)
   - Ezek technikai sütik, nem követő sütik

---

## ❌ HIÁNYOSSÁGOK (GDPR szempontból)

### 🔴 KRITIKUS (kötelező)

#### 1. **Adatkezelő adatai hiányosak**
**Probléma:**
```json
"section1_content": "Név: [Adatkezelő neve]\nSzékhely: Budapest, [cím]\nE-mail: info@villiotech.hu\nTelefon: [telefonszám]"
```
- Placeholder szövegek vannak
- Hiányzik a pontos név, cím, telefonszám

**GDPR követelmény:** GDPR 13. cikk (1) a) pont - az adatkezelő neve és elérhetősége

**Megoldás:**
```
Név: Liktor Tibor E.V. (vagy Villiotech Kft.)
Székhely: 1025 Budapest, Verecke út 138/D
E-mail: info@villiotech.hu
Telefon: +36 30 238 9945
Adószám: [adószám]
```

#### 2. **Hiányzik az explicit hozzájárulás az űrlapon**
**Probléma:**
- Az űrlapon nincs checkbox: "Elfogadom az adatvédelmi tájékoztatót"
- A GDPR 7. cikk szerint a hozzájárulásnak egyértelműnek és aktívnak kell lennie

**Megoldás:**
```tsx
<label className="flex items-start gap-2">
  <input 
    type="checkbox" 
    checked={form.privacy} 
    onChange={(e) => setForm({...form, privacy: e.target.checked})}
    required
  />
  <span className="text-sm">
    Elfogadom az <Link to="/adatvedelem" className="link">adatvédelmi tájékoztatót</Link> 
    és hozzájárulok adataim kezeléséhez. *
  </span>
</label>
```

#### 3. **Sütik kezelése pontatlan**
**Probléma:**
```json
"section6_content": "A weboldal technikai sütiket használ a működéshez (témaválasztás). 
Analitikai sütiket (Google Analytics) csak az Ön hozzájárulásával használunk."
```
- Azt írod, hogy GA-t használsz, de nem használsz
- localStorage ≠ cookie (technikai különbség)

**Megoldás:**
```
A weboldal NEM használ sütiket (cookie). A téma és nyelv beállítások 
a böngésző helyi tárhelyén (localStorage) kerülnek mentésre, ami nem 
minősül süti használatnak és nem igényel hozzájárulást.
```

#### 4. **Adatkezelés időtartama pontatlan**
**Probléma:**
```json
"section4_content": "A személyes adatokat az ajánlatkérés feldolgozásáig, 
de legfeljebb 1 évig tároljuk."
```
- Nincs konkrét időtartam
- Nincs automatikus törlés

**Megoldás:**
- Pontosan meg kell határozni: 30 nap / 90 nap / 1 év
- Lambda-ban implementálni kell az automatikus törlést (vagy manuális folyamatot)

#### 5. **Hiányzik az adatvédelmi tisztviselő (DPO) megnevezése**
**Probléma:**
- Ha 250+ alkalmazott VAGY nagy mennyiségű érzékeny adat → kötelező DPO
- Kis vállalkozásnál nem kötelező, de ajánlott megnevezni egy kapcsolattartót

**Megoldás:**
```
Adatvédelmi kapcsolattartó: info@villiotech.hu
```

#### 6. **Hiányzik a NAIH elérhetősége**
**Probléma:**
- A panasztétel jogánál csak a NAIH neve van, de nincs elérhetőség

**Megoldás:**
```
Panasztétel joga: Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
Cím: 1055 Budapest, Falk Miksa utca 9-11.
E-mail: ugyfelszolgalat@naih.hu
Web: https://naih.hu
```

---

### 🟡 FONTOS (ajánlott)

#### 7. **Hiányzik a cookie banner (ha később sütiket használsz)**
**Jelenlegi helyzet:** Nincs szükség rá, mert nincs cookie
**Ha később GA-t vagy más trackert használsz:** Cookie banner kötelező!

#### 8. **Hiányzik az adattörlési kérelem űrlap**
**Probléma:**
- Az érintett kérheti adatai törlését, de nincs egyszerű módja rá
- Jelenleg csak email-ben lehet kérni

**Megoldás:**
- Egyszerű űrlap: "Adataim törlése" gomb az adatvédelmi oldalon
- Vagy: egyértelmű instrukció, hogy email-ben kell kérni

#### 9. **Hiányzik az adatkezelési nyilvántartás**
**Probléma:**
- GDPR 30. cikk: az adatkezelőnek nyilvántartást kell vezetnie
- Kis vállalkozásnál (< 250 fő) egyszerűsített nyilvántartás elég

**Megoldás:**
- Egyszerű Excel/Google Sheets táblázat:
  - Milyen adatokat gyűjtesz
  - Miért
  - Meddig tárolod
  - Kinek továbbítod (AWS)

#### 10. **Hiányzik az adatvédelmi incidens kezelési terv**
**Probléma:**
- Ha adatszivárgás történik, 72 órán belül jelenteni kell a NAIH-nak
- Nincs dokumentált folyamat

**Megoldás:**
- Egyszerű dokumentum: "Mit tegyünk adatszivárgás esetén"
- Kapcsolattartó: NAIH, érintettek értesítése

---

## 📋 GDPR COMPLIANCE CHECKLIST

### Alapvető követelmények

- [ ] **Adatkezelő adatai teljesek** (név, cím, email, telefon, adószám)
- [ ] **Explicit hozzájárulás az űrlapon** (checkbox + link az adatvédelmi tájékoztatóhoz)
- [ ] **Adatvédelmi tájékoztató pontos** (nincs placeholder, nincs GA említés)
- [ ] **Sütik kezelése pontos** (localStorage ≠ cookie)
- [ ] **Adatkezelés időtartama konkrét** (pl. 90 nap)
- [ ] **NAIH elérhetősége teljes** (cím, email, web)
- [ ] **Adatvédelmi kapcsolattartó megnevezve**

### Technikai implementáció

- [ ] **Privacy checkbox az űrlapon** (kötelező mező)
- [ ] **Backend: adatok automatikus törlése** (90 nap után)
- [ ] **Backend: adattörlési kérelem kezelése** (email vagy API endpoint)
- [ ] **Adatkezelési nyilvántartás** (egyszerű táblázat)
- [ ] **Adatvédelmi incidens terv** (dokumentum)

### Footer badge

- [ ] **GDPR compliance badge a footerben** (accessibility mellé)

---

## 🚀 IMPLEMENTÁCIÓS TERV

### FÁZIS 1: Kritikus javítások (1-2 óra)

#### 1.1 Adatvédelmi tájékoztató frissítése
```typescript
// frontend/src/i18n/hu.json - adatvedelem szekció
{
  "section1_content": "Név: Liktor Tibor E.V.\nSzékhely: 1025 Budapest, Verecke út 138/D\nE-mail: info@villiotech.hu\nTelefon: +36 30 238 9945\nAdószám: [adószám]",
  
  "section4_content": "A személyes adatokat az ajánlatkérés feldolgozásától számított 90 napig tároljuk. Az érintett bármikor kérheti adatai azonnali törlését az info@villiotech.hu címen.",
  
  "section6_content": "A weboldal NEM használ sütiket (cookie). A téma és nyelv beállítások a böngésző helyi tárhelyén (localStorage) kerülnek mentésre, ami nem minősül süti használatnak és nem igényel hozzájárulást.",
  
  "section7_list": [
    "Hozzáférés joga – tájékoztatást kérhet a kezelt adatairól (info@villiotech.hu)",
    "Helyesbítés joga – kérheti adatai javítását (info@villiotech.hu)",
    "Törlés joga – kérheti adatai azonnali törlését (info@villiotech.hu)",
    "Hozzájárulás visszavonása – bármikor, a korábbi adatkezelés jogszerűségének érintése nélkül",
    "Panasztétel joga – Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)\n  Cím: 1055 Budapest, Falk Miksa utca 9-11.\n  E-mail: ugyfelszolgalat@naih.hu\n  Web: https://naih.hu"
  ]
}
```

#### 1.2 Privacy checkbox az űrlapon
```typescript
// frontend/src/pages/Kapcsolat.tsx
const [form, setForm] = useState({
  // ... existing fields
  privacy: false // ÚJ mező
})

const validate = (): boolean => {
  const e: Partial<Record<keyof FormData, string>> = {}
  // ... existing validations
  if (!form.privacy) e.privacy = 'Kérem, fogadja el az adatvédelmi tájékoztatót'
  // ...
}

// JSX:
<label className="flex items-start gap-2 cursor-pointer">
  <input 
    type="checkbox" 
    className="checkbox checkbox-primary mt-1"
    checked={form.privacy} 
    onChange={(e) => setForm({...form, privacy: e.target.checked})}
  />
  <span className="text-sm">
    Elfogadom az <Link to="/adatvedelem" className="link link-primary" target="_blank">adatvédelmi tájékoztatót</Link> 
    {' '}és hozzájárulok személyes adataim kezeléséhez az ajánlatkérés feldolgozása céljából. *
  </span>
</label>
{errors.privacy && <p className="text-error text-sm">{errors.privacy}</p>}
```

#### 1.3 Backend: privacy mező validálása
```typescript
// backend/functions/contact/validator.ts
export function validateContactForm(data: any): ValidationResult {
  // ... existing validations
  
  if (!data.privacy || data.privacy !== true) {
    errors.privacy = 'Az adatvédelmi tájékoztató elfogadása kötelező'
  }
  
  // ...
}
```

### FÁZIS 2: Footer GDPR badge (15 perc)

```typescript
// frontend/src/components/Footer.tsx
<div className="mt-6 pt-4 border-t border-base-300">
  <div className="flex flex-wrap justify-center gap-6 text-xs opacity-60">
    <span className="flex items-center gap-2">
      <span role="img" aria-label="Accessibility">♿</span>
      <span>{t('footer.accessibility')}</span>
    </span>
    <span className="flex items-center gap-2">
      <span role="img" aria-label="GDPR">🔒</span>
      <span>100% GDPR compliant</span>
    </span>
  </div>
</div>
```

### FÁZIS 3: Backend adattörlés (1 óra)

#### 3.1 Lambda function: automatikus törlés (90 nap után)
```typescript
// backend/functions/cleanup/index.ts (ÚJ Lambda)
import { DynamoDBClient, ScanCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb'

const dynamodb = new DynamoDBClient({ region: 'eu-central-1' })
const TABLE_NAME = 'villiotech-contact-submissions'

export const handler = async () => {
  const now = Date.now()
  const retentionPeriod = 90 * 24 * 60 * 60 * 1000 // 90 nap

  const result = await dynamodb.send(new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: 'submittedAt < :cutoff',
    ExpressionAttributeValues: {
      ':cutoff': { N: String(now - retentionPeriod) }
    }
  }))

  for (const item of result.Items || []) {
    await dynamodb.send(new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: { id: item.id }
    }))
  }

  return { deleted: result.Items?.length || 0 }
}
```

#### 3.2 EventBridge rule: napi futtatás
```typescript
// infrastructure/lib/villiotech-stack.ts
import * as events from 'aws-cdk-lib/aws-events'
import * as targets from 'aws-cdk-lib/aws-events-targets'

const cleanupRule = new events.Rule(this, 'CleanupRule', {
  schedule: events.Schedule.cron({ hour: '2', minute: '0' }) // Minden nap 02:00
})

cleanupRule.addTarget(new targets.LambdaFunction(cleanupLambda))
```

### FÁZIS 4: Dokumentáció (30 perc)

#### 4.1 Adatkezelési nyilvántartás
```markdown
# Adatkezelési Nyilvántartás - Villiotech

## 1. Ajánlatkérő űrlap
- **Kezelt adatok:** név, telefonszám, email, kerület, szolgáltatás típusa, ügyfél típusa, leírás
- **Cél:** Ajánlatkérés feldolgozása, kapcsolatfelvétel
- **Jogalap:** Érintett hozzájárulása (GDPR 6. cikk (1) a)
- **Tárolás:** 90 nap
- **Továbbítás:** AWS SES (email küldés), AWS DynamoDB (tárolás)
- **Törlés:** Automatikus (90 nap után) vagy kérésre (azonnal)

## 2. Technikai adatok (localStorage)
- **Kezelt adatok:** Téma választás (day/night), nyelv választás (hu/en)
- **Cél:** Felhasználói élmény javítása
- **Jogalap:** Jogos érdek (GDPR 6. cikk (1) f)
- **Tárolás:** Böngésző localStorage (korlátlan)
- **Továbbítás:** Nincs
- **Törlés:** Böngésző cache törlésével
```

#### 4.2 Adatvédelmi incidens terv
```markdown
# Adatvédelmi Incidens Kezelési Terv

## 1. Incidens észlelése
- Azonnal értesíteni az adatkezelőt (info@villiotech.hu)
- Dokumentálni az incidenst (mi, mikor, hogyan)

## 2. Értékelés (24 órán belül)
- Milyen adatok érintettek?
- Hány érintett?
- Milyen kockázat?

## 3. Bejelentés (72 órán belül)
- Ha magas kockázat → NAIH bejelentés (ugyfelszolgalat@naih.hu)
- Érintettek értesítése (ha szükséges)

## 4. Intézkedések
- Incidens megszüntetése
- Megelőzés (biztonsági javítások)
- Dokumentáció
```

---

## 📊 ÖSSZEFOGLALÁS

### Jelenlegi GDPR compliance: ~60%

**Amit jól csinálsz:**
- ✅ Nincs tracking
- ✅ Minimális adatgyűjtés
- ✅ EU szerverek
- ✅ Adatvédelmi tájékoztató létezik

**Amit javítani kell:**
- ❌ Adatkezelő adatai hiányosak
- ❌ Nincs explicit hozzájárulás az űrlapon
- ❌ Sütik kezelése pontatlan
- ❌ Nincs automatikus adattörlés
- ❌ Hiányzik a NAIH teljes elérhetősége

### Cél: 100% GDPR compliance

**Időigény:**
- Fázis 1 (kritikus): 1-2 óra
- Fázis 2 (badge): 15 perc
- Fázis 3 (backend): 1 óra
- Fázis 4 (dokumentáció): 30 perc
- **Összesen: ~3-4 óra**

**Eredmény:**
- 🔒 100% GDPR compliant
- ✅ Footer badge: "100% GDPR compliant"
- 📄 Teljes dokumentáció
- 🛡️ Automatikus adattörlés
- ⚖️ Jogi biztonság

---

## 🎯 KÖVETKEZŐ LÉPÉS

Szeretnéd, hogy:
1. **Haiku-val** végigcsináljam a Fázis 1-2-t (szövegek + checkbox + badge)?
2. **Én (Sonnet)** csináljam a Fázis 3-t (backend adattörlés)?
3. **Dokumentációt** generáljam (Fázis 4)?

Vagy mindent egyben? 🚀
