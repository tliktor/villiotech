import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

interface HeroProps {
  title: string
  subtitle: string
  cta1: { label: string; to: string }
  cta2?: { label: string; to?: string; href?: string }
}

export default function Hero({ title, subtitle, cta1, cta2 }: HeroProps) {
  const { isDark } = useTheme()

  return (
    <section className={`py-20 md:py-28 transition-theme ${isDark ? '' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={cta1.to} className="btn btn-primary btn-lg">
            {cta1.label}
          </Link>
          {cta2 && (
            cta2.href ? (
              <a href={cta2.href} className="btn btn-outline btn-lg">
                {cta2.label}
              </a>
            ) : (
              <Link to={cta2.to!} className="btn btn-outline btn-lg">
                {cta2.label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
