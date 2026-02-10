import { useTheme } from '../hooks/useTheme'

interface PricingRow {
  label: string
  price: string
}

interface PricingTableProps {
  rows: PricingRow[]
  note?: string
}

export default function PricingTable({ rows, note }: PricingTableProps) {
  const { isDark } = useTheme()

  return (
    <div className={`rounded-box overflow-hidden transition-theme ${isDark ? 'glass-card' : 'neu-flat'}`}>
      <table className="table">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="font-medium">{row.label}</td>
              <td className="text-right font-semibold text-primary">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <div className="px-6 pb-4 text-sm opacity-70">{note}</div>
      )}
    </div>
  )
}
