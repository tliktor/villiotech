import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function StickyMobileCTA() {
  const { t } = useTranslation()
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden bg-base-100/80 backdrop-blur-sm border-t border-base-300">
      <Link
        to="/kapcsolat"
        className="btn btn-primary btn-block shadow-lg gap-2"
      >
        <FileText className="w-5 h-5" />
        {t('home.hero.cta1')}
      </Link>
    </div>
  )
}
