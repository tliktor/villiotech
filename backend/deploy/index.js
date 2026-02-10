"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const validator_1 = require("./validator");
const ses = new client_ses_1.SESClient({ region: process.env.AWS_REGION || 'eu-central-1' });
const RECIPIENT = process.env.RECIPIENT_EMAIL || 'info@villiotech.hu';
const SENDER = process.env.SENDER_EMAIL || 'noreply@villiotech.hu';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://d1wsqe7tpbsupy.cloudfront.net';
const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const handler = async (event) => {
    // CORS preflight
    if (event.requestContext.http.method === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders, body: '' };
    }
    try {
        const body = JSON.parse(event.body || '{}');
        // Honeypot check – ha a rejtett mező ki van töltve, bot
        if (body.website) {
            return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true }) };
        }
        // Timestamp check – min. 3 másodperc kitöltési idő
        const formLoadedAt = body._loadedAt;
        if (formLoadedAt && Date.now() - formLoadedAt < 3000) {
            return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true }) };
        }
        // Validáció
        const validation = (0, validator_1.validateContactForm)(body);
        if (!validation.valid) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ success: false, errors: validation.errors }),
            };
        }
        // Email összeállítás
        const serviceLabels = {
            felulvizsgalat: 'Villamos biztonsági felülvizsgálat',
            villanyszereles: 'Villanyszerelés / javítás',
            'it-halozat': 'IT hálózat (WiFi / UTP)',
            keziszerszam: 'Kéziszerszám felülvizsgálat',
            egyeb: 'Egyéb',
        };
        const clientLabels = {
            maganszemely: 'Magánszemély',
            tarsashaz: 'Társasház',
            vallalkozas: 'Vállalkozás',
        };
        const name = (0, validator_1.sanitize)(body.name);
        const phone = (0, validator_1.sanitize)(body.phone);
        const email = (0, validator_1.sanitize)(body.email || 'Nem adott meg');
        const service = serviceLabels[body.service] || body.service;
        const clientType = clientLabels[body.clientType] || body.clientType;
        const district = (0, validator_1.sanitize)(body.district);
        const description = (0, validator_1.sanitize)(body.description || 'Nem adott meg leírást');
        const preferredTime = (0, validator_1.sanitize)(body.preferredTime || 'Nem adott meg');
        const urgent = body.urgent ? '⚠️ SÜRGŐS (4 órán belül)' : 'Nem sürgős';
        const subject = `${body.urgent ? '🔴 SÜRGŐS ' : ''}Ajánlatkérés: ${service} – ${name}`;
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
    `;
        await ses.send(new client_ses_1.SendEmailCommand({
            Source: SENDER,
            Destination: { ToAddresses: [RECIPIENT] },
            Message: {
                Subject: { Data: subject, Charset: 'UTF-8' },
                Body: { Html: { Data: htmlBody, Charset: 'UTF-8' } },
            },
        }));
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ success: true }),
        };
    }
    catch (error) {
        console.error('Contact form error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ success: false, error: 'Szerverhiba. Kérjük, próbálja újra később.' }),
        };
    }
};
exports.handler = handler;
