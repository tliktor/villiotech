import { Link } from 'react-router-dom'
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
  return (
    <>
      <SEO
        title="Rólam – villamosmérnök, 20 év tapasztalat"
        description="Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. 20 év multinacionális tapasztalat. Budán dolgozom, magyarul és angolul."
        canonical="/rolam"
      />

      <Hero
        title="Villamosmérnök, 20 év tapasztalattal – most Önnek dolgozom."
        subtitle="Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. Két évtizednyi multinacionális tapasztalat után a budai otthonok, társasházak és munkahelyek villamos biztonságáért dolgozom."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36000000000' }}
      />

      {/* Bemutatkozás */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <SectionTitle title="Ki áll a Villiotech mögött?" />
        <ThemeCard hover={false}>
          <div className="space-y-4 leading-relaxed">
            <p>
              Villamosmérnök vagyok, vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. Hamarosan villámvédelmi felülvizsgálóként is rendelkezésre állok.
            </p>
            <p>
              20 évet dolgoztam multinacionális környezetben, ahol megtanultam, hogy a pontosság, a felelősség és a korrekt kommunikáció nem választható extra – hanem alapelvárás. Ezt a szemléletet hoztam magammal a magánszektorba is.
            </p>
            <p>
              Budán élek és dolgozom. Fő területem a II. kerület és egész Buda, de kivételesen Pesten is vállalok munkát.
            </p>
            <p>
              Magyarul és angolul egyaránt dolgozom – külföldi ügyfeleimet ugyanazzal a precizitással szolgálom ki.
            </p>
          </div>
        </ThemeCard>
      </section>

      {/* Képesítések */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Képesítéseim" />
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
        <SectionTitle title="Amiben hiszek" />
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
          <h2 className="text-2xl font-bold mb-3">About me – for English-speaking clients</h2>
          <p className="opacity-80 mb-4 leading-relaxed">
            I'm a qualified electrical engineer and certified electrical safety inspector based in Buda, Budapest. With 20 years of experience in multinational environments, I bring precision, accountability, and clear communication to every project.
          </p>
          <p className="opacity-80 leading-relaxed">
            I provide all services in fluent English – from initial consultation to final documentation. Whether you need an electrical safety inspection, wiring work, or IT network setup, I'm here to help.
          </p>
        </ThemeCard>
      </section>

      <CTASection
        title="Dolgozzunk együtt"
        subtitle="Ha precíz, megbízható villamos szakembert keres Budán – keressen bizalommal."
        cta1={{ label: 'Ajánlatot kérek', to: '/kapcsolat' }}
        cta2={{ label: '☎ Hívjon most', href: 'tel:+36000000000' }}
      />
    </>
  )
}
