import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import ProcessSteps from '../../components/ProcessSteps'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

const industries = [
  'Fodrászatok, szépségszalonok – hajszárító, hajvasaló, hajgöndörítő',
  'Vendéglátóhelyek – kávégép, mixer, kenyérpirító, szeletelő',
  'Műhelyek – fúrógép, flex, csiszológép, hegesztő',
  'Irodák – nyomtató, lamináló, iratmegsemmisítő',
  'Rendelők – sterilizáló, elektromos berendezések',
  'Takarítócégek – porszívó, gőztisztító',
]

const steps = [
  { number: 1, title: 'Eszközlista', description: 'Ön megadja, hány és milyen eszközt kell ellenőrizni.' },
  { number: 2, title: 'Időpont', description: 'Egyeztetünk egy időpontot, ami Önnek megfelel.' },
  { number: 3, title: 'Helyszíni mérés', description: 'Kalibrált hordozható műszerrel ellenőrzöm az eszközöket a helyszínen.' },
  { number: 4, title: 'Jegyzőkönyv', description: 'Minden eszközről külön jegyzőkönyvet kap, „megfelelt" vagy „nem felelt meg" minősítéssel.' },
]

const whatWeCheck = [
  'Védővezetők folytonossága',
  'Szigetelési ellenállás',
  'Érintésvédelmi vizsgálat',
  'Szemrevételezés (kábel, csatlakozó, ház állapota)',
]

export default function KeziszerszamFelulvizsgalat() {
  return (
    <>
      <SEO
        title="Kéziszerszám felülvizsgálat helyszínen"
        description="Elektromos kéziszerszámok éves felülvizsgálata helyszínen, kalibrált műszerrel. Fodrászat, vendéglátás, műhely. Budán."
        canonical="/szolgaltatasok/keziszerszam-felulvizsgalat"
      />

      <Hero
        subtitle="Az elektromos kéziszerszámok éves felülvizsgálata kötelező. Helyszínen végzem, nem kell sehová szállítani az eszközöket."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: 'Visszahívást kérek', to: '/kapcsolat' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Kinek kötelező?" />
        <p className="text-center mb-8 opacity-80">Minden munkáltatónak és egyéni vállalkozónak, aki elektromos kéziszerszámokat használ. Évente egyszer kötelező.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industries.map((item, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary">🔧</span>
              <span>{item}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Hogyan zajlik a felülvizsgálat?" />
        <ProcessSteps steps={steps} />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Mit mér a felülvizsgálat?" />
        <ThemeCard hover={false}>
          <ul className="space-y-3">
            {whatWeCheck.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">⚡</span>
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
            ]}
            note="Az ár az eszközök számától függ. Nagyobb mennyiségnél kedvezőbb egységár."
          />
        </div>
      </section>

      <CTASection
        title="Kérjen ajánlatot kéziszerszám felülvizsgálatra"
        subtitle="Helyszínen végzem, nem kell sehová vinni az eszközöket."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36000000000' }}
      />
    </>
  )
}
