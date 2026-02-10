import { Link } from 'react-router-dom'
import { Zap, Phone, Mail, MapPin, CreditCard } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { isDark } = useTheme()
  const { t } = useTranslation()

  return (
    <footer className={`mt-16 transition-theme ${isDark ? 'glass-subtle' : 'neu-pressed'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl mb-4">
              <Zap className="w-6 h-6" />
              Villiotech
            </Link>
            <p className="text-sm opacity-70">
              {t('footer.tagline')}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>{t('footer.card_payment')}</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.services_title')}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/szolgaltatasok/villamos-felulvizsgalat" className="hover:text-primary transition-colors">{t('services.electrical_inspection')}</Link></li>
              <li><Link to="/szolgaltatasok/villanyszereles" className="hover:text-primary transition-colors">{t('services.electrical_work')}</Link></li>
              <li><Link to="/szolgaltatasok/it-halozat" className="hover:text-primary transition-colors">{t('footer.it_network_full')}</Link></li>
              <li><Link to="/szolgaltatasok/keziszerszam-felulvizsgalat" className="hover:text-primary transition-colors">{t('services.tool_inspection')}</Link></li>
            </ul>
          </div>

          {/* Target groups */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.target_title')}</h3>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/lakossagnak" className="hover:text-primary transition-colors">{t('nav.residents')}</Link></li>
              <li><Link to="/tarsashazaknak" className="hover:text-primary transition-colors">{t('nav.condos')}</Link></li>
              <li><Link to="/munkahelyeknek" className="hover:text-primary transition-colors">{t('nav.businesses')}</Link></li>
              <li><Link to="/rolam" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.contact_title')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+36000000000" className="hover:text-primary transition-colors">+36 00 000 0000</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@villiotech.hu" className="hover:text-primary transition-colors">info@villiotech.hu</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t('footer.location')}</span>
              </li>
            </ul>
            <p className="mt-3 text-sm opacity-60">{t('footer.english_service')}</p>
          </div>
        </div>

        <div className="divider my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
          <p>© {new Date().getFullYear()} Villiotech. {t('footer.copyright')}</p>
          <div className="flex gap-4">
            <Link to="/adatvedelem" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
            <Link to="/aszf" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
          </div>
          <p>{t('footer.quality')}</p>
        </div>
      </div>
    </footer>
  )
}
