import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function GlassCard({ children, className = '', style = {}, tilt = false }) {
  const ref = useRef(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)
  const sx  = useSpring(x, { stiffness: 200, damping: 20 })
  const sy  = useSpring(y, { stiffness: 200, damping: 20 })
  const rx  = useTransform(sy, [-0.5, 0.5], ['6deg',  '-6deg'])
  const ry  = useTransform(sx, [-0.5, 0.5], ['-6deg', '6deg'])

  const onMove = e => {
    if (!tilt || !ref.current) return
    const r  = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width  - 0.5)
    y.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      className={`card ${className}`}
      style={{ rotateX: tilt ? rx : 0, rotateY: tilt ? ry : 0, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ borderColor: 'rgba(255,255,255,0.14)', y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}
