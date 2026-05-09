'use client'

import { useEffect, useRef } from 'react'

interface OrbNode {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  phase: number
  phaseSpeed: number
  color: [number, number, number]
}

const PALETTE: [number, number, number][] = [
  [99, 102, 241],  // indigo
  [139, 92, 246],  // violet
  [6, 182, 212],   // cyan
  [168, 85, 247],  // purple
  [0, 207, 255],   // electric blue
]

export function NeuralOrb({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf: number
    let nodes: OrbNode[] = []

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.scale(dpr, dpr)

      nodes = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.018,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }))
    }

    resize()

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      // Central ambient glow
      const cx = w * 0.5
      const cy = h * 0.5
      const r = Math.min(w, h) * 0.48

      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      ambient.addColorStop(0, 'rgba(99,102,241,0.14)')
      ambient.addColorStop(0.45, 'rgba(139,92,246,0.07)')
      ambient.addColorStop(1, 'transparent')
      ctx.fillStyle = ambient
      ctx.fillRect(0, 0, w, h)

      // Secondary glow — offset
      const g2 = ctx.createRadialGradient(cx * 0.7, cy * 0.6, 0, cx * 0.7, cy * 0.6, r * 0.6)
      g2.addColorStop(0, 'rgba(6,182,212,0.09)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          const maxD = 130
          if (d < maxD) {
            const alpha = (1 - d / maxD) * 0.38
            const [cr, cg, cb] = nodes[i].color
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`
            ctx.lineWidth = 0.65
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.phase += n.phaseSpeed
        const pulse = 0.65 + 0.35 * Math.sin(n.phase)
        const [cr, cg, cb] = n.color

        // Halo glow
        const haloR = n.r * 9
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR)
        halo.addColorStop(0, `rgba(${cr},${cg},${cb},${0.35 * pulse})`)
        halo.addColorStop(1, 'transparent')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2)
        const r2 = Math.min(255, cr + 90)
        const g2 = Math.min(255, cg + 90)
        const b2 = Math.min(255, cb + 80)
        ctx.fillStyle = `rgba(${r2},${g2},${b2},${0.92 * pulse})`
        ctx.fill()

        // Move & bounce
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
    }

    function animate() {
      draw()
      raf = requestAnimationFrame(animate)
    }
    animate()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={`w-full h-full ${className}`} />
}
