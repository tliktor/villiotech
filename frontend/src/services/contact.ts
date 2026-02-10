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
    console.warn('[DEV] Contact form submitted (no API configured):', data)
    return { success: true }
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return res.json()
}
