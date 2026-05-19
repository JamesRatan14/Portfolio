import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CustomCursor   from './components/CustomCursor'
import Navbar         from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import ResumeModal    from './components/ResumeModal'
import Hero           from './components/sections/Hero'
import About          from './components/sections/About'
import Skills         from './components/sections/Skills'
import Experience     from './components/sections/Experience'
import Projects       from './components/sections/Projects'
import Education      from './components/sections/Education'
import Contact        from './components/sections/Contact'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <AnimatePresence>
      <div style={{ background: 'var(--black)', minHeight: '100svh' }}>
        <CustomCursor />
        <ScrollProgress />
        <Navbar onResumeClick={() => setResumeOpen(true)} />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Contact />
        </main>
      </div>
    </AnimatePresence>
  )
}
