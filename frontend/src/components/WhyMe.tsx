import ThemeCard from './ThemeCard'
import { GraduationCap, Ruler, ClipboardList, Clock, Sparkles, CreditCard, FileText, Shield } from 'lucide-react'

const items = [
  { icon: GraduationCap, title: 'Képzett villamosmérnök', desc: 'Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel.' },
  { icon: Ruler, title: 'Kalibrált műszerek', desc: 'Minden mérés kalibrált, hitelesített műszerekkel történik – joghatályos eredmények.' },
  { icon: ClipboardList, title: 'Joghatályos jegyzőkönyv', desc: 'Hatóság előtt elfogadott dokumentáció, amit azonnal felhasználhat.' },
  { icon: Clock, title: '20 év tapasztalat', desc: 'Multinacionális környezetben szerzett precizitás és felelősségtudat.' },
  { icon: Sparkles, title: 'Magam után takarítok', desc: 'A munkaterületet tisztán hagyom – ez nálam alapelvárás.' },
  { icon: CreditCard, title: 'Kártyás fizetés', desc: 'Bankkártyával is fizethet a helyszínen.' },
  { icon: FileText, title: 'Tételes árajánlat', desc: 'Előre tudja, mire számítson – nincsenek rejtett költségek.' },
  { icon: Shield, title: 'Garancia', desc: 'Minden elvégzett munkára garanciát vállalok.' },
]

export default function WhyMe() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <ThemeCard key={i} className="text-center">
          <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-1">{item.title}</h3>
          <p className="text-sm opacity-70">{item.desc}</p>
        </ThemeCard>
      ))}
    </div>
  )
}
