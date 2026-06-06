<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window === 'undefined') return

  const initScrollReveal = () => {
    const selectors = [
      '.section-title',
      '.timeline-item',
      '.project-card',
      '.skill-group',
      '.achieve-card',
      '.achieve-item',
      '.hero-card',
      '.action-footer',
      '.VPFeature'
    ]

    const elements = document.querySelectorAll(selectors.join(', '))

    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement
      if (htmlEl.dataset.revealed) return

      htmlEl.classList.add('scroll-reveal')
      htmlEl.style.transitionDelay = `${(index % 6) * 0.08}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('scroll-reveal-visible')
            el.dataset.revealed = 'true'
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    elements.forEach((el) => {
      if (!(el as HTMLElement).dataset.revealed) {
        observer.observe(el)
      }
    })
  }

  // Initial + route change
  initScrollReveal()

  const mutationObserver = new MutationObserver(() => {
    setTimeout(initScrollReveal, 100)
  })
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  })
})
</script>

<style>
.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-reveal-visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style>
