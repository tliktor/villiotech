# Villiotech.hu Playwright Teszt Hibák - Részletes Riport
**Dátum:** 2026-02-11 12:55
**Teszt URL:** https://www.villiotech.hu
**Eredmény:** 12 sikeres / 6 hibás

---

## 🔴 HIBA #1: Nyelv Perzisztencia
**Teszt:** Language Switching › language persists across pages
**Státusz:** FAILED
**Hiba típus:** Element not found

### Probléma
- Angol nyelvre váltás után a `/lakossagnak` oldalon nem jelenik meg a "For Residents" szöveg
- A teszt vár 5 másodpercig, de az elem nem található

### Technikai részletek
```
Locator: locator('text=For Residents')
Expected: visible
Timeout: 5000ms
Error: element(s) not found
```

### Valószínű ok
- Az angol fordítás kulcs (`nav.residents`) létezik, de az oldal címe/heading más kulcsot használ
- Vagy a localStorage nyelv beállítás nem perzisztálódik page navigation során

### Javasolt megoldás
1. Ellenőrizni kell a Lakossagnak.tsx oldal címét és hero szövegét
2. Megnézni hogy használja-e a helyes translation key-t
3. Tesztelni hogy a localStorage i18nextLng értéke megmarad-e

---

## 🔴 HIBA #2: Téma Váltás
**Teszt:** Theme Switching › theme switcher works
**Státusz:** FAILED (ÚJ HIBA!)
**Hiba típus:** Timeout (30s)

### Probléma
- A téma váltó gomb nem található vagy nem kattintható
- 30 másodperces timeout

### Technikai részletek
```
Locator: button[aria-label*="theme"]
Timeout: 30000ms
```

### Valószínű ok
- A téma váltó gomb aria-label attribútuma nem tartalmazza a "theme" szót
- Vagy a gomb nem látható/nem kattintható
- Lehet hogy a fordítási kulcs (nav.theme_toggle) nem kerül be az aria-label-be

### Javasolt megoldás
1. Ellenőrizni a Navbar.tsx téma váltó gombjának aria-label-jét
2. Megnézni hogy használja-e a t('nav.theme_toggle') kulcsot
3. Lehet hogy angol "theme" helyett magyar "téma" szót keres a teszt

---

## 🔴 HIBA #3: Form Validáció
**Teszt:** Contact Form › form validation works
**Státusz:** FAILED
**Hiba típus:** Strict mode violation

### Probléma
- Még mindig van duplikált hibaüzenet szöveg
- A teszt nem tudja egyértelműen azonosítani melyik mezőhöz tartozik a hiba

### Technikai részletek
```
Locator: locator('text=Kérem, töltse ki ezt a mezőt')
Error: strict mode violation - resolved to 2 elements
```

### Valószínű ok
- Bár a name és district mezők egyedi üzeneteket kaptak, más mezők még használják az általános üzenetet
- Vagy a böngésző beépített validációs üzenetei jelennek meg

### Javasolt megoldás
1. Minden kötelező mezőnek egyedi hibaüzenetet kell adni
2. Vagy a tesztet módosítani .first() használatára
3. Ellenőrizni hogy a noValidate attribútum be van-e állítva a form-on

---

## 🔴 HIBA #4: Service Detail CTA
**Teszt:** CTAs and Buttons › service detail CTAs work
**Státusz:** FAILED
**Hiba típus:** Timeout (30s)

### Probléma
- A "Részletek és ajánlatkérés" gomb nem található a főoldalon
- 30 másodperces timeout

### Technikai részletek
```
Locator: locator('text=Részletek és ajánlatkérés').first()
Timeout: 30000ms
```

### Valószínű ok
- A gomb szövege megváltozott vagy más translation key-t használ
- Vagy a gomb nem renderelődik a főoldalon
- Lehet hogy lazy loading miatt később jelenik meg

### Javasolt megoldás
1. Ellenőrizni a Home.tsx-ben a service card gombok szövegét
2. Megnézni a hu.json-ban a home.details_cta kulcsot
3. Lehet hogy "Ajánlatot kérek" vagy más szöveg van helyette

---

## 🔴 HIBA #5: Mobil Menü
**Teszt:** Mobile Compatibility › mobile menu works
**Státusz:** FAILED (JAVULT - gyorsabb)
**Hiba típus:** Element not found

### Probléma
- A mobil menü gomb nem található
- Aria-label nem tartalmazza a "Menü" szót

### Technikai részletek
```
Locator: button[aria-label*="Menü"]
Timeout: 30000ms (de gyorsabban fail-el most)
```

### Valószínű ok
- A nav.open_menu kulcs hozzá lett adva, de lehet hogy nem kerül be az aria-label-be
- Vagy a Navbar komponens nem használja ezt a kulcsot

### Javasolt megoldás
1. Ellenőrizni a Navbar.tsx mobil menü gombjának aria-label-jét
2. Biztosítani hogy t('nav.open_menu') legyen használva
3. Tesztelni mobil viewport-ban

---

## 🔴 HIBA #6: Skip to Main Content
**Teszt:** Accessibility › skip to main content link works
**Státusz:** FAILED
**Hiba típus:** Focus not working

### Probléma
- A skip-to-main link létezik, de nem kap focus-t Tab billentyűre
- Vagy a focus nem kerül át a main content-re kattintáskor

### Technikai részletek
```
Locator: locator('.skip-to-main')
Expected: focused
Received: inactive
```

### Valószínű ok
- A Layout.tsx-ben hozzáadott handleSkipToMain függvény nem működik helyesen
- Vagy a main elem tabIndex={-1} attribútuma hiányzik
- Vagy a CSS miatt a link nem kap focus-t

### Javasolt megoldás
1. Ellenőrizni hogy a skip link látható-e :focus állapotban
2. Tesztelni hogy a Tab billentyű tényleg rákattint-e
3. Ellenőrizni a main elem ref és tabIndex beállítását

---

## 📊 Összegzés

### Kritikusság szerinti csoportosítás

**🔥 Kritikus (azonnal javítandó):**
1. Nyelv perzisztencia - UX probléma
2. Téma váltás - alapvető funkció nem működik

**⚠️ Fontos (hamarosan javítandó):**
3. Form validáció - tesztelhetőségi probléma
4. Service CTA - konverziós elem hiányzik

**ℹ️ Alacsony prioritás:**
5. Mobil menü - működik, csak a teszt nem találja
6. Skip to main - accessibility feature, de nem kritikus

### Következő lépések
1. Screenshot-ok elemzése a test-results mappából
2. Trace fájlok megnyitása: `npx playwright show-trace test-results/.../trace.zip`
3. Hibák javítása prioritás szerint
4. Tesztek újrafuttatása
