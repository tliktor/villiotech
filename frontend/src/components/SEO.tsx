import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  keywords?: string
  structuredData?: object
}

const SITE_NAME = 'Villiotech'
const BASE_URL = 'https://villiotech.hu'

export default function SEO({ title, description, canonical, ogImage, noindex, keywords, structuredData }: SEOProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL
  const defaultImage = ogImage || `${BASE_URL}/og-image.jpg`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:locale" content={lang === 'hu' ? 'hu_HU' : 'en_US'} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />

      <link rel="canonical" href={url} />
      
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}