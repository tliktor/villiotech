import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ThemeCard from '../ThemeCard'

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({ isDark: false }))
}))

describe('ThemeCard', () => {
  it('renders children', () => {
    render(<ThemeCard>Test content</ThemeCard>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ThemeCard className="custom-class">Content</ThemeCard>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies hover class by default', () => {
    const { container } = render(<ThemeCard>Content</ThemeCard>)
    expect(container.firstChild).toHaveClass('bento-card')
  })

  it('removes hover class when hover=false', () => {
    const { container } = render(<ThemeCard hover={false}>Content</ThemeCard>)
    expect(container.firstChild).not.toHaveClass('bento-card')
  })
})