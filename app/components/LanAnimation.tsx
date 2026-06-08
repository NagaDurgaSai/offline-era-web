'use client'
import { useEffect, useRef, useState } from 'react'

const NODES = [
  { id: 'macbook',  label: 'MacBook',  x: 0.15, y: 0.38, icon: '⌘' },
  { id: 'android',  label: 'Android',  x: 0.50, y: 0.12, icon: '◉' },
  { id: 'windows',  label: 'Windows',  x: 0.85, y: 0.38, icon: '⊞' },
  { id: 'ipad',     label: 'iPad',     x: 0.72, y: 0.78, icon: '▭' },
  { id: 'oneplus',  label: 'OnePlus',  x: 0.28, y: 0.78, icon: '◉' },
]
const EDGES = [[0,1],[1,2],[0,4],[2,3],[4,3],[1,3]]

interface Packet { edgeIdx: number; progress: number; speed: number; id: number; reverse: boolean }
interface NodeState { glow: number }

export default function LanAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const packetsRef = useRef<Packet[]>([])
  const nodeStates = useRef<NodeState[]>(NODES.map(() => ({ glow: 0 })))
  const frameRef = useRef(0)
  const nextId = useRef(0)
  const dashOffset = useRef(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    let raf: number
    let mounted = true


    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(1,0,0,1,0,0)
      ctx.scale(dpr, dpr)
    }

    requestAnimationFrame(() => {
      resize()
      window.addEventListener('resize', resize)
    })

    const pos = (n: typeof NODES[0], w: number, h: number) => ({ x: n.x * w, y: n.y * h })

    const spawn = () => packetsRef.current.push({
      edgeIdx: Math.floor(Math.random() * EDGES.length),
      progress: 0, speed: 0.005 + Math.random() * 0.004,
      id: nextId.current++, reverse: Math.random() > 0.5,
    })

    const draw = () => {
      if (!mounted) return
      frameRef.current++
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      if (w === 0 || h === 0) { raf = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, w, h)
      dashOffset.current -= 0.4
      if (frameRef.current % 70 === 0) spawn()
      if (frameRef.current % 120 === 0) spawn()

      EDGES.forEach(([ai, bi], idx) => {
        const pa = pos(NODES[ai], w, h), pb = pos(NODES[bi], w, h)
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = 'rgba(184,255,87,0.12)'; ctx.lineWidth = 1
        ctx.setLineDash([6,18]); ctx.lineDashOffset = dashOffset.current + idx * 8; ctx.stroke()
        ctx.setLineDash([])
      })

      packetsRef.current = packetsRef.current.filter(p => p.progress < 1)
      packetsRef.current.forEach(p => {
        p.progress += p.speed
        const [ai, bi] = EDGES[p.edgeIdx]
        const pa = pos(NODES[ai], w, h), pb = pos(NODES[bi], w, h)
        const t = p.reverse ? 1 - p.progress : p.progress
        const x = pa.x + (pb.x - pa.x) * t, y = pa.y + (pb.y - pa.y) * t
        const alpha = Math.sin(p.progress * Math.PI)
        for (let i = 1; i <= 5; i++) {
          const tp = Math.max(0, t - i * 0.03)
          ctx.beginPath()
          ctx.arc(pa.x + (pb.x-pa.x)*tp, pa.y + (pb.y-pa.y)*tp, Math.max(0.1, 3-i*0.4), 0, Math.PI*2)
          ctx.fillStyle = `rgba(184,255,87,${alpha*(0.25-i*0.04)})`; ctx.fill()
        }
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI*2)
        ctx.fillStyle = `rgba(184,255,87,${alpha})`; ctx.fill()
        const g = ctx.createRadialGradient(x,y,0,x,y,12)
        g.addColorStop(0,`rgba(184,255,87,${alpha*0.4})`); g.addColorStop(1,'rgba(184,255,87,0)')
        ctx.beginPath(); ctx.arc(x,y,12,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
        if (p.progress > 0.92) {
          const ti = p.reverse ? ai : bi
          nodeStates.current[ti].glow = Math.min(1, nodeStates.current[ti].glow + 0.15)
        }
      })

      NODES.forEach((node, idx) => {
        const { x, y } = pos(node, w, h)
        const ns = nodeStates.current[idx]
        ns.glow = Math.max(0, ns.glow - 0.02)
        const breathe = Math.sin(frameRef.current * 0.02 + idx * 1.2) * 0.5 + 0.5
        const outerR = 26 + breathe * 3
        ctx.beginPath(); ctx.arc(x,y,outerR,0,Math.PI*2)
        ctx.strokeStyle=`rgba(184,255,87,${0.06+breathe*0.06+ns.glow*0.3})`; ctx.lineWidth=1; ctx.stroke()
        if (ns.glow > 0.05) {
          ctx.beginPath(); ctx.arc(x,y,outerR+8,0,Math.PI*2)
          ctx.strokeStyle=`rgba(184,255,87,${ns.glow*0.2})`; ctx.lineWidth=1; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(x,y,20,0,Math.PI*2)
        ctx.fillStyle='rgba(15,15,15,0.95)'; ctx.fill()
        ctx.strokeStyle=`rgba(255,255,255,${0.1+ns.glow*0.3})`; ctx.lineWidth=1; ctx.stroke()
        ctx.font='14px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'
        ctx.fillStyle=`rgba(255,255,255,${0.55+ns.glow*0.45})`; ctx.fillText(node.icon,x,y)
        ctx.font='400 10px system-ui,sans-serif'
        ctx.fillStyle=`rgba(255,255,255,${0.25+ns.glow*0.3})`; ctx.fillText(node.label,x,y+36)
      })
      raf = requestAnimationFrame(draw)
    }

    spawn(); spawn(); spawn(); draw()
    return () => { mounted=false; cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
  }, [ready])

  if (!ready) return null

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <canvas ref={canvasRef} style={{ display:'block', width:'100%', height:'100%' }} />

    </div>
  )
}
