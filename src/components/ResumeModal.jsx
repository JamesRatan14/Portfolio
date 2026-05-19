import { motion, AnimatePresence } from 'framer-motion'
import { FaXmark, FaDownload, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { useEffect } from 'react'

export default function ResumeModal({ open, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position:   'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.80)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:  'fixed', inset: 0, zIndex: 201,
              display:   'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding:   '24px',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '100%', maxWidth: 860,
                height: '90vh',
                display: 'flex', flexDirection: 'column',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                pointerEvents: 'auto',
              }}
            >
              {/* Toolbar */}
              <div
                className="flex items-center justify-between px-5 py-3 flex-shrink-0"
                style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--white)' }}>
                  James Ratan Dukkipati — Resume
                </p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="/James_Resume.pdf"
                    download
                    data-hover
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg"
                    style={{ background: 'var(--accent)', color: '#000' }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <FaDownload size={12} />
                    Download
                  </motion.a>
                  <motion.a
                    href="/James_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--gray-1)' }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <FaArrowUpRightFromSquare size={11} />
                    Open
                  </motion.a>
                  <motion.button
                    onClick={onClose}
                    data-hover
                    className="flex items-center justify-center rounded-lg"
                    style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--gray-2)' }}
                    whileHover={{ scale: 1.08, color: 'var(--white)' }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <FaXmark size={14} />
                  </motion.button>
                </div>
              </div>

              {/* PDF iframe */}
              <iframe
                src="/James_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                title="Resume Preview"
                style={{ flex: 1, border: 'none', background: '#1a1a1a' }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
