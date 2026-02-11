import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, Phone, Zap } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const navLinks = [
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

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + '/')
  const linkClass = (to: string) => `btn btn-ghost text-[15px] ${isActive(to) ? 'btn-active' : ''}`

  return (
    <nav className={`sticky top-0 z-50 transition-theme ${isDark ? 'glass-card-strong' : 'neu-flat bg-base-100'}`}>
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
              <Link key={link.to} to={link.to} className={linkClass(link.to)}>
                {link.label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className={`btn btn-ghost text-[15px] ${pathname.startsWith('/szolgaltatasok') ? 'btn-active' : ''}`}>
                {t('nav.services')} ▾
              </div>
              <ul tabIndex={0} className={`dropdown-content menu rounded-box z-50 w-64 p-2 shadow-lg ${isDark ? 'bg-neutral text-neutral-content' : 'neu-flat bg-base-100'}`}>
                {serviceLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className={isActive(link.to) ? 'active' : ''}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/rolam" className={linkClass('/rolam')}>{t('nav.about')}</Link>
            <Link to="/kapcsolat" className={linkClass('/kapcsolat')}>{t('nav.contact')}</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Urgent badge */}
            <a href="tel:+36302389945" className="hidden md:flex btn btn-sm btn-warning gap-1">
              <Phone className="w-4 h-4" />
              {t('nav.urgent')}
            </a>

            {/* English Service */}
            <Link to="/en/english-speaking" className="hidden lg:flex btn btn-ghost btn-circle" aria-label="English Service" title="English Service">
              <span className="text-4xl leading-none">🇬🇧</span>
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label={`${t('nav.theme_toggle')} (${isDark ? t('nav.light_mode') : t('nav.dark_mode')})`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden"
              aria-label={mobileOpen ? t('nav.close_menu') : t('nav.open_menu')}
              aria-expanded={mobileOpen}
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
                className={`block btn btn-ghost btn-sm justify-start w-full ${isActive(link.to) ? 'btn-active' : ''}`}
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
                className={`block btn btn-ghost btn-sm justify-start w-full pl-6 ${isActive(link.to) ? 'btn-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/en/english-speaking" className={`block btn btn-ghost btn-sm justify-start w-full ${isActive('/en/english-speaking') ? 'btn-active' : ''}`} onClick={() => setMobileOpen(false)}>🇬🇧 English Service</Link>
            <Link to="/rolam" className={`block btn btn-ghost btn-sm justify-start w-full ${isActive('/rolam') ? 'btn-active' : ''}`} onClick={() => setMobileOpen(false)}>{t('nav.about')}</Link>
            <Link to="/kapcsolat" className={`block btn btn-ghost btn-sm justify-start w-full ${isActive('/kapcsolat') ? 'btn-active' : ''}`} onClick={() => setMobileOpen(false)}>{t('nav.contact')}</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
