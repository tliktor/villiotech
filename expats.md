> # Expat Landing Page - Tervezés és Implementáció

## 1. IA/UX Döntés - MVP Javaslat

Javaslat: Opció A - /english landing page

Indoklás:
- ✅ Gyorsabb implementáció (1-2 óra vs 1-2 nap)
- ✅ Nem kell átstrukturálni a teljes site-ot
- ✅ SEO: dedikált URL expatoknak (/english)
- ✅ Később könnyen migrálható /en/ struktúrára
- ✅ A magyar oldal marad érintetlen
- ✅ Könnyebb A/B tesztelni

Opció B (/en/ teljes struktúra) későbbre, ha:
- Látod, hogy 30%+ traffic angol
- Minden aloldalt le akarnak fordítani
- Van kapacitás karbantartani 2 párhuzamos struktúrát

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 2. Új Oldal Tartalma

### Hero
Title: "Electrical Services in English – Buda, Budapest"
Subtitle: "Licensed electrical engineer serving expats and English-speaking residents. Safety inspections, repairs, IT networking – clear communication, official documentation."
CTA1: "Request a Quote"
CTA2: "Call Now: +36 30 238 9945"


### When to Call (7 situations)
1. Power keeps tripping – RCD/FI relay trips frequently
2. Old wiring concerns – Older Budapest flat, worried about safety
3. Moving in / Apartment handover – Need official inspection report
4. Renovation completed – Documentation for new electrical work
5. Landlord requirement – Safety certificate for rental property
6. Home office setup – Stable WiFi, UTP network installation
7. Buying/selling property – Notary requires electrical inspection

### How It Works (4 steps)
1. Contact – Call or fill form, we discuss your needs in English
2. Site visit – Arrive on time, assess the situation, explain the work
3. Work & Documentation – Complete work, provide official report/invoice
4. Payment – Cash or card on-site, e-invoice immediately

### What You Get
- Official electrical safety report (accepted by authorities/notary)
- Detailed invoice (VAT-free for individuals, VAT for businesses)
- Clear scope of work – no hidden costs
- Warranty on all work performed
- English communication throughout

### Pricing Basics
Call-out fee – Buda: 10,000 HUF (~€25)
Call-out fee – Pest: 20,000 HUF (~€50, exceptionally)
Urgent (within 4 hours): +50% surcharge
Minimum work fee: from 50,000 HUF depending on scope


### Why Choose Me (WhyMe adapted)
- Licensed electrical engineer & safety inspector
- 20 years multinational experience – clear English communication
- Calibrated instruments – official, legally valid measurements
- Transparent pricing – itemized quote before work
- Card payment accepted on-site

### FAQ (Expat-specific)
Q: Do you speak English?
A: Yes, fluently. I worked 20 years in multinational environments.

Q: Can I get an official invoice?
A: Yes. VAT-free for individuals, VAT invoice for businesses. E-invoice on-site.

Q: How fast can you come?
A: Usually within 1-2 business days. Urgent service (4h) available with +50% surcharge.

Q: Do you work in Pest?
A: My main area is Buda. I work in Pest exceptionally with 20,000 HUF call-out fee.

Q: What is RCD/FI relay?
A: Residual Current Device – safety switch that trips when detecting electrical fault. If it trips frequently, there's likely a wiring issue.

Q: Is this official documentation?
A: Yes. The inspection report is legally valid, accepted by notaries, authorities, and insurance companies.

Q: Can I pay by card?
A: Yes, card payment available on-site.

### Final CTA
Title: "Need an Electrician Who Speaks English?"
Subtitle: "Serving Buda, Budapest. Licensed engineer, clear communication, official documentation."
CTA1: "Request a Quote"
CTA2: "WhatsApp: +36 30 238 9945"


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 3. Routing + Navigáció

### App.tsx - új route
tsx
import English from './pages/English'

// Routes tömbben:
{ path: '/english', element: <English /> }


### Navbar.tsx - új menüpont
tsx
// services dropdown után:
<li><Link to="/english">🇬🇧 English Service</Link></li>


