<template>
  <div class="skill-radar-wrapper">
    <canvas ref="radarCanvas" class="skill-radar-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const radarCanvas = ref<HTMLCanvasElement>()
let animId = 0

const skills = [
  { label: 'LangGraph', value: 0.92 },
  { label: 'Python', value: 0.95 },
  { label: 'LLM/RAG', value: 0.9 },
  { label: 'Spring Boot', value: 0.78 },
  { label: 'Vue3/TS', value: 0.82 },
  { label: 'Docker', value: 0.8 },
  { label: '训练/推理', value: 0.85 },
  { label: 'OOD检测', value: 0.88 }
]

const n = skills.length
const angleStep = (Math.PI * 2) / n

function drawRadar(progress: number) {
  const canvas = radarCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const size = Math.min(canvas.parentElement!.clientWidth, 420)
  canvas.width = size * dpr
  canvas.height = size * dpr
  canvas.style.width = size + 'px'
  canvas.style.height = size + 'px'
  ctx.scale(dpr, dpr)

  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 50
  const isDark = document.documentElement.classList.contains('dark')

  ctx.clearRect(0, 0, size, size)

  // Grid rings
  for (let ring = 1; ring <= 4; ring++) {
    const r = (maxR / 4) * ring
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.12)'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle))
    ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.08)'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Data polygon with animation
  ctx.beginPath()
  for (let i = 0; i <= n; i++) {
    const idx = i % n
    const angle = idx * angleStep - Math.PI / 2
    const r = maxR * skills[idx].value * Math.min(progress, 1)
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()

  // Fill gradient
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.25)')
  gradient.addColorStop(1, 'rgba(139, 92, 246, 0.08)')
  ctx.fillStyle = gradient
  ctx.fill()

  // Stroke
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.7)'
  ctx.lineWidth = 2
  ctx.stroke()

  // Data points
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep - Math.PI / 2
    const r = maxR * skills[i].value * Math.min(progress, 1)
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)

    // Glow
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(99, 102, 241, 0.3)'
    ctx.fill()

    // Core dot
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#6366f1'
    ctx.fill()
  }

  // Labels
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep - Math.PI / 2
    const labelR = maxR + 28
    const x = cx + labelR * Math.cos(angle)
    const y = cy + labelR * Math.sin(angle)

    ctx.font = '500 12px "Noto Sans SC", sans-serif'
    ctx.fillStyle = isDark ? '#cbd5e1' : '#334155'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(skills[i].label, x, y)

    // Value percentage
    ctx.font = '600 10px "Noto Sans SC", sans-serif'
    ctx.fillStyle = '#6366f1'
    ctx.fillText(Math.round(skills[i].value * 100) + '%', x, y + 15)
  }
}

onMounted(() => {
  // Animate radar drawing
  let progress = 0
  const startTime = Date.now()
  const duration = 1200

  const animate = () => {
    const elapsed = Date.now() - startTime
    progress = Math.min(elapsed / duration, 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    drawRadar(eased)
    if (progress < 1) {
      animId = requestAnimationFrame(animate)
    }
  }

  // Observe when skill section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  // Wait for the canvas to be in DOM
  setTimeout(() => {
    if (radarCanvas.value) {
      observer.observe(radarCanvas.value)
    }
  }, 500)

  // Resize handler
  window.addEventListener('resize', () => drawRadar(1))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
})
</script>

<style scoped>
.skill-radar-wrapper {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
}

.skill-radar-canvas {
  max-width: 420px;
}
</style>
