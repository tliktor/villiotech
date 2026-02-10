import { useTheme } from '../hooks/useTheme'
import type { ReactNode } from 'react'

interface ThemeCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function ThemeCard({ children, className = '', hover = true }: ThemeCardProps) {
  const { isDark } = useTheme()

  const base = isDark ? 'glass-card' : 'neu-flat'
  const hoverClass = hover ? 'bento-card' : ''

  return (
    <div className={`rounded-box p-6 transition-theme ${base} ${hoverClass} ${className}`}>
      {children}
    </div>
  )
}
