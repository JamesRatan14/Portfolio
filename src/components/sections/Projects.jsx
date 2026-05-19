import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SkillPill from '../SkillPill'
import SectionHeader from '../SectionHeader'

const PROJECTS = [
  {
    title:  'Agentic Security Log Analyzer',
    date:   'Jan 2025 – Present',
    github: 'https://github.com/JamesRatan14/agentic-security-log-analyzer',
    accent: '#a78bfa',
    stack:  ['Python','LangChain','GPT-4','FastAPI','pgvector','Docker'],
    bullets: [
      <>LangChain agent that autonomously performs IOC detection, metadata extraction, and pgvector semantic search over raw security logs — reducing manual triage by <strong>65%</strong>, completing analysis in <strong>under 5 seconds</strong> per batch.</>,
      <>FastAPI backend with PostgreSQL and pgvector, persisting <strong>1536-dim OpenAI embeddings</strong> per incident to enable sub-second similarity search across a growing corpus of historical security events.</>,
      <>GPT-4 structured output classifies threats across <strong>6 IOC categories</strong> with confidence scores, enabling zero-touch escalation of high-severity findings.</>,
    ],
  },
  {
    title:  'DocConvo',
    date:   'Sep 2024 – Dec 2024',
    note:   '3-person team project — not deployed to production.',
    github: null,
    accent: '#60a5fa',
    stack:  ['TypeScript','Next.js','LangChain','GPT-3.5','Pinecone','Stripe','Vercel'],
    bullets: [
      <>RAG SaaS for natural language queries over PDFs — LangChain + Pinecone + GPT-3.5 delivering <strong>sub-3s responses</strong> on documents up to <strong>100 pages</strong>.</>,
      <>7-service pipeline: Kinde OAuth/JWT, tRPC, WebSocket, Neon PostgreSQL with Prisma, UploadThing, Stripe billing with full auth and payment flows.</>,
      <>WebSocket response streaming sustaining first-token latency <strong>under 1 second</strong> across a 7-module monorepo.</>,
    ],
  },
  {
    title:  'Game Recommendation System',
    date:   'Jan 2024 – May 2024',
    github: null,
    accent: '#34d399',
    stack:  ['Python','FastAPI','PostgreSQL','pgvector','FAISS','Redis','Docker'],
    bullets: [
      <>Hybrid engine (TF-IDF + SBERT + ALS) outperforming single-method baselines by <strong>18%</strong> on NDCG@10 across <strong>50,000+ game interactions</strong>.</>,
      <>FastAPI with Redis caching, FAISS, and pgvector sustaining vector lookups <strong>under 100ms</strong>; full stack on Docker Compose.</>,
      <>Benchmarked 3 model variants on NDCG and precision@k — multi-signal fusion led every evaluation cut.</>,
    ],
  },
]

function ProjectCard({ proj, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const x      = useMotionValue(0)
  const y      = useMotionValue(0)
  const sx     = useSpring(x, { stiffness: 180, damping: 20 })
  const sy     = useSpring(y, { stiffness: 180, damping: 20 })
  const rx     = useTransform(sy, [-0.5, 0.5], ['5deg', '-5deg'])
  const ry     = useTransform(sx, [-0.5, 0.5], ['-5deg', '5deg'])

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width  - 0.5)
    y.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="card h-full flex flex-col"
        style={{ background: 'var(--card)' }}
        whileHover={{ borderColor: `${proj.accent}33`, y: -4 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, borderRadius: '14px 14px 0 0', background: `linear-gradient(to right, ${proj.accent}, transparent)` }} />

        <div className="flex flex-col gap-5 p-7 md:p-8 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-base" style={{ color: 'var(--white)' }}>{proj.title}</h3>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" data-hover
                    style={{ color: 'var(--gray-3)', transition: 'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color = proj.accent}
                    onMouseOut={e  => e.currentTarget.style.color = 'var(--gray-3)'}>
                    <span className="flex items-center gap-1"><FaGithub size={15} /><FaArrowUpRightFromSquare size={10} /></span>
                  </a>
                )}
              </div>
              {proj.note && <p className="text-xs mt-1" style={{ color: 'var(--gray-3)' }}>{proj.note}</p>}
            </div>
            <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--gray-3)' }}>{proj.date}</span>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {proj.stack.map(t => <SkillPill key={t} label={t} />)}
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-3 flex-1">
            {proj.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-7" style={{ color: 'var(--gray-2)' }}>
                <span className="flex-shrink-0 mt-2.5 w-1 h-1 rounded-full" style={{ background: proj.accent }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--surface)' }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="What I've built" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((proj, i) => <ProjectCard key={proj.title} proj={proj} index={i} />)}
        </div>
      </div>
    </section>
  )
}
