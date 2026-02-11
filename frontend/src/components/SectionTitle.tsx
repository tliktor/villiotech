import { motion } from 'framer-motion'
import { fadeInUp, defaultTransition } from '../utils/animations'

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div 
      className="text-center mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3"
        variants={fadeInUp}
        transition={defaultTransition}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className="text-lg opacity-70 max-w-2xl mx-auto"
          variants={fadeInUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
