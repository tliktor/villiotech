import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from 'react-i18next'

/**
 * Lazy-loaded Google Maps embed.
 * Nem tölt be iframe-et, amíg a felhasználó nem kattint – performance friendly.
 */

const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43073.77375!2d18.98!3d47.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDMwJzAwLjAiTiAxOcKwMDAnMDAuMCJF!5e0!3m2!1shu!2shu!4v1'

export default function GoogleMap() {
  const [loaded, setLoaded] = useState(false)
  const { isDark } = useTheme()
  const { t } = useTranslation()

  if (!loaded) {
    return (
      <div
        className={`rounded-box overflow-hidden cursor-pointer transition-theme ${isDark ? 'glass-card' : 'neu-flat'}`}
        onClick={() => setLoaded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setLoaded(true)}
        aria-label={t('map.load_label')}
      >
        <div className="flex items-center justify-center h-64 md:h-80">
          <div className="text-center">
            <p className="text-4xl mb-2">📍</p>
            <p className="font-semibold">{t('common.features.location')}</p>
            <p className="text-sm opacity-60 mt-1">{t('map.click_to_load')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-box overflow-hidden">
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="320"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t('map.title')}
      />
    </div>
  )
}
