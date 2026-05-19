import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCode, FaBrain, FaReact, FaServer, FaCloud, FaShield } from 'react-icons/fa6'
import SkillPill from '../SkillPill'
import SectionHeader from '../SectionHeader'

const ROW1 = ['Python','TypeScript','JavaScript','Java','SQL','Bash','LangChain','OpenAI API','Pinecone','HuggingFace','PyTorch','SBERT','FAISS','scikit-learn']
const ROW2 = ['React','Next.js','Tailwind CSS','FastAPI','Node.js','tRPC','PostgreSQL','pgvector','Redis','Prisma','Docker','AWS','Vercel','Linux','Git','Wazuh XDR/SIEM','MITRE ATT&CK','Burp Suite','OWASP']

function Marquee({ items, speed = 40, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
    }}>
      <motion.div
        style={{ display: 'flex', gap: 10, width: 'max-content' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((label, i) => <SkillPill key={i} label={label} />)}
      </motion.div>
    </div>
  )
}

const CATEGORIES = [
  { title: 'Languages',      icon: FaCode,   color: '#a78bfa', skills: ['Python','TypeScript','JavaScript','Java','SQL','Bash'] },
  { title: 'AI & ML',        icon: FaBrain,  color: '#60a5fa', skills: ['LangChain','OpenAI API','Pinecone','HuggingFace','PyTorch','SBERT','FAISS','scikit-learn'] },
  { title: 'Frontend',       icon: FaReact,  color: '#34d399', skills: ['React','Next.js','Tailwind CSS','Framer Motion','WebSockets'] },
  { title: 'Backend',        icon: FaServer, color: '#f59e0b', skills: ['FastAPI','Node.js','tRPC','PostgreSQL','pgvector','Redis','Prisma'] },
  { title: 'DevOps & Cloud', icon: FaCloud,  color: '#38bdf8', skills: ['Docker','AWS','Vercel','Linux','Git'] },
  { title: 'Security',       icon: FaShield, color: '#f87171', skills: ['Wazuh XDR/SIEM','MITRE ATT&CK','CIS Benchmarks','Nmap','Wireshark','Burp Suite','OWASP'] },
]

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" ref={ref} style={{ background: 'var(--surface)' }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="What I work with" />
      </div>

      {/* Infinite marquee */}
      <div className="flex flex-col gap-3 mb-16">
        <Marquee items={ROW1} speed={35} />
        <Marquee items={ROW2} speed={45} reverse />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
              >
                <motion.div
                  className="h-full flex flex-col rounded-xl overflow-hidden"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                  whileHover={{ borderColor: `${cat.color}40`, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Colored top bar */}
                  <div style={{ height: 3, background: `linear-gradient(to right, ${cat.color}, transparent)` }} />

                  <div className="p-5 flex flex-col gap-4 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center rounded-lg flex-shrink-0"
                          style={{ width: 34, height: 34, background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                        >
                          <Icon size={15} style={{ color: cat.color }} />
                        </div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--white)' }}>{cat.title}</p>
                      </div>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}25` }}
                      >
                        {cat.skills.length}
                      </span>
                    </div>

                    {/* Pills */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map(s => <SkillPill key={s} label={s} />)}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
