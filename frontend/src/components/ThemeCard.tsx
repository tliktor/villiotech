import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import type { ReactNode } from 'react'

interface ThemeCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export default function ThemeCard({ children, className = '', hover = true, delay = 0 }: ThemeCardProps) {
  const { isDark } = useTheme()

  const base = isDark ? 'glass-card' : 'neu-flat'
  const hoverClass = hover ? 'bento-card' : ''

  return (
    <motion.div 
      className={`rounded-box p-6 transition-theme ${base} ${hoverClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  )
}
