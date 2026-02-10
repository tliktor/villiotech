import ThemeCard from './ThemeCard'
import { ClipboardList, FileText, Receipt, FileCheck, Shield } from 'lucide-react'

interface Deliverable {
  icon: typeof ClipboardList
  text: string
}

interface DeliverablesListProps {
  items?: Deliverable[]
}

const defaultItems: Deliverable[] = [
  { icon: ClipboardList, text: 'Joghatályos mérési jegyzőkönyv' },
  { icon: FileText, text: 'Tételes árajánlat a munka előtt' },
  { icon: Receipt, text: 'Tételes elszámolás a munka után' },
  { icon: FileCheck, text: 'Számla a helyszínen' },
  { icon: Shield, text: 'Garancia minden munkára' },
]

export default function DeliverablesList({ items = defaultItems }: DeliverablesListProps) {
  return (
    <ThemeCard hover={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <item.icon className="w-6 h-6 text-primary shrink-0" />
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </ThemeCard>
  )
}
