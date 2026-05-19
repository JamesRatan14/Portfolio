import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered,  setHovered]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const sx = useSpring(mx, { stiffness: 500, damping: 30 })
  const sy = useSpring(my, { stiffness: 500, damping: 30 })
  const rx = useSpring(mx, { stiffness: 120, damping: 24 })
  const ry = useSpring(my, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onMove = e => { mx.set(e.clientX); my.set(e.clientY) }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    const onEnter = e => { if (e.target.closest('a,button,[data-hover]')) setHovered(true) }
    const onLeave = e => { if (e.target.closest('a,button,[data-hover]')) setHovered(false) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseover',  onEnter)
    document.addEventListener('mouseout',   onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseover',  onEnter)
      document.removeEventListener('mouseout',   onLeave)
    }
  }, [mx, my])

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          x: sx, y: sy,
          position:   'fixed',
          top:        0, left: 0,
          width:      hovered ? 10 : 6,
          height:     hovered ? 10 : 6,
          background: hovered ? 'var(--accent)' : '#fff',
          borderRadius: '50%',
          transform:  'translate(-50%,-50%)',
          zIndex:     9999,
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          scale:      clicking ? 0.6 : 1,
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          x: rx, y: ry,
          position:   'fixed',
          top: 0, left: 0,
          width:        hovered ? 44 : 32,
          height:       hovered ? 44 : 32,
          borderRadius: '50%',
          border:       `1px solid ${hovered ? 'var(--accent)' : 'rgba(255,255,255,0.35)'}`,
          transform:    'translate(-50%,-50%)',
          zIndex:       9998,
          pointerEvents: 'none',
          transition:   'width 0.25s, height 0.25s, border-color 0.25s',
          scale:        clicking ? 0.85 : 1,
          mixBlendMode: 'normal',
        }}
      />
    </>
  )
}
