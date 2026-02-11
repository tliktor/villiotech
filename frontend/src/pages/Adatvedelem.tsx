import SEO from '../components/SEO'
import ThemeCard from '../components/ThemeCard'
import { useTranslation } from 'react-i18next'
import { getTranslationArray } from '../utils/i18n'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Adatvedelem() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const isEnglish = pathname.startsWith('/en/')

  useEffect(() => {
    if (isEnglish && i18n.language !== 'en') {
      i18n.changeLanguage('en')
    } else if (!isEnglish && i18n.language !== 'hu') {
      i18n.changeLanguage('hu')
    }
  }, [isEnglish, i18n])

  return (
    <>
      <SEO
        title={t('pages.adatvedelem.seo_title')}
        description={t('pages.adatvedelem.seo_description')}
        canonical="/adatvedelem"
      />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">{t('pages.adatvedelem.title')}</h1>

        <ThemeCard hover={false} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section1_title')}</h2>
            <p className="opacity-80" style={{ whiteSpace: 'pre-line' }}>
              {t('pages.adatvedelem.section1_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section2_title')}</h2>
            <p className="opacity-80">{t('pages.adatvedelem.section2_intro')}</p>
            <ul className="list-disc pl-6 mt-2 opacity-80 space-y-1">
              {getTranslationArray(t('pages.adatvedelem.section2_list', { returnObjects: true })).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section3_title')}</h2>
            <p className="opacity-80">
              {t('pages.adatvedelem.section3_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section4_title')}</h2>
            <p className="opacity-80">
              {t('pages.adatvedelem.section4_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section5_title')}</h2>
            <p className="opacity-80">
              {t('pages.adatvedelem.section5_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section6_title')}</h2>
            <p className="opacity-80">
              {t('pages.adatvedelem.section6_content')}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section7_title')}</h2>
            <ul className="list-disc pl-6 opacity-80 space-y-1">
              {getTranslationArray(t('pages.adatvedelem.section7_list', { returnObjects: true })).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t('pages.adatvedelem.section8_title')}</h2>
            <p className="opacity-80">
              {t('pages.adatvedelem.section8_content')}
            </p>
          </div>

          <p className="text-sm opacity-50">{t('pages.adatvedelem.last_updated')}</p>
        </ThemeCard>
      </section>
    </>
  )
}
