import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionHeader({ label, title, subtitle }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mb-16">
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest font-mono mb-3"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: 'var(--white)' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-base"
          style={{ color: 'var(--gray-2)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
