import { useEffect, useRef } from 'react'

const CYAN   = 'rgba(0, 229, 255,'
const VIOLET = 'rgba(124, 58, 237,'
const AMBER  = 'rgba(245, 158, 11,'

function randomColor() {
  const r = Math.random()
  if (r < 0.65) return { base: CYAN,   glow: '#00e5ff' }
  if (r < 0.88) return { base: VIOLET, glow: '#7c3aed' }
  return              { base: AMBER,   glow: '#f59e0b' }
}

class Node {
  constructor(w, h) {
    this.x  = Math.random() * w
    this.y  = Math.random() * h
    this.ox = this.x
    this.oy = this.y
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.r  = 2 + Math.random() * 2.5
    const c = randomColor()
    this.color = c.base
    this.glow  = c.glow
    this.t     = Math.random() * 1000
  }

  update(w, h, mx, my, pull) {
    this.t += 0.006
    this.x = this.ox + Math.sin(this.t * 1.1) * 28 + Math.cos(this.t * 0.7) * 14
    this.y = this.oy + Math.sin(this.t * 0.9) * 20 + Math.cos(this.t * 1.3) * 18

    if (pull) {
      const dx  = mx - this.x
      const dy  = my - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 200) {
        const force = (1 - dist / 200) * 0.04
        this.ox += dx * force
        this.oy += dy * force
      }
    }

    this.ox = Math.max(10, Math.min(w - 10, this.ox + this.vx))
    this.oy = Math.max(10, Math.min(h - 10, this.oy + this.vy))
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `${this.color}0.9)`
    ctx.fill()
    ctx.shadowColor  = this.glow
    ctx.shadowBlur   = 8
    ctx.fill()
    ctx.shadowBlur   = 0
  }
}

export default function NeuralCanvas() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    nodes: [], mouse: { x: -999, y: -999 }, pulses: [], animId: null
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const s   = stateRef.current

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    s.nodes = Array.from({ length: 80 }, () => new Node(canvas.width, canvas.height))

    function onMove(e) {
      s.mouse.x = e.clientX
      s.mouse.y = e.clientY
    }
    function onClick(e) {
      s.pulses.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 220, alpha: 0.6 })
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', resize)

    function loop() {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      // Update nodes
      s.nodes.forEach(n => n.update(W, H, s.mouse.x, s.mouse.y, true))

      // Draw edges
      ctx.lineWidth = 0.6
      for (let i = 0; i < s.nodes.length; i++) {
        for (let j = i + 1; j < s.nodes.length; j++) {
          const a = s.nodes[i], b = s.nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,229,255,${alpha})`
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      s.nodes.forEach(n => n.draw(ctx))

      // Draw pulse ripples
      s.pulses = s.pulses.filter(p => p.alpha > 0)
      s.pulses.forEach(p => {
        p.r     += 4
        p.alpha -= 0.012
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,229,255,${p.alpha})`
        ctx.lineWidth   = 1.5
        ctx.stroke()
      })

      s.animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(s.animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:  'fixed',
        top:       0,
        left:      0,
        width:     '100%',
        height:    '100%',
        zIndex:    0,
        opacity:   0.18,
        pointerEvents: 'none',
      }}
    />
  )
}
