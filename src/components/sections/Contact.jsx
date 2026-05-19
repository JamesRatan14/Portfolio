import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaCheck, FaCopy, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SectionHeader from '../SectionHeader'

const LINKS = [
  { icon: FaLinkedin, label: 'LinkedIn',  desc: 'Connect with me',  value: 'linkedin.com/in/jamesratan',  action: 'link', href: 'https://linkedin.com/in/jamesratan', accent: '#0a66c2' },
  { icon: FaGithub,   label: 'GitHub',    desc: 'See my work',      value: 'github.com/JamesRatan14',     action: 'link', href: 'https://github.com/JamesRatan14',  accent: '#e2e8f0' },
  { icon: FaEnvelope, label: 'Email',     desc: 'Click to copy',    value: 'jamesratand@gmail.com',       action: 'copy', accent: '#a78bfa' },
  { icon: FaPhone,    label: 'Phone',     desc: 'Call or text',     value: '+1 (607) 349-1553',           action: 'link', href: 'tel:+16073491553', accent: '#34d399' },
]

function ContactCard({ item, index, inView }) {
  const [copied, setCopied] = useState(false)
  const Icon = item.icon

  const handleClick = async () => {
    if (item.action === 'copy') {
      try { await navigator.clipboard.writeText(item.value) } catch { return }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      window.open(item.href, '_blank', 'noopener noreferrer')
    }
  }

  return (
    <motion.button
      data-hover
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="w-full text-left"
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      <motion.div
        className="rounded-2xl p-5 flex flex-col gap-4 h-full relative overflow-hidden"
        style={{
          background: 'var(--card)',
          border:     `1px solid ${copied ? 'rgba(74,222,128,0.35)' : 'var(--border)'}`,
          transition: 'border-color 0.2s',
        }}
        whileHover={{ borderColor: copied ? 'rgba(74,222,128,0.35)' : `${item.accent}44`, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(to right, ${item.accent}, transparent)`,
          borderRadius: '14px 14px 0 0',
        }} />

        {/* Icon */}
        <div className="flex items-center justify-center rounded-xl w-10 h-10"
          style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}28` }}>
          <AnimatePresence mode="wait">
            {copied && item.action === 'copy'
              ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaCheck size={15} style={{ color: '#4ade80' }} /></motion.div>
              : <motion.div key="icon"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Icon size={17} style={{ color: copied ? '#4ade80' : item.accent }} /></motion.div>
            }
          </AnimatePresence>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--gray-3)' }}>{item.label}</p>
            {item.action === 'link'
              ? <FaArrowUpRightFromSquare size={10} style={{ color: 'var(--gray-3)' }} />
              : <FaCopy size={11} style={{ color: copied ? '#4ade80' : 'var(--gray-3)' }} />
            }
          </div>
          <p className="text-xs" style={{ color: 'var(--gray-3)' }}>{item.desc}</p>
          <p className="text-sm font-semibold mt-1 break-all" style={{ color: copied ? '#4ade80' : 'var(--white)' }}>
            {item.value}
          </p>
        </div>
      </motion.div>
    </motion.button>
  )
}

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--surface)' }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Get in touch" subtitle="Open to SWE and AI Engineering roles from December 2026." />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LINKS.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-sm"
          style={{ color: 'var(--gray-3)' }}
        >
          James Ratan Dukkipati — MS CS AI Track — Binghamton University — December 2026
        </motion.p>
      </div>
    </section>
  )
}
