import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { ThemeProvider, useTheme } from '../useTheme'

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn(() => ({ matches: false }))
})

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.removeAttribute('data-theme')
  })

  it('toggles theme', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    expect(result.current.theme).toBe('villiotech-day')
    
    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('villiotech-night')
  })

  it('persists theme to localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('villiotech-theme', 'villiotech-night')
  })
})