export enum SERVICE_TYPES {
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_APP = 'mobile-app',
  CLOUD_SOLUTIONS = 'cloud-solutions',
  CONSULTING = 'consulting',
  OTHER = 'other'
}

export enum CLIENT_TYPES {
  INDIVIDUAL = 'individual',
  SMALL_BUSINESS = 'small-business',
  ENTERPRISE = 'enterprise',
  STARTUP = 'startup'
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: SERVICE_TYPES;
  clientType: CLIENT_TYPES;
  message: string;
}