### Home.tsx - 4. célcsoport kártya
tsx
// A 3 meglévő kártya után:
<Link to="/english" className="cursor-pointer hover:scale-105 transition-transform">
  <ThemeCard className="flex flex-col justify-between h-full">
    <div>
      <div className="text-4xl mb-4">🇬🇧</div>
      <h3 className="text-xl font-bold mb-2">Expats & English Speakers</h3>
      <p className="text-sm opacity-70 mb-4">
        Licensed electrical engineer serving English-speaking residents in Buda.
        Safety inspections, repairs, IT networking – clear communication, official documentation.
      </p>
    </div>
    <div className="btn btn-sm btn-ghost text-primary gap-1 self-start">
      Learn more <ArrowRight className="w-4 h-4" />
    </div>
  </ThemeCard>
</Link>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 4. Kapcsolat/Űrlap Kiegészítés

### Kapcsolat.tsx - nyelv választó
tsx
// Form fields után, description előtt:
<div>
  <label className="label">
    <span className="label-text font-medium">Preferred language / Előnyben részesített nyelv</span>
  </label>
  <select
    name="preferredLanguage"
    value={formData.preferredLanguage || 'hu'}
    onChange={handleChange}
    className="select select-bordered w-full"
  >
    <option value="hu">🇭🇺 Magyar</option>
    <option value="en">🇬🇧 English</option>
  </select>
</div>


### ContactFormData type frissítés
tsx
// types/contact.ts
export interface ContactFormData {
  name: string
  phone: string
  email?: string
  service: string
  clientType: 'individual' | 'condo' | 'business'
  address: string
  description: string
  preferredTime?: string
  urgent: boolean
  preferredLanguage?: 'hu' | 'en'  // ÚJ
  privacyAccepted: boolean
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 5. Kódstruktúra

### src/pages/English.tsx (teljes fájl)

tsx
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ThemeCard from '../components/ThemeCard'
import ProcessSteps from '../components/ProcessSteps'
import DeliverablesList from '../components/DeliverablesList'
import PricingTable from '../components/PricingTable'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import {
  Zap, Home, FileCheck, Wrench, Shield, Wifi,
  CheckCircle, Phone, MessageCircle
} from 'lucide-react'

// Content constants (ready for i18n migration)
const CONTENT = {
  hero: {
    title: 'Electrical Services in English – Buda, Budapest',
    subtitle: 'Licensed electrical engineer serving expats and English-speaking residents. Safety inspections, repairs, IT networking – clear communication, official documentation.',
    cta1: 'Request a Quote',
    cta2: 'Call Now'
  },
  whenToCall: [
    { icon: Zap, title: 'Power keeps tripping', desc: 'RCD/FI relay trips frequently – likely wiring issue' },
    { icon: Home, title: 'Old wiring concerns', desc: 'Older Budapest flat, worried about electrical safety' },
    { icon: FileCheck, title: 'Moving in / Handover', desc: 'Need official inspection report for apartment' },
    { icon: Wrench, title: 'Renovation completed', desc: 'Documentation required for new electrical work' },
    { icon: Shield, title: 'Landlord requirement', desc: 'Safety certificate needed for rental property' },
    { icon: Wifi, title: 'Home office setup', desc: 'Stable WiFi, UTP network installation' },
    { icon: CheckCircle, title: 'Buying/selling property', desc: 'Notary requires electrical inspection' }
  ],
  processSteps: [
    { number: 1, title: 'Contact', description: 'Call or fill form – we discuss your needs in English' },
    { number: 2, title: 'Site visit', description: 'Arrive on time, assess situation, explain the work' },
    { number: 3, title: 'Work & Documentation', description: 'Complete work, provide official report/invoice' },
    { number: 4, title: 'Payment', description: 'Cash or card on-site, e-invoice immediately' }
  ],
  deliverables: [
    { icon: FileCheck, text: 'Official electrical safety report' },
    { icon: FileCheck, text: 'Detailed invoice (VAT-free or VAT)' },
    { icon: CheckCircle, text: 'Clear scope – no hidden costs' },
    { icon: Shield, text: 'Warranty on all work' },
    { icon: MessageCircle, text: 'English communication' }
  ],
  pricingRows: [
    { label: 'Call-out – Buda', price: '10,000 HUF (~€25)' },
    { label: 'Call-out – Pest (exceptionally)', price: '20,000 HUF (~€50)' },
    { label: 'Urgent (within 4 hours)', price: '+50% surcharge' }
  ],
  whyMe: [
    { icon: GraduationCap, title: 'Licensed Engineer', desc: 'Electrical engineer & certified safety inspector' },
    { icon: Globe, title: 'Fluent English', desc: '20 years multinational experience – clear communication' },
    { icon: Ruler, title: 'Official Documentation', desc: 'Calibrated instruments – legally valid measurements' },
    { icon: FileText, title: 'Transparent Pricing', desc: 'Itemized quote before work – no surprises' },
    { icon: CreditCard, title: 'Card Payment', desc: 'Cash or card accepted on-site' },
    { icon: Shield, title: 'Warranty', desc: 'Guarantee on all work performed' }
  ],
  faq: [
    {
      question: 'Do you speak English?',
      answer: 'Yes, fluently. I worked 20 years in multinational environments and serve many expat clients in Buda.'
    },
    {
      question: 'Can I get an official invoice?',
      answer: 'Yes. VAT-free invoice for individuals, VAT invoice for businesses. E-invoice issued on-site immediately.'
    },
    {
      question: 'How fast can you come?',
      answer: 'Usually within 1-2 business days. Urgent service (within 4 hours) available with +50% surcharge.'
    },
    {
      question: 'Do you work in Pest?',
      answer: 'My main service area is Buda (districts 1, 2, 3, 11, 12). I work in Pest exceptionally with 20,000 HUF call-out fee.'
    },
    {
      question: 'What is RCD/FI relay?',
      answer: 'Residual Current Device (RCD) – a safety switch that trips when detecting electrical fault. If it trips frequently, there\'s likely a wiring issue that needs inspection.'
    },
    {
      question: 'Is this official documentation?',
      answer: 'Yes. The inspection report is legally valid and accepted by notaries, authorities, insurance companies, and landlords.'
    },
    {
      question: 'Can I pay by card?',
      answer: 'Yes, card payment is available on-site. Cash also accepted.'
    }
  ]
}

export default function English() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Electrical Services in English – Buda, Budapest | Villiotech</title>
        <meta name="description" content="Licensed electrical engineer serving expats in Buda. Safety inspections, repairs, IT networking. Fluent English, official documentation, transparent pricing." />
        <link rel="canonical" href="https://villiotech.hu/english" />
      </Helmet>

