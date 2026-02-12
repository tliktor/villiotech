import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { MapPin, CreditCard, FileCheck } from 'lucide-react'
import { fadeInUp, staggerContainer, defaultTransition } from '../utils/animations'

interface CTASectionProps {
  title: string
  subtitle?: string
  cta1?: { label: string; to: string }
  cta2?: { label: string; href?: string; to?: string }
}

export default function CTASection({ title, subtitle, cta1, cta2 }: CTASectionProps) {
  const { isDark } = useTheme()
  const { t } = useTranslation()

  return (
    <section className={`py-16 transition-theme ${isDark ? 'glass-card-strong' : 'neu-convex'}`}>
      <motion.div 
        className="max-w-4xl mx-auto px-4 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          variants={fadeInUp}
          transition={defaultTransition}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p 
            className="text-lg opacity-80 mb-8"
            variants={fadeInUp}
            transition={{ ...defaultTransition, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          variants={fadeInUp}
          transition={{ ...defaultTransition, delay: 0.2 }}
        >
          {cta1 && (
            <Link to={cta1.to} className="btn btn-primary btn-lg">{cta1.label}</Link>
          )}
          {cta2 && (
            cta2.href ? (
              <a href={cta2.href} className="btn btn-outline btn-lg">{cta2.label}</a>
            ) : (
              <Link to={cta2.to!} className="btn btn-outline btn-lg">{cta2.label}</Link>
            )
          )}
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6 text-sm opacity-70"
          variants={fadeInUp}
          transition={{ ...defaultTransition, delay: 0.3 }}
        >
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {t('common.features.location')}</span>
          <Link to="/en/english-speaking" className="flex items-center gap-1 hover:text-primary transition-colors">🇬🇧 English service</Link>
          <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> {t('common.features.card_payment')}</span>
          <span className="flex items-center gap-1"><FileCheck className="w-4 h-4" /> {t('common.features.einvoice_onsite')}</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
