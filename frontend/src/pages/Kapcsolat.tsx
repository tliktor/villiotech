import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import GoogleMap from '../components/GoogleMap'
import { submitContactForm } from '../services/contact'
import { SERVICE_TYPES, CLIENT_TYPES } from '../types/contact'
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  service: SERVICE_TYPES | ''
  clientType: CLIENT_TYPES | ''
  preferredLanguage: 'hu' | 'en'
  district: string
  description: string
  preferredTime: string
  urgent: boolean
  privacy: boolean
}

const initialForm: FormData = {
  name: '', phone: '', email: '', service: '', clientType: '', preferredLanguage: 'hu',
  district: '', description: '', preferredTime: '', urgent: false, privacy: false,
}

export default function Kapcsolat() {
  const { t, i18n } = useTranslation()
  const seo = useSEO('kapcsolat')
  const [searchParams] = useSearchParams()
  const isEnglish = searchParams.get('lng') === 'en'
  const [form, setForm] = useState<FormData>({
    ...initialForm,
    preferredLanguage: isEnglish ? 'en' : 'hu'
  })

  // Switch UI language if coming from English landing page
  if (isEnglish && i18n.language !== 'en') {
    i18n.changeLanguage('en')
  }
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const loadedAt = useRef(Date.now())

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) e.name = 'Kérem, adja meg a nevét'
    if (!form.phone.trim()) e.phone = t('contact.validation.phone_required')
    if (!form.service) e.service = t('contact.validation.service_required')
    if (!form.clientType) e.clientType = t('contact.validation.client_type_required')
    if (!form.district.trim()) e.district = 'Kérem, adja meg a kerületet vagy címet'
    if (!form.privacy) e.privacy = t('contact.validation.privacy_required')
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('contact.validation.email_invalid')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setApiError(null)

    try {
      const result = await submitContactForm({
        ...form,
        website: '',          // honeypot – always empty from real users
        _loadedAt: loadedAt.current,
      })

      if (result.success) {
        setSubmitted(true)
      } else if (result.errors) {
        setErrors(result.errors as Partial<Record<keyof FormData, string>>)
      } else {
        setApiError(result.error || 'Hiba történt. Kérjük, próbálja újra.')
      }
    } catch {
      setApiError('Hálózati hiba. Kérjük, próbálja újra, vagy hívjon közvetlenül.')
    } finally {
      setSubmitting(false)
    }
  }

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    if (apiError) setApiError(null)
  }

  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ThemeCard hover={false}>
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('contact.success.title')}</h2>
          <p className="opacity-80 mb-4">{t('contact.success.message')}</p>
          <p className="text-sm opacity-60">{t('contact.success.urgent')} <a href="tel:+36302389945" className="text-primary font-semibold">+36 30 238 9945</a></p>
        </ThemeCard>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical="/kapcsolat"
        keywords={seo.keywords}
      />

      <Hero
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        cta1={{ label: t('contact.hero.cta1'), to: '#form' }}
        cta2={{ label: t('contact.hero.cta2'), href: 'tel:+36302389945' }}
      />

      {/* Contact info */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ThemeCard className="flex items-center gap-4">
            <Phone className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="font-semibold">{t('contact.phone')}</p>
              <a href="tel:+36302389945" className="text-primary">+36 30 238 9945</a>
            </div>
          </ThemeCard>
          <ThemeCard className="flex items-center gap-4">
            <Mail className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="font-semibold">{t('contact.email')}</p>
              <a href="mailto:info@villiotech.hu" className="text-primary">info@villiotech.hu</a>
            </div>
          </ThemeCard>
          <ThemeCard className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="font-semibold">{t('contact.service_area')}</p>
              <p>{t('footer.location')}</p>
            </div>
          </ThemeCard>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="max-w-3xl mx-auto px-4 pb-12">
        <SectionTitle title={t('contact.form_title')} />
        <ThemeCard hover={false}>
          {apiError && (
            <div role="alert" className="alert alert-error mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Honeypot – hidden from real users */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
              <label htmlFor="website">Ne töltse ki</label>
              <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
            </div>

            {/* Name */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="name">{t('contact.form.name')} *</label>
              <input 
                id="name" 
                type="text" 
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`} 
                value={form.name} 
                onChange={e => update('name', e.target.value)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
            </fieldset>

            {/* Phone */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="phone">{t('contact.form.phone')} *</label>
              <input 
                id="phone" 
                type="tel" 
                placeholder="Pl. +36 30 123 4567" 
                className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`} 
                value={form.phone} 
                onChange={e => update('phone', e.target.value)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              <p className="text-xs opacity-50 mt-1">{t('contact.form.phone_help')}</p>
              {errors.phone && <p id="phone-error" role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
            </fieldset>

            {/* Email */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="email">{t('contact.email')}</label>
              <input 
                id="email" 
                type="email" 
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} 
                value={form.email} 
                onChange={e => update('email', e.target.value)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <p className="text-xs opacity-50 mt-1">{t('contact.form.email_help')}</p>
              {errors.email && <p id="email-error" role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </fieldset>

            {/* Service */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="service">{t('contact.form.service_question')} *</label>
              <select 
                id="service" 
                className={`select select-bordered w-full ${errors.service ? 'select-error' : ''}`} 
                value={form.service} 
                onChange={e => update('service', e.target.value as SERVICE_TYPES | '')}
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="">{t('contact.form.service_options.choose')}</option>
                <option value="felulvizsgalat">{t('contact.form.service_options.inspection')}</option>
                <option value="villanyszereles">{t('contact.form.service_options.electrical')}</option>
                <option value="it-halozat">{t('contact.form.service_options.it')}</option>
                <option value="keziszerszam">{t('contact.form.service_options.tools')}</option>
                <option value="egyeb">{t('contact.form.service_options.other')}</option>
              </select>
              {errors.service && <p id="service-error" role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.service}</p>}
            </fieldset>

            {/* Client type */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="clientType">{t('contact.form.client_type')} *</label>
              <select 
                id="clientType" 
                className={`select select-bordered w-full ${errors.clientType ? 'select-error' : ''}`} 
                value={form.clientType} 
                onChange={e => update('clientType', e.target.value as CLIENT_TYPES | '')}
                aria-describedby={errors.clientType ? 'clientType-error' : undefined}
              >
                <option value="">{t('contact.form.service_options.choose')}</option>
                <option value="maganszemely">{t('contact.form.client_options.individual')}</option>
                <option value="tarsashaz">{t('contact.form.client_options.condo')}</option>
                <option value="vallalkozas">{t('contact.form.client_options.business')}</option>
              </select>
              {errors.clientType && <p id="clientType-error" role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.clientType}</p>}
            </fieldset>

            {/* Language preference */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="preferredLanguage">Preferred language / Előnyben részesített nyelv</label>
              <select 
                id="preferredLanguage" 
                className="select select-bordered w-full" 
                value={form.preferredLanguage} 
                onChange={e => update('preferredLanguage', e.target.value as 'hu' | 'en')}
              >
                <option value="hu">🇭🇺 Magyar</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </fieldset>

            {/* District */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="district">{t('contact.form.address')} *</label>
              <input 
                id="district" 
                type="text" 
                className={`input input-bordered w-full ${errors.district ? 'input-error' : ''}`} 
                value={form.district} 
                onChange={e => update('district', e.target.value)}
                aria-describedby={errors.district ? 'district-error' : undefined}
              />
              <p className="text-xs opacity-50 mt-1">{t('contact.form.address_help')}</p>
              {errors.district && <p id="district-error" role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.district}</p>}
            </fieldset>

            {/* Description */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="description">{t('contact.form.description')}</label>
              <textarea id="description" className="textarea textarea-bordered w-full" rows={4} placeholder={t('contact.form.description_placeholder')} value={form.description} onChange={e => update('description', e.target.value)} />
            </fieldset>

            {/* Preferred time */}
            <fieldset className="fieldset">
              <label className="fieldset-label" htmlFor="preferredTime">{t('contact.form.preferred_time')}</label>
              <input id="preferredTime" type="text" placeholder={t('contact.form.preferred_time_placeholder')} className="input input-bordered w-full" value={form.preferredTime} onChange={e => update('preferredTime', e.target.value)} />
            </fieldset>

            {/* Urgent */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-warning" checked={form.urgent} onChange={e => update('urgent', e.target.checked)} />
              <span>{t('contact.form.urgent_checkbox')}</span>
            </label>

            {/* Privacy */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className={`checkbox ${errors.privacy ? 'checkbox-error' : 'checkbox-primary'} mt-1`} checked={form.privacy} onChange={e => update('privacy', e.target.checked)} />
                <span className="text-sm">
                  {t('contact.form.privacy_checkbox')} <a href={`/${i18n.language === 'en' ? 'en/' : ''}adatvedelem`} target="_blank" rel="noopener noreferrer" className="link link-primary">{t('contact.form.privacy_link')}</a> {t('contact.form.privacy_suffix')} *
                </span>
              </label>
              {errors.privacy && <p role="alert" className="text-error text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.privacy}</p>}
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="submit" className="btn btn-primary btn-lg flex-1" disabled={submitting}>
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('contact.form.submit_loading')}</> : t('contact.form.submit')}
              </button>
              <a href="tel:+36302389945" className="btn btn-warning btn-lg flex-1">
                {t('contact.form.urgent_call')}
              </a>
            </div>
          </form>

          {/* Trust badges */}
          <div className="mt-8 pt-6 border-t border-base-300 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm opacity-70">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {t('contact.trust.response')}</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {t('contact.trust.detailed')}</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {t('contact.trust.confidential')}</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> {t('contact.trust.no_spam')}</span>
          </div>
        </ThemeCard>
      </section>

      {/* Google Maps */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <SectionTitle title={t('contact.service_area')} />
        <GoogleMap />
      </section>

      {/* English */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <ThemeCard hover={false} className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">{t('contact.english.title')}</h2>
          <p className="opacity-80 mb-6">
            {t('contact.english.description')}
          </p>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Switch to English if not already
              if (i18n.language !== 'en') {
                i18n.changeLanguage('en');
              }
            }}
            className="btn btn-primary btn-lg gap-2"
          >
            🇬🇧 Switch to English & Request Quote
          </button>
        </ThemeCard>
      </section>
    </>
  )
}
