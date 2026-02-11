import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { fadeInUp, staggerContainer, defaultTransition } from '../utils/animations'

interface HeroProps {
  title?: string
  subtitle: string
  cta1: { label: string; to: string }
  cta2?: { label: string; to?: string; href?: string }
}

export default function Hero({ title, subtitle, cta1, cta2 }: HeroProps) {
  const { isDark } = useTheme()

  return (
    <section className={`py-20 md:py-28 transition-theme ${isDark ? '' : ''}`}>
      <motion.div 
        className="max-w-4xl mx-auto px-4 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {title && (
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            variants={fadeInUp}
            transition={defaultTransition}
          >
            {title}
          </motion.h1>
        )}
        <motion.p 
          className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto"
          variants={fadeInUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          style={{ whiteSpace: 'pre-line' }}
        >
          {subtitle}
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
          transition={{ ...defaultTransition, delay: 0.2 }}
        >
          <Link to={cta1.to} className="btn btn-primary btn-lg">
            {cta1.label}
          </Link>
          {cta2 && (
            cta2.href ? (
              <a href={cta2.href} className="btn btn-outline btn-lg">
                {cta2.label}
              </a>
            ) : (
              <Link to={cta2.to!} className="btn btn-outline btn-lg">
                {cta2.label}
              </Link>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
