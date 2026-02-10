import { Link } from 'react-router-dom'
import { Sun, Moon, Menu, Phone, Zap, Globe } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'hu' ? 'en' : 'hu')
  }

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/lakossagnak', label: t('nav.residents') },
    { to: '/tarsashazaknak', label: t('nav.condos') },
    { to: '/munkahelyeknek', label: t('nav.businesses') },
  ]

  const serviceLinks = [
    { to: '/szolgaltatasok/villamos-felulvizsgalat', label: t('services.electrical_inspection') },
    { to: '/szolgaltatasok/villanyszereles', label: t('services.electrical_work') },
    { to: '/szolgaltatasok/it-halozat', label: t('services.it_network') },
    { to: '/szolgaltatasok/keziszerszam-felulvizsgalat', label: t('services.tool_inspection') },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-theme ${isDark ? 'glass-card-strong' : 'neu-flat'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Zap className="w-6 h-6" />
            Villiotech
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="btn btn-ghost btn-sm"
              >
                {link.label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                {t('nav.services')} ▾
              </div>
              <ul tabIndex={0} className={`dropdown-content menu rounded-box z-50 w-64 p-2 shadow-lg ${isDark ? 'glass-card-strong' : 'neu-flat bg-base-100'}`}>
                {serviceLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/rolam" className="btn btn-ghost btn-sm">{t('nav.about')}</Link>
            <Link to="/kapcsolat" className="btn btn-ghost btn-sm">{t('nav.contact')}</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Urgent badge */}
            <a href="tel:+36302389945" className="hidden md:flex btn btn-sm btn-warning gap-1">
              <Phone className="w-4 h-4" />
              {t('nav.urgent')}
            </a>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Language toggle"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold">{i18n.language.toUpperCase()}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label={t('nav.theme')}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden"
              aria-label={t('nav.menu')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block btn btn-ghost btn-sm justify-start w-full"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="divider my-1 text-xs opacity-50">{t('nav.services')}</div>
            {serviceLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block btn btn-ghost btn-sm justify-start w-full pl-6"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/rolam" className="block btn btn-ghost btn-sm justify-start w-full" onClick={() => setMobileOpen(false)}>{t('nav.about')}</Link>
            <Link to="/kapcsolat" className="block btn btn-ghost btn-sm justify-start w-full" onClick={() => setMobileOpen(false)}>{t('nav.contact')}</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
