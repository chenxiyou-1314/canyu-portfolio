<template>
  <canvas ref="canvasRef" class="starfield-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
let animId = 0
let isDark = false

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

let stars: Star[] = []

function initStars(canvas: HTMLCanvasElement) {
  stars = []
  const count = Math.floor((canvas.width * canvas.height) / 8000)
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.5 + Math.random() * 1.5,
      speed: 0.02 + Math.random() * 0.05,
      opacity: 0.3 + Math.random() * 0.7,
      twinkleSpeed: 0.005 + Math.random() * 0.015,
      twinklePhase: Math.random() * Math.PI * 2
    })
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  isDark = document.documentElement.classList.contains('dark')

  if (!isDark) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    animId = requestAnimationFrame(animate)
    return
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const time = Date.now() * 0.001

  for (const star of stars) {
    const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed * 100 + star.twinklePhase)
    const alpha = star.opacity * twinkle

    // Slow drift
    star.y -= star.speed
    if (star.y < -5) {
      star.y = canvas.height + 5
      star.x = Math.random() * canvas.width
    }

    // Glow
    const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
    gradient.addColorStop(0, `rgba(99, 102, 241, ${alpha * 0.3})`)
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
    ctx.fill()

    // Core
    ctx.fillStyle = `rgba(203, 213, 225, ${alpha})`
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fill()
  }

  animId = requestAnimationFrame(animate)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  initStars(canvas)
}

onMounted(() => {
  // Only init on desktop
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  const canvas = canvasRef.value
  if (!canvas) return

  resize()
  window.addEventListener('resize', resize)

  // Observe dark mode
  const observer = new MutationObserver(() => {
    // Just trigger re-check in animate loop
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.starfield-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2;
}
</style>
