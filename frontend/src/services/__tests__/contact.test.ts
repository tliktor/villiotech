import { vi } from 'vitest'
import { submitContactForm } from '../contact'

const mockFetch = vi.fn()
global.fetch = mockFetch

const mockFormData = {
  name: 'Test User',
  phone: '+36301234567',
  email: 'test@example.com',
  service: 'web',
  clientType: 'business',
  district: 'budapest',
  description: 'Test description',
  preferredTime: 'morning',
  urgent: false,
  privacy: true,
  website: '',
  _loadedAt: Date.now()
}

describe('submitContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits form successfully', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ success: true })
    })

    const result = await submitContactForm(mockFormData)
    expect(result.success).toBe(true)
  })

  it('handles API errors', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ success: false, error: 'Server error' })
    })

    const result = await submitContactForm(mockFormData)
    expect(result.success).toBe(false)
    expect(result.error).toBe('Server error')
  })

  it('returns success in dev mode without API', async () => {
    vi.stubEnv('VITE_CONTACT_API_URL', '')
    vi.stubEnv('DEV', true)

    const result = await submitContactForm(mockFormData)
    expect(result.success).toBe(true)
  })
})