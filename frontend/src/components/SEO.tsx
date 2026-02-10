/**
 * SEO component – React 19 native document metadata support.
 * React 19 hoists <title>, <meta>, <link> from components to <head> automatically.
 */

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

const SITE_NAME = 'Villiotech'
const BASE_URL = 'https://villiotech.hu' // TODO: frissíteni ha van domain

export default function SEO({ title, description, canonical, ogImage, noindex }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = canonical ? `${BASE_URL}${canonical}` : undefined

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {url && <meta property="og:url" content={url} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="hu_HU" />

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}
    </>
  )
}