      {/* Hero */}
      <Hero
        title={CONTENT.hero.title}
        subtitle={CONTENT.hero.subtitle}
        cta1={{ label: CONTENT.hero.cta1, to: '/kapcsolat?lng=en' }}
        cta2={{ label: CONTENT.hero.cta2, href: 'tel:+36302389945' }}
      />
    
      {/* When to Call */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionTitle title="When to Call an Electrician" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT.whenToCall.map((item, i) => (
            <ThemeCard key={i} className="text-center" delay={i * 0.05}>
              <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm opacity-70">{item.desc}</p>
            </ThemeCard>
          ))}
        </div>
      </section>
    
      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="How It Works" />
        <ProcessSteps steps={CONTENT.processSteps} />
      </section>
    
      {/* What You Get */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="What You Get" />
        <DeliverablesList items={CONTENT.deliverables} />
      </section>
    
      {/* Why Choose Me */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Why Choose Me" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTENT.whyMe.map((item, i) => (
            <ThemeCard key={i} className="text-center" delay={i * 0.05}>
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm opacity-70">{item.desc}</p>
            </ThemeCard>
          ))}
        </div>
      </section>
    
      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Transparent Pricing" />
        <div className="max-w-lg mx-auto">
          <PricingTable
            rows={CONTENT.pricingRows}
            note="Final price depends on scope of work. Itemized quote provided before starting."
          />
        </div>
      </section>
    
      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <SectionTitle title="Frequently Asked Questions" />
        <FAQ items={CONTENT.faq} />
      </section>
    
      {/* Final CTA */}
      <CTASection
        title="Need an Electrician Who Speaks English?"
        subtitle="Serving Buda, Budapest. Licensed engineer, clear communication, official documentation."
        cta1={{ label: 'Request a Quote', to: '/kapcsolat?lng=en' }}
        cta2={{ label: '📱 WhatsApp', href: 'https://wa.me/36302389945' }}
      />
    </>
  )
}


### Missing imports fix
tsx
import { GraduationCap, Globe, Ruler, FileText, CreditCard } from 'lucide-react'


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## 6. Mérőszámok (Analytics)

Trackelendő események:

