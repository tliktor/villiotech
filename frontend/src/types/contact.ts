export const SERVICE_TYPES = {
  WEB_DEVELOPMENT: 'web-development',
  MOBILE_APP: 'mobile-app',
  CLOUD_SOLUTIONS: 'cloud-solutions',
  CONSULTING: 'consulting',
  OTHER: 'other',
} as const

export type SERVICE_TYPES = (typeof SERVICE_TYPES)[keyof typeof SERVICE_TYPES]

export const CLIENT_TYPES = {
  INDIVIDUAL: 'individual',
  SMALL_BUSINESS: 'small-business',
  ENTERPRISE: 'enterprise',
  STARTUP: 'startup',
} as const

export type CLIENT_TYPES = (typeof CLIENT_TYPES)[keyof typeof CLIENT_TYPES]

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  serviceType: SERVICE_TYPES
  clientType: CLIENT_TYPES
  preferredLanguage?: 'hu' | 'en'
  message: string
}
