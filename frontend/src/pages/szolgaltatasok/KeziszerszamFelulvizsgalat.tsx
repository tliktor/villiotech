import { useSEO } from '../../hooks/useSEO'
import { useTranslation } from 'react-i18next'
import { getTranslationArray } from '../../utils/i18n'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import SectionTitle from '../../components/SectionTitle'
import ThemeCard from '../../components/ThemeCard'
import ProcessSteps from '../../components/ProcessSteps'
import PricingTable from '../../components/PricingTable'
import CTASection from '../../components/CTASection'
import { CheckCircle, Zap, FileCheck, Shield } from 'lucide-react'

export default function KeziszerszamFelulvizsgalat() {
  const seo = useSEO('keziszerszamFelulvizsgalat')
  const { t } = useTranslation()
  
  const processStepsWithIcons = getTranslationArray<{title: string, description: string}>(t('pages.keziszerszam_felulvizsgalat.process_steps', { returnObjects: true })).map((step, i) => ({
    number: i + 1,
    ...step,
    icon: [CheckCircle, Zap, FileCheck, Shield][i] || CheckCircle
  }))
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/szolgaltatasok/keziszerszam-felulvizsgalat"
        keywords={seo.keywords}
      />

      <Hero
        title={t('pages.keziszerszam_felulvizsgalat.hero_title')}
        subtitle={t('pages.keziszerszam_felulvizsgalat.hero_subtitle')}
        cta1={{ label: t('pages.keziszerszam_felulvizsgalat.cta1'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.keziszerszam_felulvizsgalat.cta2'), to: '/kapcsolat' }}
      />

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.keziszerszam_felulvizsgalat.who_mandatory_title')} />
        <p className="text-center mb-8 opacity-80">{t('pages.keziszerszam_felulvizsgalat.who_mandatory_subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTranslationArray(t('pages.keziszerszam_felulvizsgalat.industries', { returnObjects: true })).map((item: string, i: number) => (
            <ThemeCard key={i} className="flex items-start gap-3">
              <span className="text-primary">🔧</span>
              <span>{item}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.keziszerszam_felulvizsgalat.process_title')} />
        <ProcessSteps steps={processStepsWithIcons} />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.keziszerszam_felulvizsgalat.what_we_check_title')} />
        <ThemeCard hover={false}>
          <ul className="space-y-3">
            {getTranslationArray(t('pages.keziszerszam_felulvizsgalat.what_we_check', { returnObjects: true })).map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ThemeCard>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.keziszerszam_felulvizsgalat.pricing_title')} />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={getTranslationArray(t('pages.keziszerszam_felulvizsgalat.pricing_rows', { returnObjects: true }))}
            note={t('pages.keziszerszam_felulvizsgalat.pricing_note')}
          />
        </div>
      </section>

      <CTASection
        title={t('pages.keziszerszam_felulvizsgalat.cta_title')}
        subtitle={t('pages.keziszerszam_felulvizsgalat.cta_subtitle')}
        cta1={{ label: t('pages.keziszerszam_felulvizsgalat.cta1'), to: '/kapcsolat' }}
        cta2={{ label: t('pages.keziszerszam_felulvizsgalat.cta_phone'), href: 'tel:+36302389945' }}
      />
    </>
  )
}
