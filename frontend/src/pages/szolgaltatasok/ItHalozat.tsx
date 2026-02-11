import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../../hooks/useSEO'
import { getTranslationArray } from '../../utils/i18n'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'

export default function ItHalozat() {
  const { t } = useTranslation()
  const seo = useSEO('itHalozat')
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/szolgaltatasok/it-halozat"
        keywords={seo.keywords}
      />

      <Hero
        title={t('pages.it_halozat.hero_title')}
        subtitle={t('pages.it_halozat.hero_subtitle')}
        cta1={{ label: t('pages.it_halozat.hero_cta1'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.it_halozat.hero_cta2'), to: '/kapcsolat' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.it_halozat.services_title')} />
        <div className="space-y-4">
          {getTranslationArray(t('pages.it_halozat.services', { returnObjects: true })).map((service: string, i: number) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary">🔌</span>
              <span>{service}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.it_halozat.target_title')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTranslationArray(t('pages.it_halozat.target_items', { returnObjects: true })).map((item: string, i: number) => (
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
          <h2 className="text-2xl font-bold mb-3">{t('pages.it_halozat.english_section_title')}</h2>
          <p className="opacity-80 mb-6 max-w-xl mx-auto">
            {t('pages.it_halozat.english_section_description')}
          </p>
          <Link to="/en/contact" className="btn btn-primary">{t('pages.it_halozat.english_section_cta')}</Link>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.it_halozat.pricing_title')} />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={getTranslationArray(t('pages.it_halozat.pricing_rows', { returnObjects: true }))}
            note={t('pages.it_halozat.pricing_note')}
          />
        </div>
      </section>

      <CTASection
        title={t('pages.it_halozat.cta_title')}
        cta1={{ label: t('pages.it_halozat.cta_button1'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.it_halozat.cta_button2'), href: 'tel:+36302389945' }}
      />
    </>
  )
}
