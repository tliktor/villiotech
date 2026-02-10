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
        <div key={i} className={`collapse collapse-arrow rounded-box transition-theme ${isDark ? 'glass-card' : 'neu-subtle bg-base-100'}`}>
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">{item.question}</div>
          <div className="collapse-content text-sm opacity-80">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
