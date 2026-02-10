import SEO from '../components/SEO'
import ThemeCard from '../components/ThemeCard'

export default function ASZF() {
  return (
    <>
      <SEO
        title="Általános Szerződési Feltételek"
        description="A Villiotech általános szerződési feltételei – szolgáltatások, árazás, garancia, felelősség."
        canonical="/aszf"
      />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Általános Szerződési Feltételek</h1>

        <ThemeCard hover={false} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Szolgáltató adatai</h2>
            <p className="opacity-80">
              Név: [Szolgáltató neve]<br />
              Székhely: Budapest, [cím]<br />
              Adószám: [adószám]<br />
              E-mail: info@villiotech.hu
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Szolgáltatások</h2>
            <p className="opacity-80">
              A Szolgáltató az alábbi szolgáltatásokat nyújtja: villamos biztonsági felülvizsgálat, villanyszerelés, IT hálózat kiépítés, elektromos kéziszerszámok felülvizsgálata. A szolgáltatások részletes leírása a weboldalon található.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Árazás és fizetés</h2>
            <ul className="list-disc pl-6 opacity-80 space-y-1">
              <li>Kiszállási díj Buda: 10 000 Ft</li>
              <li>Kiszállási díj Pest (kivételesen): 20 000 Ft</li>
              <li>Minimum munkadíj: 50 000 Ft</li>
              <li>Sürgős kiszállás (4 órán belül): +50% felár</li>
              <li>A végleges árat tételes árajánlat tartalmazza</li>
              <li>Fizetés: készpénz vagy bankkártya, a helyszínen</li>
              <li>Számlázás: magánszemélyeknek ÁFA-mentes, vállalkozásoknak ÁFÁ-s, társasházaknak ÁFA-mentes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Megrendelés és időpont</h2>
            <p className="opacity-80">
              A megrendelés az ajánlatkérő űrlap kitöltésével vagy telefonos egyeztetéssel indul. A Szolgáltató 1 munkanapon belül visszajelez. Az időpont közös egyeztetés alapján kerül meghatározásra.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Garancia</h2>
            <p className="opacity-80">
              A Szolgáltató garanciát vállal minden elvégzett munkára. A garancia feltételeit és időtartamát a tételes árajánlat tartalmazza.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Felelősség</h2>
            <p className="opacity-80">
              A Szolgáltató felelősséget vállal a szakszerűen elvégzett munkáért. Bontás szükségessége esetén a Szolgáltató előzetesen tájékoztatja a Megrendelőt. Festési munkákat a Szolgáltató nem vállal, de ajánl szakembert.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Lemondás</h2>
            <p className="opacity-80">
              Az egyeztetett időpont lemondása legalább 24 órával előtte szükséges. Későbbi lemondás esetén a kiszállási díj felszámításra kerülhet.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Jogviták</h2>
            <p className="opacity-80">
              A felek a vitás kérdéseket elsősorban egyeztetés útján rendezik. Ennek sikertelensége esetén a magyar bíróságok illetékesek.
            </p>
          </div>

          <p className="text-sm opacity-50">Hatályos: 2026. február</p>
        </ThemeCard>
      </section>
    </>
  )
}
