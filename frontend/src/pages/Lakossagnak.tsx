import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import ProcessSteps from '../components/ProcessSteps'
import PricingTable from '../components/PricingTable'
import DeliverablesList from '../components/DeliverablesList'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import { ArrowRight } from 'lucide-react'

const bullets = [
  'Eladja az ingatlanát – a vevő vagy a közjegyző kéri a villamos biztonsági felülvizsgálatot',
  'Bérbe adja a lakását – a bérlő és a biztosító is elvárja az érvényes jegyzőkönyvet',
  'Felújítás után van – az új villamos hálózatot dokumentálni kell',
  'Villanyszerelőt keres – kapcsoló, konnektor, biztosíték, elosztó, világítás',
  'WiFi vagy hálózat kell – otthoni iroda, home office, stabil internetkapcsolat',
  'Külföldi és angolul beszél – teljes körű szolgáltatás angol nyelven is',
]

const whyMe = [
  'Kalibrált, hitelesített műszerekkel dolgozom – a mérések joghatályosak',
  'Joghatályos jegyzőkönyvet kap, amit a hatóság, közjegyző, biztosító elfogad',
  'Tételes árajánlatot adok a munka megkezdése előtt',
  'Garanciát vállalok minden elvégzett munkára',
  'Magam után takarítok – a munkaterületet tisztán hagyom',
  'Kártyás fizetés a helyszínen',
  'Magánszemélyeknek ÁFA-mentes számla',
]

const services = [
  { title: 'Villamos biztonsági felülvizsgálat', desc: 'Ingatlan eladás vagy bérbeadás előtt kötelező. Kalibrált műszerekkel végzem, joghatályos jegyzőkönyvet kap kézhez.', to: '/szolgaltatasok/villamos-felulvizsgalat' },
  { title: 'Villanyszerelés, javítás, kivitelezés', desc: 'Kapcsolócsere, konnektor, biztosítéktábla, világítás, teljes lakás villanyszerelés. Tételes árajánlat, garancia.', to: '/szolgaltatasok/villanyszereles' },
  { title: 'IT hálózat – WiFi / UTP', desc: 'Otthoni iroda, home office, stabil WiFi lefedettség. Különösen ajánlom külföldi ügyfeleknek.', to: '/szolgaltatasok/it-halozat' },
]

const steps = [
  { number: 1, title: 'Ajánlatkérés', description: 'Írja le röviden, mire van szüksége – az űrlapon vagy telefonon.' },
  { number: 2, title: 'Egyeztetés', description: 'Visszajelzek, egyeztetjük az időpontot és a részleteket.' },
  { number: 3, title: 'Helyszíni munka', description: 'Megérkezem pontosan, elvégzem a méréseket vagy a szerelési munkát.' },
  { number: 4, title: 'Dokumentáció', description: 'Joghatályos jegyzőkönyvet vagy tételes elszámolást és garanciajegyet kap.' },
  { number: 5, title: 'Fizetés', description: 'Készpénzzel vagy bankkártyával, a helyszínen. Számlát azonnal kiállítom.' },
]

