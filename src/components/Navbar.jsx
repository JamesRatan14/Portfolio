import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { FaBars, FaXmark } from 'react-icons/fa6'

const NAV = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar({ onResumeClick }) {
  const [scrolled, setScrolled]     = useState(false)
  const [active,   setActive]       = useState('')
  const [open,     setOpen]         = useState(false)
  const { scrollY }                 = useScroll()

  useEffect(() => scrollY.on('change', y => setScrolled(y > 40)), [scrollY])

  useEffect(() => {
    const obs = NAV.map(({ href }) => {
      const el = document.getElementById(href.slice(1))
      if (!el) return null
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(href.slice(1)) },
        { rootMargin: '-35% 0px -55% 0px' }
      )
      o.observe(el)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [])

  const go = href => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background:     'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom:   '1px solid var(--border)',
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-hover
          className="font-semibold text-sm tracking-tight"
          style={{ color: 'var(--white)', background: 'none', border: 'none' }}
        >
          James Ratan
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => go(href)}
              data-hover
              className="text-sm font-medium"
              style={{
                color:      active === href.slice(1) ? 'var(--white)' : 'var(--gray-3)',
                background: 'none', border: 'none',
                transition: 'color 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--gray-1)'}
              onMouseOut={e  => e.currentTarget.style.color = active === href.slice(1) ? 'var(--white)' : 'var(--gray-3)'}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={onResumeClick}
            data-hover
            className="hidden md:block text-xs font-semibold px-4 py-2 rounded-lg"
            style={{ background: 'var(--white)', color: '#000', border: 'none' }}
            whileHover={{ scale: 1.04, background: 'var(--gray-1)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            Resume
          </motion.button>
          <button
            className="md:hidden p-1"
            style={{ color: 'var(--gray-2)', background: 'none', border: 'none' }}
            onClick={() => setOpen(o => !o)}
          >
            {open ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.96)', borderBottom: '1px solid var(--border)' }}
            className="md:hidden px-6 py-5 flex flex-col gap-4"
          >
            {NAV.map(({ label, href }) => (
              <button key={href} onClick={() => go(href)} className="text-sm font-medium text-left"
                style={{ color: active === href.slice(1) ? 'var(--white)' : 'var(--gray-2)', background: 'none', border: 'none' }}>
                {label}
              </button>
            ))}
            <a href="/James_Resume.pdf" download
              className="text-xs font-semibold px-4 py-2 rounded-lg text-center mt-1"
              style={{ background: 'var(--white)', color: '#000' }}>
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
