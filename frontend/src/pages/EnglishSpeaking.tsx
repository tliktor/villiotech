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
  Zap, Home, FileCheck, Wrench, Shield, Wifi, CheckCircle,
  GraduationCap, Globe, FileText, CreditCard,
  MapPin, Clock, Linkedin
} from 'lucide-react'

const whenToCallCards = [
  { icon: Zap, title: 'Power keeps tripping', description: 'Your RCD/FI relay trips repeatedly — this usually points to a wiring fault that needs professional diagnosis.' },
  { icon: Home, title: 'Old wiring concerns', description: 'Living in an older Budapest flat? Aging wiring can be a hidden safety risk. An inspection gives you clarity.' },
  { icon: FileCheck, title: 'Moving in / Apartment handover', description: 'Your landlord, notary, or insurance may require an electrical inspection report before you move in.' },
  { icon: Wrench, title: 'After renovation', description: 'Renovation done but no electrical documentation? I verify and certify the work was done safely.' },
  { icon: Shield, title: 'Landlord or insurance request', description: 'Need a safety certificate for your rental or insurance claim? I provide officially accepted reports.' },
  { icon: Wifi, title: 'Home office setup', description: 'Unreliable WiFi or need proper UTP cabling? I design and install stable network infrastructure.' },
  { icon: CheckCircle, title: 'Buying or selling property', description: 'An electrical inspection reduces risk and gives both parties confidence in the transaction.' },
]

const processSteps = [
  { number: 1, title: 'Get in touch', description: 'Call, WhatsApp, or fill out the form. Describe your situation — I respond in English within a few hours.' },
  { number: 2, title: 'Site visit', description: 'I arrive on time, assess the situation, and explain clearly what needs to be done and what it will cost.' },
  { number: 3, title: 'Work & documentation', description: 'I complete the work, take measurements with calibrated instruments, and prepare your report or invoice.' },
  { number: 4, title: 'Payment', description: 'Pay by card or cash on-site. You receive an e-invoice immediately — no chasing paperwork later.' },
]

const deliverables = [
  { icon: FileCheck, text: 'Official electrical safety report (accepted by notaries, insurers, landlords)' },
  { icon: FileText, text: 'E-invoice on-site (VAT-free for individuals)' },
  { icon: CheckCircle, text: 'Written scope of work — no hidden costs' },
  { icon: Shield, text: 'Warranty on all work performed' },
  { icon: Globe, text: 'Full English communication from start to finish' },
]

const whyChooseCards = [
  { icon: GraduationCap, title: 'Qualified engineer', description: 'Electrical engineer & certified safety inspector with legally valid measurement authority.' },
  { icon: Globe, title: 'Fluent English', description: '20 years in multinational companies. I explain what I find, what I do, and what comes next.' },
  { icon: Clock, title: 'Punctual & reliable', description: 'I confirm appointments, show up on time, and respond to messages — no ghosting.' },
  { icon: FileText, title: 'No surprises', description: 'You get a clear scope and quote before any work starts. The final invoice matches the estimate.' },
  { icon: CreditCard, title: 'Card payment on-site', description: 'Pay by card or cash. E-invoice issued immediately — no follow-up needed.' },
  { icon: Shield, title: 'Warranty included', description: "Every job comes with a warranty. If something isn't right, I come back and fix it." },
]

const typicalJobs = [
  { title: 'RCD tripping in a Buda rental', description: 'Diagnosed a faulty appliance circuit in a District 2 apartment. Fixed the wiring, issued safety report for the landlord.' },
  { title: 'Pre-purchase inspection, District 12', description: 'Full electrical assessment before buying a 1970s flat. Identified outdated wiring — buyer negotiated the price down.' },
  { title: 'Home office network, District 11', description: 'Installed Cat6 UTP cabling and access points for a remote worker. Stable connection, no more dropped video calls.' },
  { title: 'Post-renovation certification', description: 'Contractor finished but left no documentation. I inspected, measured, and provided the official report the owner needed.' },
]

const pricingRows = [
  { label: 'Call-out fee — Buda', price: '10,000 HUF (~€25)' },
  { label: 'Call-out fee — Pest (urgent cases only)', price: '20,000 HUF (~€50)' },
  { label: 'Urgent (within 4 hours)', price: '+50% surcharge' },
]

