import { motion } from 'framer-motion'
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
    <motion.div 
      className={`rounded-box overflow-hidden transition-theme ${isDark ? 'glass-card' : 'neu-flat'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <table className="table">
        <tbody>
          {rows.map((row, i) => (
            <motion.tr 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <td className="font-medium">{row.label}</td>
              <td className="text-right font-semibold text-primary">{row.price}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {note && (
        <motion.div 
          className="px-6 pb-4 text-sm opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: rows.length * 0.05 }}
        >
          {note}
        </motion.div>
      )}
    </motion.div>
  )
}
