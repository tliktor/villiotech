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
import DeliverablesList from '../components/DeliverablesList'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import { ArrowRight } from 'lucide-react'

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
  const { t } = useTranslation()
  const seo = useSEO('lakossagnak')
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/lakossagnak"
        keywords={seo.keywords}
      />

      <Hero
        subtitle={t('pages.lakossagnak.hero_subtitle')}
        cta1={{ label: t('home.hero.cta1'), to: '/kapcsolat' }}
        cta2={{ label: 'Visszahívást kérek', to: '/kapcsolat' }}
      />

      {/* Kinek szól */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.lakossagnak.target_section')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTranslationArray(t('pages.lakossagnak.bullets', { returnObjects: true })).map((b, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold">✓</span>
              <span>{b}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* Miért én */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.lakossagnak.why_me_section')} />
        <ThemeCard hover={false}>
          <p className="mb-2 text-lg font-semibold">
            {t('pages.lakossagnak.why_me_intro_bold')}
          </p>
          <p className="mb-4 opacity-80">
            {t('pages.lakossagnak.why_me_intro')}
          </p>
          <ul className="space-y-2">
            {getTranslationArray(t('pages.lakossagnak.why_me_points', { returnObjects: true })).map((item, i) => (
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
        <SectionTitle title={t('pages.lakossagnak.services_section')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getTranslationArray(t('pages.lakossagnak.services', { returnObjects: true })).map((s, i) => (
            <ThemeCard key={i} className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm opacity-70 mb-4">{s.desc}</p>
              </div>
              <Link to={`/szolgaltatasok/${i === 0 ? 'villamos-felulvizsgalat' : i === 1 ? 'villanyszereles' : 'it-halozat'}`} className="btn btn-sm btn-ghost text-primary gap-1 self-start">
                Részletek <ArrowRight className="w-4 h-4" />
              </Link>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* Folyamat */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.lakossagnak.process_section')} />
        <ProcessSteps steps={getTranslationArray(t('pages.lakossagnak.process_steps', { returnObjects: true })).map((step, i) => ({ number: i + 1, ...step }))} />
      </section>

      {/* Árazás */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.lakossagnak.pricing_section')} />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={[
              { label: 'Kiszállás – Buda', price: '10 000 Ft' },
              { label: 'Kiszállás – Pest (kivételesen)', price: '20 000 Ft' },
              { label: 'Minimum munkadíj', price: '50 000 Ft' },
              { label: 'Sürgős (4 órán belül)', price: '+50% felár' },
            ]}
            note={t('pages.lakossagnak.pricing_note')}
          />
        </div>
      </section>

      {/* Mit kap kézhez */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.lakossagnak.deliverables_section')} />
        <DeliverablesList />
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.lakossagnak.faq_section')} />
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
      </section>

      <CTASection
        title={t('pages.lakossagnak.cta_title')}
        subtitle={t('pages.lakossagnak.cta_subtitle')}
        cta1={{ label: t('home.hero.cta1'), to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36302389945' }}
      />
    </>
  )
}