const faqItems = [
  { question: 'Mikor kell villamos biztonsági felülvizsgálat?', answer: 'Ingatlan eladás vagy bérbeadás előtt, felújítás/javítás után, illetve ha a biztosító vagy hatóság kéri. Lakóingatlanoknál nincs kötelező periódus, de ajánlott 6 évente elvégeztetni.' },
  { question: 'Mennyi ideig tart egy felülvizsgálat?', answer: 'Egy átlagos lakásnál 1-2 óra, a hálózat méretétől és állapotától függően.' },
  { question: 'A jegyzőkönyvet elfogadja a közjegyző / ügyvéd / biztosító?', answer: 'Igen. Joghatályos, kalibrált műszerekkel végzett méréseken alapuló jegyzőkönyvet állítok ki, amit minden hatóság és intézmény elfogad.' },
  { question: 'Mi történik, ha a felülvizsgálat hibát talál?', answer: 'Dokumentálom a hibát a jegyzőkönyvben, és javaslatot teszek a javításra. A javítást is el tudom végezni, külön megállapodás szerint.' },
  { question: 'Mennyibe kerül egy felülvizsgálat?', answer: 'A minimum munkadíj 50 000 Ft + kiszállás (Buda: 10 000 Ft). A pontos árat az ingatlan mérete és a hálózat összetettsége határozza meg.' },
  { question: 'Kártyával is fizethetek?', answer: 'Igen, bankkártyás fizetés elérhető a helyszínen.' },
  { question: 'Kapok számlát?', answer: 'Igen, magánszemélyeknek ÁFA-mentes számlát állítok ki a helyszínen.' },
  { question: 'Festést is vállal?', answer: 'Festést nem, de ha a munka során bontás szükséges, ajánlok megbízható festő szakembert.' },
  { question: 'Angolul is tud szolgáltatást nyújtani?', answer: 'Igen, folyékonyan beszélek angolul. A teljes szolgáltatás elérhető angol nyelven.' },
  { question: 'Pesten is vállal munkát?', answer: 'Kivételesen igen, 20 000 Ft kiszállási díjjal. Fő szolgáltatási területem Budapest Buda oldala.' },
]

export default function Lakossagnak() {
  return (
    <>
      <SEO
        title="Lakosságnak – villamos felülvizsgálat, szerelés, IT hálózat"
        description="Eladás, bérbeadás vagy felújítás előtt áll? Villamos biztonsági felülvizsgálat joghatályos jegyzőkönyvvel, villanyszerelés garanciával, IT hálózat – Budán."
        canonical="/lakossagnak"
      />

      <Hero
        subtitle="Eladás, bérbeadás vagy felújítás előtt áll? Villamos biztonsági felülvizsgálat joghatályos jegyzőkönyvvel, villanyszerelés garanciával, IT hálózat kiépítés – egy megbízható mérnöktől."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: 'Visszahívást kérek', to: '/kapcsolat' }}
      />

      {/* Kinek szól */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Önnek szól, ha…" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bullets.map((b, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold">✓</span>
              <span>{b}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* Miért én */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Miért engem válasszon?" />
        <ThemeCard hover={false}>
          <p className="mb-4 opacity-80">
            Képzett villamosmérnök vagyok – nem „csak" villanyszerelő. Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. 20 évet dolgoztam multinacionális környezetben, ahol a pontosság és a felelősség nem opció, hanem alapelvárás volt.
          </p>
          <ul className="space-y-2">
            {whyMe.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-success">✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ThemeCard>
      </section>

      {/* Szolgáltatások */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Szolgáltatásaim lakosságnak" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ThemeCard key={i} className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm opacity-70 mb-4">{s.desc}</p>
              </div>
              <Link to={s.to} className="btn btn-sm btn-ghost text-primary gap-1 self-start">
                Részletek <ArrowRight className="w-4 h-4" />
              </Link>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* Folyamat */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Így dolgozunk együtt" />
        <ProcessSteps steps={steps} />
      </section>

      {/* Árazás */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Átlátható árazás" />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={[
              { label: 'Kiszállás – Buda', price: '10 000 Ft' },
              { label: 'Kiszállás – Pest (kivételesen)', price: '20 000 Ft' },
              { label: 'Minimum munkadíj', price: '50 000 Ft' },
              { label: 'Sürgős (4 órán belül)', price: '+50% felár' },
            ]}
            note="Magánszemélyeknek ÁFA-mentes számlát állítok ki."
          />
        </div>
      </section>

      {/* Mit kap kézhez */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Mit kap kézhez?" />
        <DeliverablesList />
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Gyakori kérdések" />
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
      </section>

      <CTASection
        title="Kérjen ajánlatot"
        subtitle="Válaszolok 1 munkanapon belül. Budán dolgozom, kalibrált műszerekkel, garanciával."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36000000000' }}
      />
    </>
  )
}
