import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTheme } from '../hooks/useTheme'
import { Shield, FileCheck, AlertTriangle, Clock, Phone, Users } from 'lucide-react'

const fears = [
  { icon: AlertTriangle, title: 'Lejárt a felülvizsgálat?', text: 'Hatósági bírság helyett joghatályos jegyzőkönyv – amit bármikor bemutathat ellenőrzésnél.' },
  { icon: Users, title: 'A közgyűlés kérdez, Ön felel?', text: 'Tételes árajánlatot adok, amit bemutathat a közgyűlésen. Átlátható, védhető döntés.' },
  { icon: Shield, title: 'Lakók panaszkodnak villamos hibára?', text: 'Felmérem a közös hálózatot, dokumentálom az állapotot, javaslatot teszek – Ön biztonságban van.' },
]

const trust = [
  { icon: FileCheck, text: 'Joghatályos jegyzőkönyv' },
  { icon: Clock, text: 'Alkalmazkodom a lakók időbeosztásához' },
  { icon: Shield, text: 'Vizsgázott felülvizsgáló, villamosmérnök' },
  { icon: Users, text: 'Közgyűlésre kész árajánlat' },
]

export default function LandingTarsashaz() {
  const { isDark } = useTheme()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Társasházi villamos felülvizsgálat – Villiotech</title>
        <meta name="description" content="Társasházi villamos biztonsági felülvizsgálat joghatályos jegyzőkönyvvel, tételes árajánlattal. Közös képviselőknek, Budán." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Közös képviselőként Ön felel<br />a lakók biztonságáért.
          </h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Ne várja meg a hatósági bírságot. Elvégzem a kötelező villamos felülvizsgálatot, joghatályos jegyzőkönyvvel és tételes árajánlattal, amit bemutathat a közgyűlésen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tarsashazaknak" className="btn btn-primary btn-lg">Részletek és árak →</Link>
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
          <h2 className="text-2xl font-bold mb-4">Kérjen árajánlatot a közgyűléshez</h2>
          <p className="opacity-70 mb-6">Tételes, átlátható árajánlat – amit a lakók is megértenek.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kapcsolat" className="btn btn-primary btn-lg">Ajánlatot kérek →</Link>
            <a href="tel:+36302389945" className="btn btn-outline btn-lg gap-2"><Phone className="w-5 h-5" /> +36 30 238 9945</a>
          </div>
        </div>
      </section>
    </>
  )
}
