<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let cleanup: (() => void)[] = []

function initTilt() {
  const cards = document.querySelectorAll('.project-card')
  
  cards.forEach((card) => {
    const el = card as HTMLElement
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6
      
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`
      el.style.transition = 'transform 0.1s ease-out'
    }
    
    const onMouseLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)'
      el.style.transition = 'transform 0.4s ease-out'
    }
    
    const onMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease-out'
    }
    
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseenter', onMouseEnter)
    
    cleanup.push(() => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseenter', onMouseEnter)
    })
  })
}

onMounted(() => {
  setTimeout(initTilt, 500)
  
  // Re-init on route changes
  const observer = new MutationObserver(() => {
    cleanup.forEach(fn => fn())
    cleanup = []
    setTimeout(initTilt, 300)
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  cleanup.forEach(fn => fn())
})
</script>
