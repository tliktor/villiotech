import { useTranslation } from 'react-i18next'
import { useSEO } from '../../hooks/useSEO'
import { getTranslationArray } from '../../utils/i18n'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

export default function VillamosFelulvizsgalat() {
  const { t } = useTranslation()
  const seo = useSEO('villamosFelulvizsgalat')
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/szolgaltatasok/villamos-felulvizsgalat"
        keywords={seo.keywords}
      />

      <Hero
        title={t('pages.villamos_felulvizsgalat.hero_title')}
        subtitle={t('pages.villamos_felulvizsgalat.hero_subtitle')}
        cta1={{ label: t('pages.villamos_felulvizsgalat.cta1'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.villamos_felulvizsgalat.cta2'), to: '/kapcsolat' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villamos_felulvizsgalat.when_needed_title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTranslationArray<string>(t('pages.villamos_felulvizsgalat.when_needed', { returnObjects: true })).map((item, i) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>{item}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villamos_felulvizsgalat.what_we_check_title')} />
        <ThemeCard hover={false}>
          <ul className="space-y-3">
            {getTranslationArray<string>(t('pages.villamos_felulvizsgalat.what_we_check', { returnObjects: true })).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm opacity-70 italic">{t('pages.villamos_felulvizsgalat.calibrated_note')}</p>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villamos_felulvizsgalat.results_title')} />
        <ThemeCard hover={false}>
          <ul className="space-y-3">
            {getTranslationArray<string>(t('pages.villamos_felulvizsgalat.results', { returnObjects: true })).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-success">📋</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.villamos_felulvizsgalat.pricing_title')} />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={getTranslationArray(t('pages.villamos_felulvizsgalat.pricing_rows', { returnObjects: true }))}
            note={t('pages.villamos_felulvizsgalat.pricing_note')}
          />
        </div>
      </section>

      <CTASection
        title={t('pages.villamos_felulvizsgalat.cta_title')}
        cta1={{ label: t('pages.villamos_felulvizsgalat.cta_quote'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.villamos_felulvizsgalat.cta_call'), href: 'tel:+36302389945' }}
      />
    </>
  )
}
