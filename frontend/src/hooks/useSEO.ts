import { useTranslation } from 'react-i18next'
import { seoConfig } from '../config/seo'

type PageKey = keyof typeof seoConfig.hu

export function useSEO(pageKey: PageKey) {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'hu' | 'en'
  
  return seoConfig[lang]?.[pageKey] || seoConfig.hu[pageKey]
}