const faqData = [
  { question: 'Do you really speak English?', answer: "Yes — fluently. I spent 20 years working in multinational environments. I explain everything in plain English: what I found, what I'm doing, and what you should know." },
  { question: 'How much will it cost?', answer: "I provide a written quote before starting any work. The call-out fee is fixed (Buda: 10,000 HUF). Beyond that, pricing depends on scope — but you'll always know the cost upfront. No hidden fees." },
  { question: 'Will you actually show up on time?', answer: 'Yes. I confirm the appointment, give you a time window, and arrive when I say I will. If anything changes, I let you know in advance.' },
  { question: 'Is the documentation officially accepted?', answer: 'Yes. My inspection reports are legally valid — accepted by notaries, insurance companies, landlords, and authorities. I use calibrated instruments for all measurements.' },
  { question: 'Can I get an invoice?', answer: 'Yes. E-invoice issued on-site immediately. VAT-free for individuals, VAT invoice for businesses.' },
  { question: 'How fast can you come?', answer: 'Usually within 1–2 business days. Urgent service (within 4 hours) is available with a +50% surcharge.' },
  { question: 'Do you work in Pest?', answer: 'My main service area is Buda (districts 1, 2, 3, 11, 12). I take jobs in Pest only for urgent cases, with a 20,000 HUF call-out fee.' },
  { question: 'What is an RCD/FI relay?', answer: "A Residual Current Device — a safety switch that cuts power when it detects a fault. If yours keeps tripping, there's likely a wiring issue that needs inspection." },
  { question: 'Can I pay by card?', answer: 'Yes. Card and cash both accepted on-site.' },
]

const serviceArea = [
  { district: 'District 1', name: 'Várnegyed / Castle District' },
  { district: 'District 2', name: 'Rózsadomb, Hűvösvölgy' },
  { district: 'District 3', name: 'Óbuda' },
  { district: 'District 11', name: 'Újbuda, Gellért' },
  { district: 'District 12', name: 'Hegyvidék' },
]

export default function EnglishSpeaking() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>English-Speaking Electrician in Buda, Budapest | Villiotech</title>
        <meta name="description" content="English-speaking electrician in Buda, Budapest. Clear communication, transparent pricing, official documentation. Safety inspections, repairs, IT networking for expats." />
        <link rel="canonical" href="https://villiotech.hu/en/english-speaking" />
        <meta property="og:title" content="English-Speaking Electrician in Buda, Budapest" />
        <meta property="og:description" content="Clear communication, transparent pricing, official documentation. Serving expats and English-speaking residents in Buda." />
        <meta property="og:url" content="https://villiotech.hu/en/english-speaking" />
      </Helmet>

      <Hero
        title="English-speaking electrician in Buda"
        subtitle={'Clear communication, transparent pricing, official documentation.\nSafety inspections · Electrical work · IT networking'}
        cta1={{ label: 'Request a Quote', to: '/kapcsolat?lng=en' }}
        cta2={{ label: '📱 WhatsApp', href: 'https://wa.me/36302389945' }}
      />

      {/* When to Call */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="When to call an electrician" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whenToCallCards.map((card, i) => {
              const Icon = card.icon
              return (
                <ThemeCard key={i} delay={i * 0.05}>
                  <div className="text-center">
                    <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">{card.title}</h3>
                    <p className="text-sm opacity-70">{card.description}</p>
                  </div>
                </ThemeCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="How it works" />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="What you get" />
          <DeliverablesList items={deliverables} />
        </div>
      </section>

      {/* Typical Jobs */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Typical jobs" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {typicalJobs.map((job, i) => (
              <ThemeCard key={i} delay={i * 0.05}>
                <h3 className="font-bold mb-2">{job.title}</h3>
                <p className="text-sm opacity-70">{job.description}</p>
              </ThemeCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Why clients choose me" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseCards.map((card, i) => {
              const Icon = card.icon
              return (
                <ThemeCard key={i} delay={i * 0.05}>
                  <div className="text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">{card.title}</h3>
                    <p className="text-sm opacity-70">{card.description}</p>
                  </div>
                </ThemeCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Service area" />
          <div className="max-w-2xl mx-auto">
            <ThemeCard hover={false}>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="font-medium">Based in Buda, Budapest. Serving the following districts:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-9">
                {serviceArea.map((area, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-semibold">{area.district}</span>
                    <span className="opacity-60"> — {area.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm opacity-60 mt-4 ml-9">Pest available for urgent cases only (20,000 HUF call-out fee).</p>
            </ThemeCard>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Transparent pricing" />
          <div className="max-w-lg mx-auto">
            <PricingTable
              rows={pricingRows}
              note="You receive a written quote before work begins. No hidden costs."
            />
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="About me" />
          <div className="max-w-2xl mx-auto">
            <ThemeCard hover={false}>
              <p className="leading-relaxed mb-3">
                I'm Tibor, an electrical engineer and certified safety inspector based in Buda. I spent 20 years in multinational companies before starting my own practice — bringing the same standards of precision, punctuality, and clear communication to every job.
              </p>
              <p className="leading-relaxed mb-4">
                I work with calibrated instruments, provide legally valid documentation, and explain everything in plain English. No jargon, no surprises.
              </p>
              <a
                href="https://www.linkedin.com/in/tiborliktor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <Linkedin className="w-4 h-4" />
                View my LinkedIn profile
              </a>
            </ThemeCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Frequently asked questions" />
          <div className="max-w-3xl mx-auto">
            <FAQ items={faqData} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Need an electrician who speaks English?"
        subtitle="Based in Buda. Clear pricing, official documentation, no language barrier."
        cta1={{ label: 'Request a Quote', to: '/kapcsolat?lng=en' }}
        cta2={{ label: '📱 WhatsApp', href: 'https://wa.me/36302389945' }}
      />
    </>
  )
}