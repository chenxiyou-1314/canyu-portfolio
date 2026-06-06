<template>
  <canvas ref="canvasRef" class="mouse-trail-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

let particles: Particle[] = []
let animId = 0
let mouseX = 0
let mouseY = 0
let prevMouseX = 0
let prevMouseY = 0
let isDark = false

function spawnParticles(x: number, y: number, dx: number, dy: number) {
  const speed = Math.sqrt(dx * dx + dy * dy)
  if (speed < 2) return

  const count = Math.min(Math.floor(speed / 4), 4)
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x + (Math.random() - 0.5) * 4,
      y: y + (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5) * 1.5 - dx * 0.02,
      vy: (Math.random() - 0.5) * 1.5 - dy * 0.02,
      life: 0,
      maxLife: 30 + Math.random() * 30,
      size: 1.5 + Math.random() * 2.5,
      hue: isDark ? 240 + Math.random() * 60 : 220 + Math.random() * 40
    })
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update & draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.life++
    p.x += p.vx
    p.y += p.vy
    p.vy += 0.02 // slight gravity
    p.vx *= 0.99
    p.vy *= 0.99

    const progress = p.life / p.maxLife
    if (progress >= 1) {
      particles.splice(i, 1)
      continue
    }

    const alpha = 1 - progress
    const size = p.size * (1 - progress * 0.5)

    // Glow
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3)
    gradient.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${alpha * 0.6})`)
    gradient.addColorStop(0.5, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.2})`)
    gradient.addColorStop(1, `hsla(${p.hue}, 70%, 50%, 0)`)
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2)
    ctx.fill()

    // Core
    ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, ${alpha})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Limit particles
  if (particles.length > 300) {
    particles = particles.slice(-300)
  }

  animId = requestAnimationFrame(animate)
}

function onMouseMove(e: MouseEvent) {
  const dx = e.clientX - prevMouseX
  const dy = e.clientY - prevMouseY
  mouseX = e.clientX
  mouseY = e.clientY
  spawnParticles(mouseX, mouseY, dx, dy)
  prevMouseX = mouseX
  prevMouseY = mouseY
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function checkDarkMode() {
  isDark = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)

  // Observe dark mode changes
  const observer = new MutationObserver(() => {
    checkDarkMode()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  checkDarkMode()

  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.mouse-trail-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
</style>
