import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import WhyMe from '../components/WhyMe'
import ProcessSteps from '../components/ProcessSteps'
import PricingTable from '../components/PricingTable'
import DeliverablesList from '../components/DeliverablesList'
import CTASection from '../components/CTASection'
import ScrollReveal from '../components/ScrollReveal'
import { Home as HomeIcon, Building2, Store, ArrowRight } from 'lucide-react'

const processSteps = [
  { number: 1, title: 'Ajánlatkérés', description: 'Töltse ki az űrlapot vagy hívjon telefonon. Írja le röviden, mire van szüksége.' },
  { number: 2, title: 'Egyeztetés', description: 'Visszajelzek és egyeztetjük az időpontot, a munka részleteit és a várható költséget.' },
  { number: 3, title: 'Helyszíni munka', description: 'Megérkezem a megbeszélt időpontban, elvégzem a méréseket vagy szerelési munkát.' },
  { number: 4, title: 'Dokumentáció', description: 'Felülvizsgálatnál joghatályos jegyzőkönyvet kap. Szerelésnél tételes elszámolást.' },
  { number: 5, title: 'Fizetés', description: 'Készpénzzel vagy bankkártyával, a helyszínen. Számlát azonnal kiállítom.' },
]

const pricingRows = [
  { label: 'Kiszállás – Buda', price: '10 000 Ft' },
  { label: 'Kiszállás – Pest (kivételesen)', price: '20 000 Ft' },
  { label: 'Minimum munkadíj', price: '50 000 Ft' },
  { label: 'Sürgős (4 órán belül)', price: '+50% felár' },
]

export default function Home() {
  const { isDark } = useTheme()
  const { t } = useTranslation()

  const targetCards = [
    {
      icon: HomeIcon,
      title: t('home.residents.title'),
      description: t('home.residents.description'),
      bullets: [
        t('home.residents.bullet1'),
        t('home.residents.bullet2'),
        t('home.residents.bullet3'),
        t('home.residents.bullet4'),
      ],
      to: '/lakossagnak',
    },
    {
      icon: Building2,
      title: t('home.condos.title'),
      description: t('home.condos.description'),
      bullets: [
        t('home.condos.bullet1'),
        t('home.condos.bullet2'),
        t('home.condos.bullet3'),
        t('home.condos.bullet4'),
      ],
      to: '/tarsashazaknak',
    },
    {
      icon: Store,
      title: t('home.businesses.title'),
      description: t('home.businesses.description'),
      bullets: [
        t('home.businesses.bullet1'),
        t('home.businesses.bullet2'),
        t('home.businesses.bullet3'),
        t('home.businesses.bullet4'),
      ],
      to: '/munkahelyeknek',
    },
  ]

  return (
    <>
      <SEO
        title="Villamos biztonság, mérnöki precizitással – Budán"
        description="Joghatályos villamos felülvizsgálat, szakszerű villanyszerelés és IT hálózat kiépítés Budán. Kalibrált műszerek, tételes árajánlat, garancia. Villamosmérnök, 20 év tapasztalat."
        canonical="/"
      />

      <Hero
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
        cta1={{ label: t('home.hero.cta1'), to: '/kapcsolat' }}
        cta2={{ label: t('home.hero.cta2'), href: 'tel:+36302389945' }}
      />

      {/* Bento target cards */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ScrollReveal>
          <SectionTitle title={t('home.target_section')} />
        </ScrollReveal>
        <div className="bento-grid-home bento-grid">
          {targetCards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <ThemeCard className="flex flex-col justify-between h-full">
                <div>
                  <card.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm opacity-70 mb-4">{card.description}</p>
                  <ul className="space-y-2 mb-6">
                    {card.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={card.to} className="btn btn-primary btn-sm gap-1 self-start">
                {t('home.details_cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </ThemeCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why me */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ScrollReveal>
          <SectionTitle title={t('home.why_me')} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <WhyMe />
        </ScrollReveal>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ScrollReveal>
          <SectionTitle title={t('home.process')} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <ProcessSteps steps={processSteps} />
        </ScrollReveal>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ScrollReveal>
          <SectionTitle title={t('home.pricing')} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="max-w-lg mx-auto">
            <PricingTable
              rows={pricingRows}
              note="Magánszemélyeknek ÁFA-mentes, vállalkozásoknak ÁFÁ-s számlát állítok ki. Társasházaknak ÁFA-mentes számlázás."
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Deliverables */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ScrollReveal>
          <SectionTitle title={t('home.deliverables')} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <DeliverablesList />
          <p className="text-center mt-6 text-sm italic opacity-70">
            {t('home.quote_testimonial')}
          </p>
        </ScrollReveal>
      </section>

      {/* English */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ScrollReveal>
          <ThemeCard hover={false} className="text-center">
            <h2 className="text-2xl font-bold mb-3">{t('home.english.title')}</h2>
            <p className="opacity-80 mb-6 max-w-xl mx-auto">
              {t('home.english.description')}
            </p>
            <Link to="/kapcsolat" className="btn btn-primary">{t('home.english.cta')}</Link>
          </ThemeCard>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <ScrollReveal>
        <CTASection
          title={t('home.final_cta.title')}
          subtitle={t('home.final_cta.subtitle')}
          cta1={{ label: t('home.final_cta.cta1'), to: '/kapcsolat' }}
          cta2={{ label: t('home.final_cta.cta2'), href: 'tel:+36302389945' }}
        />
      </ScrollReveal>
    </>
  )
}