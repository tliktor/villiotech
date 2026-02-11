import { useTranslation } from 'react-i18next'
import { useSEO } from '../../hooks/useSEO'
import { getTranslationArray } from '../../utils/i18n'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

export default function Villanyszereles() {
  const { t } = useTranslation()
  const seo = useSEO('villanyszereles')
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/szolgaltatasok/villanyszereles"
        keywords={seo.keywords}
      />

      <Hero
        title={t('pages.villanyszereles.hero_title')}
        subtitle={t('pages.villanyszereles.hero_subtitle')}
        cta1={{ label: t('pages.villanyszereles.cta1'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.villanyszereles.cta2'), href: 'tel:+36302389945' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villanyszereles.services_title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTranslationArray(t('pages.villanyszereles.services', { returnObjects: true })).map((s: string, i: number) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary">⚡</span>
              <span>{s}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villanyszereles.promises_title')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {getTranslationArray<{title: string, desc: string}>(t('pages.villanyszereles.promises', { returnObjects: true })).map((p, i) => (
            <ThemeCard key={i}>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm opacity-70">{p.desc}</p>
            </ThemeCard>
          ))}
        </div>
        <p className="text-center mt-6 text-sm opacity-70">
          {t('pages.villanyszereles.disclaimer')}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villanyszereles.pricing_title')} />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={getTranslationArray(t('pages.villanyszereles.pricing_rows', { returnObjects: true }))}
            note={t('pages.villanyszereles.pricing_note')}
          />
        </div>
      </section>

      <CTASection
        title={t('pages.villanyszereles.cta_title')}
        cta1={{ label: t('pages.villanyszereles.cta_quote'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.villanyszereles.cta_call'), href: 'tel:+36302389945' }}
      />
    </>
  )
}
