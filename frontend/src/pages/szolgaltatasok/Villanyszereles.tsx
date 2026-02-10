import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

const services = [
  'Kapcsolók, konnektorok cseréje, bővítése',
  'Világítás szerelés, csillárok felszerelése',
  'Biztosítéktábla csere, korszerűsítés',
  'Teljes lakás vagy iroda villanyszerelés',
  'Villamos hálózat bővítés, átalakítás',
  'Hibaelhárítás, zárlat keresés',
  'Kültéri világítás, kerti elektromos hálózat',
  'Társasházi közös területek villanyszerelése',
]

const promises = [
  { title: 'Tételes árajánlat', desc: 'A munka megkezdése előtt, írásban.' },
  { title: 'Pontos érkezés', desc: 'A megbeszélt időpontban.' },
  { title: 'Szakszerű kivitelezés', desc: 'Villamosmérnöki tudással.' },
  { title: 'Tiszta munkavégzés', desc: 'Magam után takarítok.' },
  { title: 'Garancia', desc: 'Minden elvégzett munkára.' },
  { title: 'Kártyás fizetés', desc: 'A helyszínen.' },
]

export default function Villanyszereles() {
  return (
    <>
      <SEO
        title="Villanyszerelés Budán – mérnöki precizitással"
        description="Villanyszerelés, javítás, kivitelezés Budán. Kapcsolócsere, biztosítéktábla, teljes lakás villanyszerelés. Tételes árajánlat, garancia."
        canonical="/szolgaltatasok/villanyszereles"
      />

      <Hero
        subtitle="Kapcsolócsere, biztosítéktábla, teljes lakás villanyszerelés. Tételes árajánlat, tiszta munkavégzés, garancia minden munkára."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: 'Sürgős? 4 órán belül', href: 'tel:+36000000000' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Villanyszerelési szolgáltatásaim" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary">⚡</span>
              <span>{s}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Amire számíthat" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promises.map((p, i) => (
            <ThemeCard key={i}>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm opacity-70">{p.desc}</p>
            </ThemeCard>
          ))}
        </div>
        <p className="text-center mt-6 text-sm opacity-70">
          Bontás előfordulhat a munka során. Festést nem vállalok, de ajánlok megbízható festő szakembert.
        </p>
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
            note="A végleges árat a munka jellege és terjedelme határozza meg."
          />
        </div>
      </section>

      <CTASection
        title="Kérjen ajánlatot villanyszerelésre"
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36000000000' }}
      />
    </>
  )
}
