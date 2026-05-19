import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const SCHOOLS = [
  {
    name:   'Binghamton University (SUNY)',
    sub:    'Thomas J. Watson College of Engineering',
    degree: 'M.S. Computer Science — Artificial Intelligence Track',
    gpa:    '3.7 / 4.0',
    dates:  'Aug 2024 – December 2026',
    loc:    'Binghamton, NY',
    accent: '#a78bfa',
  },
  {
    name:   'MVSR Engineering College',
    sub:    'Osmania University',
    degree: 'B.E. Computer Science',
    gpa:    '8.2 / 10.0',
    dates:  'Aug 2020 – May 2024',
    loc:    'Hyderabad, India',
    accent: '#60a5fa',
  },
]

export default function Education() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" ref={ref} style={{ background: 'var(--black)' }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Academic background" />

        <div className="grid md:grid-cols-2 gap-5">
          {SCHOOLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="card h-full flex flex-col"
                style={{ background: 'var(--card)' }}
                whileHover={{ borderColor: `${s.accent}33`, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ height: 3, borderRadius: '14px 14px 0 0', background: `linear-gradient(to right, ${s.accent}, transparent)` }} />

                <div className="p-7 flex flex-col gap-5">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--white)' }}>{s.name}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--gray-3)' }}>{s.sub}</p>
                  </div>

                  <div className="flex flex-col gap-3" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                    <p className="text-base" style={{ color: 'var(--gray-2)' }}>{s.degree}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs font-mono px-3 py-1.5 rounded-md"
                        style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}33`, color: s.accent }}>
                        GPA {s.gpa}
                      </span>
                      <span className="text-xs font-mono px-3 py-1.5 rounded-md"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--gray-3)' }}>
                        {s.dates}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--gray-3)' }}>{s.loc}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
