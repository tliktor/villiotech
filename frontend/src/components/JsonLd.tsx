/**
 * JSON-LD structured data for LocalBusiness schema.
 * Placed in Layout so it appears on every page.
 */

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  name: 'Villiotech',
  description: 'Villamos biztonsági felülvizsgálat, villanyszerelés, IT hálózat kiépítés Budán. Villamosmérnök, kalibrált műszerek, joghatályos jegyzőkönyv.',
  url: 'https://villiotech.hu',
  telephone: '+36302389945',
  email: 'info@villiotech.hu',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Budapest',
    addressRegion: 'Buda',
    addressCountry: 'HU',
  },
  areaServed: {
    '@type': 'City',
    name: 'Budapest',
  },
  priceRange: '$$',
  currenciesAccepted: 'HUF',
  paymentAccepted: 'Cash, Credit Card',
  knowsLanguage: ['hu', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Szolgáltatások',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Villamos biztonsági felülvizsgálat' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Villanyszerelés, javítás, kivitelezés' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'IT hálózat kiépítés (WiFi/UTP)' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Elektromos kéziszerszámok éves felülvizsgálata' },
      },
    ],
  },
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  )
}
