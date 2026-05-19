import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa6'

/* ── Word reveal ─────────────────────────────────────────────── */
function WordReveal({ words, delay = 0, className = '', style = {} }) {
  return (
    <span className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ── Magnetic button ─────────────────────────────────────────── */
function MagneticBtn({ children, onClick, href, download, solid }) {
  const ref = useRef(null)
  const x   = useMotionValue(0), y = useMotionValue(0)
  const sx  = useSpring(x, { stiffness: 250, damping: 18 })
  const sy  = useSpring(y, { stiffness: 250, damping: 18 })

  const onMove  = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.25)
    y.set((e.clientY - r.top  - r.height / 2) * 0.25)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const baseStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '13px 26px', borderRadius: '10px',
    fontSize: '0.875rem', fontWeight: 600,
    border:      solid ? 'none' : '1px solid rgba(255,255,255,0.13)',
    background:  solid ? '#fff' : 'rgba(255,255,255,0.04)',
    color:       solid ? '#000' : 'var(--gray-1)',
    whiteSpace:  'nowrap',
  }

  const Tag      = href ? motion.a : motion.button
  const tagProps = href ? { href, download } : { onClick }

  return (
    <Tag ref={ref} data-hover style={{ ...baseStyle, x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }} {...tagProps}>
      {children}
    </Tag>
  )
}

const SOCIAL = [
  { Icon: FaGithub,   href: 'https://github.com/JamesRatan14',    label: 'GitHub' },
  { Icon: FaLinkedin, href: 'https://linkedin.com/in/jamesratan', label: 'LinkedIn' },
]


/* ── Component ───────────────────────────────────────────────── */
export default function Hero() {
  const { scrollY }  = useScroll()
  const opacity      = useTransform(scrollY, [0, 300], [1, 0])
  const yVal         = useTransform(scrollY, [0, 300], [0, 60])

  return (
    <section id="hero" style={{
      minHeight: '100svh', background: 'var(--black)',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Noise texture for depth */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Top-left hard spotlight */}
      <div style={{
        position: 'absolute', top: -120, left: -120, width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Top-right blue accent */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Main violet blob — centre */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-25%', left: '15%',
          width: 900, height: 900,
          background: 'radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 58%)',
          pointerEvents: 'none',
        }} />

      {/* Blue blob — mid-right */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', top: '15%', right: '-10%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(96,165,250,0.20) 0%, transparent 58%)',
          pointerEvents: 'none',
        }} />

      {/* Violet blob — bottom */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.70, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute', bottom: '-20%', left: '-5%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 62%)',
          pointerEvents: 'none',
        }} />

      {/* Decorative large ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900, height: 900,
        borderRadius: '50%',
        border: '1px solid rgba(167,139,250,0.07)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650, height: 650,
        borderRadius: '50%',
        border: '1px solid rgba(96,165,250,0.06)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade to black */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
        background: 'linear-gradient(to top, #000, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div style={{ opacity, y: yVal }}
        className="max-w-6xl mx-auto px-6 w-full py-24 grid md:grid-cols-5 gap-10 items-center">

        {/* ── LEFT ─────────────────────────────────────── */}
        <div className="md:col-span-3 flex flex-col gap-7">

          {/* Name */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base font-medium" style={{ color: 'var(--gray-2)' }}>
            James Ratan Dukkipati
          </motion.p>

          {/* Main heading */}
          <div className="font-bold tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', color: 'var(--white)' }}>
            <WordReveal words={['Software', 'Engineer']} delay={0.3} />
            <WordReveal words={['&', 'AI', 'Builder']} delay={0.5}
              style={{ backgroundImage: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
          </div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="text-base leading-8 max-w-lg" style={{ color: 'var(--gray-2)' }}>
            M.S. Computer Science — AI Track at Binghamton University. I build production AI systems,
            full-stack products, and have hands-on cybersecurity experience from a
            defense-sector internship at DRDO.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap gap-3">
            <MagneticBtn solid onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </MagneticBtn>
            <MagneticBtn href="/James_Resume.pdf" download>
              Download Resume
            </MagneticBtn>
          </motion.div>

          {/* Social */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="flex items-center gap-5">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                data-hover aria-label={label}
                style={{ color: 'var(--gray-2)', transition: 'color 0.15s' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--white)'}
                onMouseOut={e  => e.currentTarget.style.color = 'var(--gray-2)'}>
                <Icon size={22} />
              </a>
            ))}
            <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--gray-2)' }}>jamesratand@gmail.com</span>
          </motion.div>
        </div>

        {/* ── RIGHT — Photo ────────────────────────────── */}
        <motion.div
          className="md:col-span-2 hidden md:flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ position: 'relative' }}>
            {/* Glow behind photo */}
            <div style={{
              position: 'absolute', inset: -24,
              background: 'radial-gradient(ellipse, rgba(167,139,250,0.18) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            {/* Photo */}
            <div style={{
              width: 340, height: 400,
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(167,139,250,0.25)',
              boxShadow: '0 0 60px rgba(167,139,250,0.10)',
              position: 'relative',
            }}>
              <img
                src="/avatar.jpg"
                alt="James Ratan Dukkipati"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              {/* Bottom gradient fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              }} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--gray-3)' }}>
        <FaArrowDown size={15} />
      </motion.div>
    </section>
  )
}
