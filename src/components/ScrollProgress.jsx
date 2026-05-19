import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        scaleX:          scrollYProgress,
        position:        'fixed',
        top: 0, left: 0, right: 0,
        height:          '1px',
        background:      'linear-gradient(to right, var(--accent), var(--accent-2))',
        transformOrigin: 'left',
        zIndex:          100,
      }}
    />
  )
}
