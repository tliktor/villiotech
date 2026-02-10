import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

const whenNeeded = [
  'Ingatlan eladás vagy bérbeadás előtt',
  'Felújítás, villanyszerelési munka után',
  'Munkahelyeken 3 évente (kötelező)',
  'Társasházak közös hálózatánál (rendszeres)',
  'Biztosítási esemény dokumentálásához',
  'Hatósági felszólításra',
]

const whatWeCheck = [
  'Érintésvédelmi mérés',
  'Szigetelési ellenállás mérés',
  'Rövidzárlati hurokimpedancia mérés',
  'Védővezetők folytonosságának ellenőrzése',
  'Túláramvédelmi eszközök működésének vizsgálata',
  'Szemrevételezéses ellenőrzés (vezetékek, csatlakozások, elosztók)',
]

const results = [
  'Joghatályos mérési jegyzőkönyv – hatóság, közjegyző, biztosító előtt elfogadott',
  'Részletes mérési eredmények – minden mérési pont dokumentálva',
  'Minősítés – a hálózat megfelel vagy nem felel meg',
  'Hibajegyzék – ha van, a feltárt hibák listája',
  'Javítási javaslat – mit kell kijavítani a megfelelőséghez',
]

export default function VillamosFelulvizsgalat() {
  return (
    <>
      <SEO
        title="Villamos biztonsági felülvizsgálat – joghatályos jegyzőkönyv"
        description="Villamos biztonsági felülvizsgálat kalibrált műszerekkel, joghatályos jegyzőkönyvvel. Lakásoknak, társasházaknak, munkahelyeknek. Budán."
        canonical="/szolgaltatasok/villamos-felulvizsgalat"
      />

      <Hero
        subtitle="Kalibrált műszerekkel végzett mérések, hatóság előtt elfogadott dokumentáció. Lakásoknak, társasházaknak és munkahelyeknek egyaránt."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: 'Visszahívást kérek', to: '/kapcsolat' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Mikor van szükség villamos biztonsági felülvizsgálatra?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whenNeeded.map((item, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>{item}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Mit tartalmaz a felülvizsgálat?" />
        <ThemeCard hover={false}>
          <ul className="space-y-3">
            {whatWeCheck.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm opacity-70 italic">Minden mérést kalibrált, hitelesített műszerekkel végzek. Az eredmények joghatályosak.</p>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="A felülvizsgálat eredménye" />
        <ThemeCard hover={false}>
          <ul className="space-y-3">
            {results.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-success">📋</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Árazás" />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={[
              { label: 'Kiszállás – Buda', price: '10 000 Ft' },
              { label: 'Kiszállás – Pest (kivételesen)', price: '20 000 Ft' },
              { label: 'Minimum munkadíj', price: '50 000 Ft' },
              { label: 'Sürgős (4 órán belül)', price: '+50% felár' },
            ]}
            note="A végleges ár az ingatlan méretétől és a hálózat összetettségétől függ."
          />
        </div>
      </section>

      <CTASection
        title="Kérjen ajánlatot villamos felülvizsgálatra"
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36000000000' }}
      />
    </>
  )
}
