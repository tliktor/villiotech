import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import ProcessSteps from '../components/ProcessSteps'
import PricingTable from '../components/PricingTable'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import { ArrowRight, ClipboardList, BarChart3, AlertTriangle, FileText, Receipt, Shield } from 'lucide-react'

const bullets = [
  'Közös képviselő és a társasház villamos felülvizsgálata esedékes',
  'Társasházi döntéshozó és a közgyűlés elé kell vinni az árajánlatot',
  'Hatósági felszólítást kapott a társasház villamos hálózatának ellenőrzésére',
  'Közös területek villanyszerelése szükséges (lépcsőház, pince, garázs)',
  'Biztosítási esemény miatt kell dokumentáció',
  'Felújítás előtt áll a társasház és felmérés kell',
]

const whyMe = [
  'Vizsgázott villamos biztonsági felülvizsgáló – villamosmérnöki végzettséggel',
  'Kalibrált műszerek – joghatályos mérési eredmények',
  'Tételes árajánlat – bemutatható a közgyűlésen',
  'Joghatályos jegyzőkönyv – hatóság előtt elfogadott',
  'ÁFA-mentes számlázás társasházaknak',
  '20 év multinacionális tapasztalat – pontosság, korrekt kommunikáció',
  'Garancia a munkára, magam után takarítok',
]

const steps = [
  { number: 1, title: 'Ajánlatkérés', description: 'Írja le a társasház adatait – lakásszám, hálózat kora, ismert problémák.' },
  { number: 2, title: 'Tételes árajánlat', description: 'Árajánlatot küldök, amit bemutathat a közgyűlésen.' },
  { number: 3, title: 'Időpont-egyeztetés', description: 'A közgyűlési döntés után egyeztetjük a helyszíni munka időpontját.' },
  { number: 4, title: 'Helyszíni felülvizsgálat', description: 'Elvégzem a méréseket a közös területeken, kalibrált műszerekkel.' },
  { number: 5, title: 'Jegyzőkönyv és javaslat', description: 'Joghatályos jegyzőkönyv az eredményekkel és javítási javaslatokkal.' },
  { number: 6, title: 'Javítás (opcionális)', description: 'Ha javítás szükséges, külön árajánlatot adok és elvégzem a munkát.' },
]

const deliverables = [
  { icon: ClipboardList, text: 'Joghatályos mérési jegyzőkönyv' },
  { icon: BarChart3, text: 'Részletes mérési eredmények' },
  { icon: AlertTriangle, text: 'Hibajegyzék és javítási javaslat' },
  { icon: FileText, text: 'Tételes árajánlat a közgyűléshez' },
  { icon: Receipt, text: 'ÁFA-mentes számla' },
  { icon: Shield, text: 'Garancia a munkára' },
]

const faqItems = [
  { question: 'Milyen gyakran kell társasházi villamos felülvizsgálatot végezni?', answer: 'A hatályos jogszabályok szerint a társasházak villamos hálózatát rendszeresen felül kell vizsgálni. A pontos periódust a hálózat kora és típusa határozza meg.' },
  { question: 'A közgyűlésnek kell döntenie a felülvizsgálatról?', answer: 'Általában igen. Ezért adok tételes árajánlatot, amit bemutathat a közgyűlésen a döntéshozatalhoz.' },
  { question: 'Mennyi ideig tart egy társasházi felülvizsgálat?', answer: 'Egy kisebb társasháznál (6-10 lakás) jellemzően fél-egy nap, nagyobbaknál több nap is lehet.' },
  { question: 'A jegyzőkönyvet elfogadja a hatóság?', answer: 'Igen. Vizsgázott villamos biztonsági felülvizsgálóként, kalibrált műszerekkel végzem a méréseket – a jegyzőkönyv joghatályos.' },
  { question: 'Mi történik, ha hibát talál?', answer: 'Dokumentálom a jegyzőkönyvben, és javaslatot teszek a javításra. A javítást is el tudom végezni, külön árajánlat alapján.' },
  { question: 'Hogyan számláznak társasházaknak?', answer: 'Társasházaknak ÁFA-mentes számlát állítok ki.' },
  { question: 'Csak a közös területeket vizsgálja, vagy a lakásokat is?', answer: 'A társasházi felülvizsgálat a közös területekre vonatkozik. Az egyes lakások felülvizsgálatát külön, a lakástulajdonossal egyeztetve végzem.' },
  { question: 'Budán kívül is vállal társasházi munkát?', answer: 'Fő területem Buda. Pesten kivételesen vállalok munkát, 20 000 Ft kiszállási díjjal.' },
]

export default function Tarsashazaknak() {
  return (
    <>
      <SEO
        title="Társasházaknak – villamos felülvizsgálat, közös területek"
        description="Társasházi villamos felülvizsgálat joghatályos jegyzőkönyvvel, tételes árajánlattal a közgyűléshez. ÁFA-mentes számlázás, Budán."
        canonical="/tarsashazaknak"
      />

      <Hero
        subtitle="Közös képviselőként Ön felel a lakók biztonságáért. Elvégzem a kötelező villamos biztonsági felülvizsgálatot, joghatályos jegyzőkönyvvel, tételes árajánlattal a közgyűléshez."
        cta1={{ label: 'Ajánlatot kérek a közgyűléshez', to: '/kapcsolat' }}
        cta2={{ label: 'Visszahívást kérek', to: '/kapcsolat' }}
      />

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

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Miért engem válasszon?" />
        <ThemeCard hover={false}>
          <p className="mb-4 opacity-80">
            Tudom, hogy közös képviselőként Önnek a közgyűlés felé is el kell számolnia. Ezért adok tételes árajánlatot, amit bemutathat a lakóközösségnek, és joghatályos jegyzőkönyvet, amit a hatóság elfogad.
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

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Így dolgozunk együtt" />
        <ProcessSteps steps={steps} />
      </section>

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
            note="Társasházaknak ÁFA-mentes számlát állítok ki."
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Mit kap kézhez?" />
        <ThemeCard hover={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <d.icon className="w-6 h-6 text-primary shrink-0" />
                <span className="text-sm font-medium">{d.text}</span>
              </div>
            ))}
          </div>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Gyakori kérdések" />
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
      </section>

      <CTASection
        title="Kérjen árajánlatot a közgyűléshez"
        subtitle="Tételes árajánlatot küldök, amit bemutathat a lakóközösségnek."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Telefonos egyeztetés', href: 'tel:+36302389945' }}
      />
    </>
  )
}
