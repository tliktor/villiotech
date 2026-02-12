import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTheme } from '../hooks/useTheme'
import { Shield, FileCheck, Zap, CreditCard, Clock, Phone } from 'lucide-react'

const fears = [
  { icon: Zap, title: 'Lecsap az FI-relé, nem tudja miért?', text: 'Megtalálom a hibát, megjavítom – nem kell sötétben ülnie.' },
  { icon: FileCheck, title: 'Eladná a lakást, de kell a jegyzőkönyv?', text: 'Joghatályos villamos biztonsági felülvizsgálat, amit a közjegyző, ügyvéd és biztosító is elfogad.' },
  { icon: Shield, title: 'Régi a vezetékezés, aggódik?', text: 'Felmérem az állapotot, megmondom, mi a teendő – érthetően, magyarul.' },
]

const trust = [
  { icon: FileCheck, text: 'Villamosmérnök, vizsgázott felülvizsgáló' },
  { icon: CreditCard, text: 'Kártyás fizetés a helyszínen' },
  { icon: Clock, text: 'Pontos időpont, nem kell egész nap várni' },
  { icon: Shield, text: 'Garancia minden munkára' },
]

export default function LandingLakas() {
  const { isDark } = useTheme()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Villamos felülvizsgálat lakásokra – Villiotech</title>
        <meta name="description" content="Villamos biztonsági felülvizsgálat, villanyszerelés, IT hálózat lakásokra Budán. Joghatályos jegyzőkönyv, kártyás fizetés, garancia." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Ne hagyja, hogy egy villamos hiba<br />meglepetésként érje.
          </h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Kalibrált műszerekkel, joghatályos jegyzőkönyvvel dolgozom. Megmondom, mi a helyzet – és megoldom, ha kell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lakossagnak" className="btn btn-primary btn-lg">Részletek és árak →</Link>
            <a href="tel:+36302389945" className="btn btn-warning btn-lg gap-2"><Phone className="w-5 h-5" /> Hívjon most</a>
          </div>
        </div>
      </section>

      <section className={`py-12 transition-theme ${isDark ? 'glass-card-strong' : 'bg-base-200'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fears.map((f, i) => (
              <div key={i} className={`p-6 rounded-2xl ${isDark ? 'glass-card' : 'bg-base-100 shadow'}`}>
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trust.map((t, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 p-4">
                <t.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-12 transition-theme ${isDark ? 'glass-card-strong' : 'bg-base-200'}`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Kérjen időpontot most</h2>
          <p className="opacity-70 mb-6">Általában 1-2 munkanapon belül ki tudok menni.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kapcsolat" className="btn btn-primary btn-lg">Ajánlatot kérek →</Link>
            <a href="tel:+36302389945" className="btn btn-outline btn-lg gap-2"><Phone className="w-5 h-5" /> +36 30 238 9945</a>
          </div>
        </div>
      </section>
    </>
  )
}
