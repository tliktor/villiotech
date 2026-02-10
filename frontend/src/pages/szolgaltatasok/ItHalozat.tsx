import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

const services = [
  'UTP kábelezés – Cat5e / Cat6 hálózati kábel fektetés, csatlakozók szerelése',
  'WiFi lefedettség – access point-ok telepítése, optimális elhelyezés',
  'Otthoni iroda (home office) – stabil, megbízható hálózat a távmunkához',
  'Irodai hálózat – több munkaállomás bekötése, hálózati infrastruktúra',
  'Hálózati szekrény – patch panel, switch elhelyezés, rendezett kábelezés',
]

const forWhom = [
  'Külföldi rezidensek Budán – akik angolul szeretnék intézni a hálózat kiépítést',
  'Home office dolgozók – akiknek stabil, gyors internet kell a munkához',
  'Kis irodák – ahol több gép megbízható hálózati kapcsolata szükséges',
  'Új lakás / felújítás – ahol az alapoktól kell kiépíteni a hálózatot',
]

export default function ItHalozat() {
  return (
    <>
      <SEO
        title="IT hálózat – WiFi és UTP kiépítés Budán"
        description="UTP kábelezés, WiFi lefedettség optimalizálás, otthoni iroda hálózat. Angol nyelven is. Budán."
        canonical="/szolgaltatasok/it-halozat"
      />

      <Hero
        subtitle="UTP kábelezés, WiFi lefedettség optimalizálás, otthoni iroda hálózat kiépítés. Teljes szolgáltatás angol nyelven is."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: 'Request a quote in English', to: '/kapcsolat' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="IT hálózati szolgáltatásaim" />
        <div className="space-y-4">
          {services.map((s, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary">🔌</span>
              <span>{s}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Kinek ajánlom?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forWhom.map((item, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>{item}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* English section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ThemeCard hover={false} className="text-center">
          <h2 className="text-2xl font-bold mb-3">IT Network Services in English</h2>
          <p className="opacity-80 mb-6 max-w-xl mx-auto">
            Setting up your home office or need reliable WiFi coverage in your Buda apartment? I provide complete IT networking services in fluent English – from UTP cabling to WiFi optimization. Clean installation, tested connections, full documentation.
          </p>
          <Link to="/kapcsolat" className="btn btn-primary">Request a quote →</Link>
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
            note="A végleges árat a hálózat mérete és összetettsége határozza meg."
          />
        </div>
      </section>

      <CTASection
        title="Kérjen ajánlatot hálózat kiépítésre"
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36302389945' }}
      />
    </>
  )
}
