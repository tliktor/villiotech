import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import { getTranslationArray } from '../utils/i18n'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import CTASection from '../components/CTASection'
import { GraduationCap, Target, Award, Zap } from 'lucide-react'

const qualifications = [
  'Villamosmérnöki diploma',
  'Vizsgázott villamos biztonsági felülvizsgáló',
  'Tűzvédelmi vizsgák',
  'Villámvédelmi felülvizsgáló (hamarosan)',
  '20 év multinacionális szakmai tapasztalat',
]

const values = [
  {
    title: 'Pontosság',
    desc: 'Ha 9-re mondom, 9-kor ott vagyok. Ha 50 000 Ft-ot mondok, annyi lesz. Nem szeretek meglepetéseket okozni – sem időben, sem árban.',
  },
  {
    title: 'Átláthatóság',
    desc: 'Tételes árajánlatot adok, mielőtt bármit csinálnék. Elmagyarázom, mit fogok csinálni és miért. Ha valami nem az én szakterületem, megmondom.',
  },
  {
    title: 'Minőség',
    desc: 'Kalibrált műszerekkel dolgozom, mert a „szerintem jó" nem elég. A mérési eredmények joghatályosak, a munkámra garanciát vállalok.',
  },
  {
    title: 'Tisztelet',
    desc: 'Magam után takarítok. Cipővédőt húzok. Az Ön otthonát vagy munkahelyét ugyanúgy kezelem, mint a sajátomat.',
  },
]

export default function Rolam() {
  const { t } = useTranslation()
  const seo = useSEO('rolam')
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/rolam"
        keywords={seo.keywords}
      />

      <Hero
        title={t('pages.rolam.hero_title')}
        subtitle={t('pages.rolam.hero_subtitle')}
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36302389945' }}
      />

      {/* Bemutatkozás */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.rolam.intro_section')} />
        <ThemeCard hover={false}>
          <div className="space-y-4 leading-relaxed">
            {getTranslationArray(t('pages.rolam.intro_content', { returnObjects: true })).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </ThemeCard>
      </section>

      {/* Képesítések */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.rolam.qualifications_section')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {qualifications.map((q, i) => (
            <ThemeCard key={i} className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{q}</span>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* Értékek */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title={t('pages.rolam.values_section')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <ThemeCard key={i}>
              <h3 className="text-lg font-bold mb-2 text-primary">{v.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{v.desc}</p>
            </ThemeCard>
          ))}
        </div>
      </section>

      {/* English */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ThemeCard hover={false} className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">{t('pages.rolam.english_title')}</h2>
          <p className="opacity-80 mb-4 leading-relaxed">
            {t('pages.rolam.english_content')}
          </p>
        </ThemeCard>
      </section>

      <CTASection
        title={t('pages.rolam.cta_title')}
        subtitle={t('pages.rolam.cta_subtitle')}
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36302389945' }}
      />
    </>
  )
}
