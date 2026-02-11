import SEO from '../components/SEO'
import ThemeCard from '../components/ThemeCard'
import { useTranslation } from 'react-i18next'
import { getTranslationArray } from '../utils/i18n'

export default function ASZF() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('pages.aszf.seo_title')}
        description={t('pages.aszf.seo_description')}
        canonical="/aszf"
      />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">{t('pages.aszf.title')}</h1>

        <ThemeCard hover={false} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section1_title')}</h2>
            <p className="opacity-80" style={{ whiteSpace: 'pre-line' }}>
              {t('pages.aszf.section1_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section2_title')}</h2>
            <p className="opacity-80">
              {t('pages.aszf.section2_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section3_title')}</h2>
            <ul className="list-disc pl-6 opacity-80 space-y-1">
              {getTranslationArray(t('pages.aszf.section3_list', { returnObjects: true })).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section4_title')}</h2>
            <p className="opacity-80">
              {t('pages.aszf.section4_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section5_title')}</h2>
            <p className="opacity-80">
              {t('pages.aszf.section5_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section6_title')}</h2>
            <p className="opacity-80">
              {t('pages.aszf.section6_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section7_title')}</h2>
            <p className="opacity-80">
              {t('pages.aszf.section7_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.aszf.section8_title')}</h2>
            <p className="opacity-80">
              {t('pages.aszf.section8_content')}
            </p>
          </div>

          <p className="text-sm opacity-50">{t('pages.aszf.effective_date')}</p>
        </ThemeCard>
      </section>
    </>
  )
}
