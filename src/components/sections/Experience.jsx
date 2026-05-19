import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillPill from '../SkillPill'
import SectionHeader from '../SectionHeader'

const BULLETS = [
  <>Engineered and deployed Wazuh XDR/SIEM across <strong>50 endpoints</strong> — configuring agents, indexer, and dashboard for centralized real-time threat monitoring, processing <strong>10,000+ log events daily</strong> in a classified defense environment.</>,
  <>Implemented CVE/CVSS vulnerability detection, file integrity monitoring, and SCA against <strong>CIS Benchmarks</strong>; mapped threats to <strong>MITRE ATT&CK</strong> across 3 regulatory frameworks (PCI DSS, GDPR, HIPAA).</>,
  <>Integrated <strong>VirusTotal</strong> and <strong>YARA-based</strong> malware scanning into the SIEM pipeline; triaged 15+ security alerts and authored incident runbooks, reducing MTTD by <strong>40%</strong>.</>,
  <>Conducted diagnostic analysis across <strong>8 network switches</strong>; traced port-level anomalies, flagged misconfigured VLANs, and delivered remediation findings that strengthened network segmentation posture.</>,
]

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" ref={ref} style={{ background: 'var(--black)' }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Where I've worked" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block" style={{ background: 'var(--border)' }} />
          <div className="absolute -left-1 top-6 w-2.5 h-2.5 rounded-full hidden md:block"
            style={{ background: 'var(--accent)', outline: '3px solid var(--black)' }} />

          <div className="md:pl-10">
            <div className="card p-8 md:p-10" style={{ background: 'var(--card)' }}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-8">
                <div>
                  <h3 className="font-bold text-xl" style={{ color: 'var(--white)' }}>Cybersecurity Intern</h3>
                  <p className="text-base mt-1 font-medium" style={{ color: 'var(--accent)' }}>
                    Defence Research and Development Organisation (DRDO)
                  </p>
                  <p className="text-sm mt-1.5" style={{ color: 'var(--gray-3)' }}>Hyderabad, India</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
                  <span className="text-xs font-mono px-3 py-1.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--gray-2)' }}>
                    Jun 2023 – Aug 2023
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Wazuh', 'SIEM', 'Linux', 'Python'].map(t => <SkillPill key={t} label={t} />)}
                  </div>
                </div>
              </div>

              <motion.ul
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                className="flex flex-col gap-4"
              >
                {BULLETS.map((b, i) => (
                  <motion.li key={i}
                    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45 } } }}
                    className="flex gap-3 text-base leading-7"
                    style={{ color: 'var(--gray-2)' }}
                  >
                    <span className="flex-shrink-0 mt-3 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
