interface ContactFormData {
  name: string
  phone: string
  email?: string
  service: string
  clientType: string
  district: string
  description?: string
  preferredTime?: string
  urgent?: boolean
  privacy: boolean
}

interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

const VALID_SERVICES = ['felulvizsgalat', 'villanyszereles', 'it-halozat', 'keziszerszam', 'egyeb']
const VALID_CLIENT_TYPES = ['maganszemely', 'tarsashaz', 'vallalkozas']

export function validateContactForm(data: unknown): ValidationResult {
  const errors: Record<string, string> = {}
  const d = data as Partial<ContactFormData>

  if (!d.name || typeof d.name !== 'string' || d.name.trim().length < 2) {
    errors.name = 'Kérem, adja meg a nevét (min. 2 karakter)'
  }
  if (d.name && d.name.length > 200) {
    errors.name = 'A név túl hosszú (max. 200 karakter)'
  }

  if (!d.phone || typeof d.phone !== 'string' || !/^\+?[\d\s\-()]{7,20}$/.test(d.phone.trim())) {
    errors.phone = 'Kérem, adjon meg érvényes telefonszámot'
  }

  if (d.email && typeof d.email === 'string' && d.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) {
      errors.email = 'Kérem, adjon meg érvényes e-mail címet'
    }
  }

  if (!d.service || !VALID_SERVICES.includes(d.service)) {
    errors.service = 'Kérem, válasszon szolgáltatást'
  }

  if (!d.clientType || !VALID_CLIENT_TYPES.includes(d.clientType)) {
    errors.clientType = 'Kérem, válassza ki az ügyfél típust'
  }

  if (!d.district || typeof d.district !== 'string' || d.district.trim().length < 2) {
    errors.district = 'Kérem, adja meg a kerületet'
  }

  if (d.description && typeof d.description === 'string' && d.description.length > 2000) {
    errors.description = 'A leírás túl hosszú (max. 2000 karakter)'
  }

  if (!d.privacy) {
    errors.privacy = 'Az adatvédelmi tájékoztató elfogadása kötelező'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}
