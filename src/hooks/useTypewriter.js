import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, { typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase]         = useState('typing') // 'typing' | 'pausing' | 'deleting'
  const frameRef = useRef(null)

  useEffect(() => {
    if (!words || words.length === 0) return
    const word = words[wordIndex % words.length]

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        frameRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed)
      } else {
        frameRef.current = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      frameRef.current = setTimeout(() => setPhase('deleting'), 200)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        frameRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
      } else {
        setWordIndex(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(frameRef.current)
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  return { text: displayed, phase }
}
