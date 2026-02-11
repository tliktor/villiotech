import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const { isDark } = useTheme()

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div 
          key={i} 
          className={`collapse collapse-arrow rounded-box transition-theme ${isDark ? 'glass-card' : 'neu-subtle bg-base-100'}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">{item.question}</div>
          <div className="collapse-content text-sm opacity-80">
            <p>{item.answer}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
