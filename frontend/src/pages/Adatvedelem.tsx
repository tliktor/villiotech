import SEO from '../components/SEO'
import ThemeCard from '../components/ThemeCard'

export default function Adatvedelem() {
  return (
    <>
      <SEO
        title="Adatvédelmi tájékoztató"
        description="A Villiotech adatvédelmi tájékoztatója – személyes adatok kezelése, jogok, kapcsolat."
        canonical="/adatvedelem"
      />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Adatvédelmi tájékoztató</h1>

        <ThemeCard hover={false} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Adatkezelő</h2>
            <p className="opacity-80">
              Név: [Adatkezelő neve]<br />
              Székhely: Budapest, [cím]<br />
              E-mail: info@villiotech.hu<br />
              Telefon: [telefonszám]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Kezelt személyes adatok</h2>
            <p className="opacity-80">Az ajánlatkérő űrlap kitöltésekor az alábbi adatokat kezeljük:</p>
            <ul className="list-disc pl-6 mt-2 opacity-80 space-y-1">
              <li>Név</li>
              <li>Telefonszám</li>
              <li>E-mail cím (opcionális)</li>
              <li>Ingatlan/munkahely címe (kerület)</li>
              <li>A megkeresés tartalma</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Adatkezelés célja és jogalapja</h2>
            <p className="opacity-80">
              Az adatkezelés célja az ajánlatkérés feldolgozása és a kapcsolatfelvétel. Jogalap: az érintett hozzájárulása (GDPR 6. cikk (1) a) pont).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Adatkezelés időtartama</h2>
            <p className="opacity-80">
              A személyes adatokat az ajánlatkérés feldolgozásáig, de legfeljebb 1 évig tároljuk. Az érintett bármikor kérheti adatai törlését.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Adattovábbítás</h2>
            <p className="opacity-80">
              Személyes adatait harmadik félnek nem adjuk tovább. Az adatok az Amazon Web Services (AWS) EU-s szerverein kerülnek tárolásra és feldolgozásra.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Sütik (cookie-k)</h2>
            <p className="opacity-80">
              A weboldal technikai sütiket használ a működéshez (témaválasztás). Analitikai sütiket (Google Analytics) csak az Ön hozzájárulásával használunk.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Az érintett jogai</h2>
            <ul className="list-disc pl-6 opacity-80 space-y-1">
              <li>Hozzáférés joga – tájékoztatást kérhet a kezelt adatairól</li>
              <li>Helyesbítés joga – kérheti adatai javítását</li>
              <li>Törlés joga – kérheti adatai törlését</li>
              <li>Hozzájárulás visszavonása – bármikor, a korábbi adatkezelés jogszerűségének érintése nélkül</li>
              <li>Panasztétel joga – a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Kapcsolat</h2>
            <p className="opacity-80">
              Adatvédelmi kérdéseivel forduljon hozzánk: info@villiotech.hu
            </p>
          </div>

          <p className="text-sm opacity-50">Utolsó frissítés: 2026. február</p>
        </ThemeCard>
      </section>
    </>
  )
}
