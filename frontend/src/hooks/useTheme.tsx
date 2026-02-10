import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'villiotech-day' | 'villiotech-night'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('villiotech-theme') as Theme | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'villiotech-night'
      : 'villiotech-day'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('villiotech-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'villiotech-day' ? 'villiotech-night' : 'villiotech-day')
  }

  const isDark = theme === 'villiotech-night'

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
