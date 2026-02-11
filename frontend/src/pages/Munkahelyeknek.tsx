import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import { getTranslationArray } from '../utils/i18n'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import ProcessSteps from '../components/ProcessSteps'
import PricingTable from '../components/PricingTable'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import { ArrowRight, ClipboardList, Wrench, FileText, Receipt, Shield } from 'lucide-react'



const whyMe = [
  'Vizsgázott villamos biztonsági felülvizsgáló – villamosmérnöki végzettséggel',
  'Kalibrált műszerek – joghatályos mérési eredmények',
  'Kéziszerszám felülvizsgálat helyszínen – nem kell sehová vinni az eszközöket',
  'Joghatályos jegyzőkönyv – hatósági ellenőrzésnél azonnal bemutatható',
  'Tételes árajánlat – tervezhető költség',
  'ÁFÁ-s számla vállalkozásoknak',
  'Kártyás fizetés a helyszínen',
  '20 év multinacionális tapasztalat – pontosság, határidő-tartás',
]

const services = [
  { title: 'Villamos biztonsági felülvizsgálat', desc: 'Munkahelyeken 3 évente kötelező. Joghatályos jegyzőkönyv, amit hatósági ellenőrzésnél azonnal bemutathat.', to: '/szolgaltatasok/villamos-felulvizsgalat' },
  { title: 'Kéziszerszámok éves felülvizsgálata', desc: 'Helyszínen végzem, kalibrált műszerrel. Nem kell sehová szállítani az eszközöket.', to: '/szolgaltatasok/keziszerszam-felulvizsgalat' },
  { title: 'Villanyszerelés, bővítés, javítás', desc: 'Új konnektorok, világítás, biztosítéktábla csere, hálózat korszerűsítés.', to: '/szolgaltatasok/villanyszereles' },
  { title: 'IT hálózat – WiFi / UTP', desc: 'Irodai hálózat kiépítés, WiFi lefedettség optimalizálás.', to: '/szolgaltatasok/it-halozat' },
]

const steps = [
  { number: 1, title: 'Ajánlatkérés', description: 'Írja le, milyen szolgáltatásra van szüksége, hány eszközt kell ellenőrizni.' },
  { number: 2, title: 'Árajánlat', description: 'Tételes árajánlatot küldök, amit a cég döntéshozói is áttekinthetnek.' },
  { number: 3, title: 'Időpont-egyeztetés', description: 'Alkalmazkodok a nyitvatartáshoz – nyitás előtt, zárás után, hétvégén is.' },
  { number: 4, title: 'Helyszíni munka', description: 'Gyorsan és minimális fennakadással dolgozom.' },
  { number: 5, title: 'Dokumentáció', description: 'Joghatályos jegyzőkönyv, amit hatósági ellenőrzésnél azonnal bemutathat.' },
  { number: 6, title: 'Fizetés', description: 'Készpénz vagy bankkártya, ÁFÁ-s e-számla a helyszínen.' },
]

const deliverables = [
  { icon: ClipboardList, text: 'Joghatályos felülvizsgálati jegyzőkönyv' },
  { icon: Wrench, text: 'Kéziszerszám felülvizsgálati jegyzőkönyv' },
  { icon: FileText, text: 'Tételes árajánlat és elszámolás' },
  { icon: Receipt, text: 'ÁFÁ-s e-számla' },
  { icon: Shield, text: 'Garancia a munkára' },
]

const faqItems = [
  { question: 'Milyen gyakran kell munkahelyi villamos felülvizsgálatot végezni?', answer: 'Munkahelyeken a villamos hálózat felülvizsgálata 3 évente kötelező a hatályos jogszabályok szerint.' },
  { question: 'A kéziszerszám felülvizsgálat is kötelező?', answer: 'Igen, az elektromos kéziszerszámok és berendezések éves felülvizsgálata kötelező a munkavédelmi előírások szerint.' },
  { question: 'Milyen eszközöket kell felülvizsgáltatni?', answer: 'Minden elektromos kéziszerszámot: fúrógép, flex, hegesztő, hajszárító, hajvasaló, kávégép, kenyérpirító, keverőgép – bármi, ami hálózati áramról működik.' },
  { question: 'Helyszínen végzi a kéziszerszám felülvizsgálatot?', answer: 'Igen, kalibrált hordozható műszerrel a helyszínen végzem. Nem kell sehová szállítani az eszközöket.' },
  { question: 'Mennyi ideig tart?', answer: 'A villamos felülvizsgálat a terület méretétől függ. A kéziszerszám felülvizsgálat eszközönként néhány perc – egy átlagos fodrászat eszközeit 1-2 óra alatt ellenőrzöm.' },
  { question: 'Alkalmazkodik a nyitvatartáshoz?', answer: 'Igen, dolgozhatunk nyitás előtt, zárás után, vagy hétvégén is.' },
  { question: 'Mi történik, ha egy eszköz nem felel meg?', answer: 'Dokumentálom a jegyzőkönyvben, és jelzem, hogy az eszköz nem használható tovább, amíg nem javítják vagy cserélik.' },
  { question: 'Kapok ÁFÁ-s számlát?', answer: 'Igen, vállalkozásoknak ÁFÁ-s számlát állítok ki.' },
  { question: 'Mi a büntetés, ha nincs érvényes felülvizsgálat?', answer: 'Hatósági ellenőrzésnél bírságot szabhatnak ki, és súlyos esetben a tevékenység felfüggesztését is elrendelhetik.' },
]

export default function Munkahelyeknek() {
  const { t } = useTranslation()
  const seo = useSEO('munkahelyeknek')
  
  const pricingRows = [
    { label: t('common.pricing.callout_buda'), price: '10 000 Ft' },
    { label: t('common.pricing.callout_pest'), price: '20 000 Ft' },
    { label: t('common.pricing.urgent'), price: t('common.pricing.urgent_surcharge') },
  ]
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/munkahelyeknek"
        keywords={seo.keywords}
      />

      <Hero
        title={t('pages.munkahelyeknek.hero_title')}
        subtitle={t('pages.munkahelyeknek.hero_subtitle')}
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: 'Sürgős? 4 órán belül', href: 'tel:+36302389945' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.munkahelyeknek.target_section')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTranslationArray(t('pages.munkahelyeknek.bullets', { returnObjects: true })).map((b, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold">✓</span>
              <span>{b}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.munkahelyeknek.why_me_section')} />
        <ThemeCard hover={false}>
          <p className="mb-2 text-lg font-semibold">
            {t('pages.munkahelyeknek.why_me_intro_bold')}
          </p>
          <p className="mb-4 opacity-80">
            {t('pages.munkahelyeknek.why_me_intro')}
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
        <SectionTitle title={t('pages.munkahelyeknek.services_section')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Így dolgozunk együtt" />
        <ProcessSteps steps={steps} />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Átlátható árazás" />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={pricingRows}
            note={t('common.invoicing.vat_businesses')}
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
        title={t('pages.munkahelyeknek.cta_title')}
        subtitle={t('pages.munkahelyeknek.cta_subtitle')}
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Telefonos egyeztetés', href: 'tel:+36302389945' }}
      />
    </>
  )
}
