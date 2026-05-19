import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGraduationCap, FaLocationDot, FaCalendar, FaBriefcase, FaSchool, FaChartLine } from 'react-icons/fa6'
import SectionHeader from '../SectionHeader'

const item = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const STATS = [
  { value: '3.7',  sub: '/ 4.0', label: 'Academic GPA',    color: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.2)'  },
  { value: '40%',  sub: '',      label: 'MTTD Reduced',    color: '#34d399', bg: 'rgba(52,211,153,0.06)',  border: 'rgba(52,211,153,0.2)'   },
  { value: '50K+', sub: '',      label: 'Data Points',     color: '#60a5fa', bg: 'rgba(96,165,250,0.06)',  border: 'rgba(96,165,250,0.2)'   },
]

const INFO = [
  { icon: FaGraduationCap, label: 'Degree',     value: 'M.S. Computer Science — AI Track' },
  { icon: FaSchool,        label: 'University', value: 'Binghamton University (SUNY)' },
  { icon: FaChartLine,     label: 'GPA',        value: '3.7 / 4.0' },
  { icon: FaCalendar,      label: 'Graduation', value: 'December 2026' },
  { icon: FaLocationDot,   label: 'Location',   value: 'Binghamton, NY' },
  { icon: FaBriefcase,     label: 'Status',     value: 'Open to Opportunities', accent: true },
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" ref={ref} style={{ background: 'var(--black)' }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Who I am" />

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-4"
        >
          {/* Row 1: Bio card + Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Bio card — spans 2 cols */}
            <motion.div
              variants={item}
              className="md:col-span-2 rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              {/* Subtle glow in top-right */}
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 220, height: 220,
                background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div className="flex items-center gap-4 relative">
                <div
                  className="rounded-full overflow-hidden flex-shrink-0 relative"
                  style={{ width: 56, height: 56, border: '2px solid rgba(167,139,250,0.4)', boxShadow: '0 0 18px rgba(167,139,250,0.15)', background: '#fff' }}
                >
                  <img src="/avatar-about.jpg" alt="James"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: 'var(--white)' }}>James Ratan Dukkipati</p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>AI Engineer / Software Developer</p>
                </div>
              </div>

              <div style={{ height: 1, background: 'var(--border)' }} />

              <div className="flex flex-col gap-4 relative">
                <p className="text-base leading-8" style={{ color: 'var(--gray-2)' }}>
                  Computer Science graduate student at Binghamton University specializing in AI, with hands-on
                  cybersecurity experience from a defense-sector internship at DRDO. I build
                  production-grade systems including agentic security log analyzers and RAG SaaS platforms.
                </p>
                <p className="text-base leading-8" style={{ color: 'var(--gray-2)' }}>
                  Proficient in Python, TypeScript, and LangChain. Available for internships from <span style={{ color: 'var(--white)', fontWeight: 600 }}>May 2026</span> and full-time roles from <span style={{ color: 'var(--white)', fontWeight: 600 }}>December 2026</span>.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 relative">
                {['Python', 'TypeScript', 'LangChain', 'AI/ML', 'Cybersecurity'].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--gray-2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stat cards — stack vertically */}
            <div className="flex flex-col gap-4">
              {STATS.map(s => (
                <motion.div
                  key={s.label}
                  variants={item}
                  className="rounded-2xl p-6 flex flex-col gap-2 flex-1 relative overflow-hidden"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{
                    position: 'absolute', bottom: -30, right: -30, width: 100, height: 100,
                    background: `radial-gradient(circle, ${s.color}20 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                  <div className="flex items-end gap-1.5">
                    <span className="text-4xl font-bold tracking-tight" style={{ color: s.color }}>{s.value}</span>
                    {s.sub && <span className="text-lg mb-0.5 font-medium" style={{ color: `${s.color}80` }}>{s.sub}</span>}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: `${s.color}90` }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2: Info table */}
          <motion.div
            variants={item}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3">
              {INFO.map(({ icon: Icon, label, value, accent }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-6 py-5"
                  style={{
                    background:   i % 2 === 0 ? 'var(--card)' : 'rgba(255,255,255,0.02)',
                    borderRight:  (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < INFO.length - 3 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-lg"
                    style={{ width: 32, height: 32, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.15)' }}
                  >
                    <Icon size={13} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--gray-3)' }}>{label}</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: accent ? 'var(--accent)' : 'var(--white)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
