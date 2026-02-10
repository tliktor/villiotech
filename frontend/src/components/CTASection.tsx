import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Phone, MapPin, CreditCard, FileCheck } from 'lucide-react'

interface CTASectionProps {
  title: string
  subtitle?: string
  cta1?: { label: string; to: string }
  cta2?: { label: string; href?: string; to?: string }
}

export default function CTASection({ title, subtitle, cta1, cta2 }: CTASectionProps) {
  const { isDark } = useTheme()

  return (
    <section className={`py-16 transition-theme ${isDark ? 'glass-card-strong' : 'neu-convex'}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-lg opacity-80 mb-8">{subtitle}</p>}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          {cta1 && (
            <Link to={cta1.to} className="btn btn-primary btn-lg">{cta1.label}</Link>
          )}
          {cta2 && (
            cta2.href ? (
              <a href={cta2.href} className="btn btn-outline btn-lg">{cta2.label}</a>
            ) : (
              <Link to={cta2.to!} className="btn btn-outline btn-lg">{cta2.label}</Link>
            )
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm opacity-70">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Budapest – Buda</span>
          <span className="flex items-center gap-1">🇬🇧 English service</span>
          <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> Kártyás fizetés</span>
          <span className="flex items-center gap-1"><FileCheck className="w-4 h-4" /> Számlát adok</span>
        </div>
      </div>
    </section>
  )
}