typescript
// Google Analytics 4 events
{
  'expat_page_view': { page: '/english' },
  'expat_cta_click': { cta_type: 'hero_quote' | 'hero_call' | 'final_quote' | 'final_whatsapp' },
  'expat_form_start': { language: 'en' },
  'expat_form_submit': { language: 'en', service: string },
  'expat_phone_click': { source: 'hero' | 'cta' | 'sticky' },
  'expat_whatsapp_click': {},
  'expat_scroll_depth': { depth: '25%' | '50%' | '75%' | '100%' }
}


Konverziós tölcsér:
1. Page view → 2. CTA click → 3. Form start → 4. Form submit
2. Page view → Phone/WhatsApp click (direct conversion)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


## Implementációs Sorrend

1. ✅ English.tsx létrehozása (30 perc)
2. ✅ Route hozzáadása App.tsx-ben (5 perc)
3. ✅ Navbar link (5 perc)
4. ✅ Home.tsx 4. kártya (10 perc)
5. ✅ Kapcsolat.tsx nyelv mező (15 perc)
6. ✅ ContactFormData type frissítés (5 perc)
7. ✅ Tesztelés (20 perc)

Teljes idő: ~1.5 óra

módosító javaslat:



Nagyon jó irány, és MVP-nek kifejezetten működőképes. Látszik, hogy expat “job-to-be-done” logikával írtad (bizonytalanság csökkentése, folyamat, dokumentáció, ár-keretek, gyors CTA), ami pont az a különbség a társasházi/üzemi fókuszhoz képest.



Ami különösen erős:

\- /english külön landing: gyors, nem borítja a jelenlegi IA-t, és később migrálható /en/-re.

\- “When to call” + “How it works” + “What you get”: nagyon jó konverziós gerinc.

\- Árazás keretekkel: expatoknál ez bizalomépítő (feltéve, hogy vállalható).

\- FAQ: jó kifogáskezelés, főleg számla/dokumentáció/gyorsaság.



Amit finomítanék (hogy kevésbé legyen kockázatos/jogi-SEO szempontból pontosabb):

1) „Licensed electrical engineer” / „official report accepted by authorities/notary” — ezeket érdemes óvatosabban megfogalmazni, ha nincs minden esetre 100% lefedettség. Javaslat: „qualified electrician / certified inspector” és „commonly accepted for…” + egy csillagozás: „depending on the specific requirement”.
2) „VAT-free for individuals, VAT for businesses” — ez Magyarországon könyvelési/jogi részletektől függhet. Biztonságosabb: „Invoice provided (VAT according to regulations)” vagy „VAT status depends on the client/type of service” + kontakt.
3) „Payment – cash or card on-site” — csak akkor írd így, ha tényleg mindig van kártya; különben: „cash / bank transfer / card (if available)”.
4) Pricing: a minimum work fee „from 50,000 HUF” lehet sokkoló; ha ez valós, oké, de érdemes mellétenni példát („typical small repair from …”) vagy „diagnostic + recommendation” opciót, hogy ne essen ki a lead.
5) Pest fókusz: jó, hogy Buda-first, de a „exceptionally” kicsit elutasító hangulatú. Alternatíva: „Primarily Buda. Pest available with higher call-out fee.”



Tartalmi javaslatok (kis befektetés, nagy hatás):

\- Tegyél be 1 rövid „Service area” mini térképet/szöveget (Buda kerületek felsorolása), és külön „Emergency” dobozt (mit jelent a 4h, mikor vállalható).

\- Adj 3 nagyon rövid „Typical jobs” példát (1-1 sor), mert az expatok gyakran konkrét példára rezonálnak.

\- CTA-k: „Request a Quote” mellé egy „Prefer English” jelölő a /kapcsolat űrlapon (ahogy korábban is javasoltuk) — ez konzisztens.



IA/URL apróság:

\- A /english működik, de SEO és bővíthetőség miatt én inkább /en-t (vagy /en/english-speaking) választanék MVP-nek is, hogy később ne kelljen átnevezni. Ha marad /english, legalább készülj 301 redirect tervvel későbbre.



Összegzés: a váz erős és konverzió-orientált; a fő finomítások a túl erős állítások „puhítása” (jogi/valódiság), az árazás kommunikációjának óvatos hangolása, és a /en vs /english döntés hosszútávú SEO szempontból.