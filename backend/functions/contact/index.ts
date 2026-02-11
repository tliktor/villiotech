import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { validateContactForm, sanitize } from './validator'
import { checkRateLimit, updateRateLimit } from './rateLimit'
import { SERVICE_TYPES, CLIENT_TYPES } from './types'

const ses = new SESClient({ region: process.env.AWS_REGION || 'eu-central-1' })
const RECIPIENT = process.env.RECIPIENT_EMAIL || 'info@villiotech.hu'
const SENDER = process.env.SENDER_EMAIL || 'noreply@villiotech.hu'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://d1wsqe7tpbsupy.cloudfront.net'

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  // CORS preflight
  if (event.requestContext.http.method === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' }
  }

  // Rate limiting
  const clientIp = event.requestContext.http.sourceIp
  const canProceed = await checkRateLimit(clientIp)
  if (!canProceed) {
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Túl sok kérés. Kérjük, próbálja újra 1 óra múlva.' })
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')

    // Honeypot check – ha a rejtett mező ki van töltve, bot
    if (body.website) {
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true }) }
    }

    // Timestamp check – min. 3 másodperc kitöltési idő
    const formLoadedAt = body._loadedAt
    if (formLoadedAt && Date.now() - formLoadedAt < 3000) {
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true }) }
    }

    // Validáció
    const validation = validateContactForm(body)
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, errors: validation.errors }),
      }
    }

    // Email összeállítás
    const serviceLabels: Record<string, string> = {
      [SERVICE_TYPES.WEB_DEVELOPMENT]: 'Villamos biztonsági felülvizsgálat',
      [SERVICE_TYPES.MOBILE_APP]: 'Villanyszerelés / javítás',
      [SERVICE_TYPES.CLOUD_SOLUTIONS]: 'IT hálózat (WiFi / UTP)',
      [SERVICE_TYPES.CONSULTING]: 'Kéziszerszám felülvizsgálat',
      [SERVICE_TYPES.OTHER]: 'Egyéb',
    }
    const clientLabels: Record<string, string> = {
      [CLIENT_TYPES.INDIVIDUAL]: 'Magánszemély',
      [CLIENT_TYPES.SMALL_BUSINESS]: 'Társasház',
      [CLIENT_TYPES.ENTERPRISE]: 'Vállalkozás',
    }

    const name = sanitize(body.name)
    const phone = sanitize(body.phone)
    const email = sanitize(body.email || 'Nem adott meg')
    const service = serviceLabels[body.service] || body.service
    const clientType = clientLabels[body.clientType] || body.clientType
    const district = sanitize(body.district)
    const description = sanitize(body.description || 'Nem adott meg leírást')
    const preferredTime = sanitize(body.preferredTime || 'Nem adott meg')
    const urgent = body.urgent ? '⚠️ SÜRGŐS (4 órán belül)' : 'Nem sürgős'

    const subject = `${body.urgent ? '🔴 SÜRGŐS ' : ''}Ajánlatkérés: ${service} – ${name}`

    const htmlBody = `
      <h2>Új ajánlatkérés érkezett</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Név</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-mail</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Szolgáltatás</td><td style="padding:8px;border:1px solid #ddd;">${service}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Ügyfél típus</td><td style="padding:8px;border:1px solid #ddd;">${clientType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Kerület</td><td style="padding:8px;border:1px solid #ddd;">${district}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Leírás</td><td style="padding:8px;border:1px solid #ddd;">${description}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Időpont</td><td style="padding:8px;border:1px solid #ddd;">${preferredTime}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Sürgősség</td><td style="padding:8px;border:1px solid #ddd;">${urgent}</td></tr>
      </table>
    `

    await ses.send(new SendEmailCommand({
      Source: SENDER,
      Destination: { ToAddresses: [RECIPIENT] },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: { Html: { Data: htmlBody, Charset: 'UTF-8' } },
      },
    }))

    // Update rate limit after successful send
    await updateRateLimit(clientIp)

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Szerverhiba. Kérjük, próbálja újra később.' }),
    }
  }
}
