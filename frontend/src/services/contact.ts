const API_URL = import.meta.env.VITE_CONTACT_API_URL || ''

export interface ContactFormPayload {
  name: string
  phone: string
  email: string
  service: string
  clientType: string
  district: string
  description: string
  preferredTime: string
  urgent: boolean
  privacy: boolean
  // Anti-spam
  website: string    // honeypot – must be empty
  _loadedAt: number  // timestamp – min 3s fill time
}

export interface ContactResponse {
  success: boolean
  errors?: Record<string, string>
  error?: string
}

export async function submitContactForm(data: ContactFormPayload): Promise<ContactResponse> {
  if (!API_URL) {
    // Dev mode – nincs backend
    if (import.meta.env.DEV) {
      console.warn('[DEV] Contact form submitted (no API configured):', data)
    }
    return { success: true }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })

    clearTimeout(timeout)
    return res.json()
  } catch (error) {
    clearTimeout(timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'A kérés túl sokáig tartott. Kérjük, hívjon közvetlenül: +36 30 238 9945' }
    }
    throw error
  }
}
