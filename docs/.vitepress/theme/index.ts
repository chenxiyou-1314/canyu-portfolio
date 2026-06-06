import { h, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import MouseTrail from './MouseTrail.vue'
import ScrollReveal from './ScrollReveal.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    // Use VitePress DefaultTheme.Layout and inject effects
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [h(MouseTrail), h(ScrollReveal)]
    })
  },
  enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      const initTypewriter = () => {
        const el = document.querySelector('.VPHero .tagline') as HTMLElement
        if (!el || el.dataset.typed) return
        const text = el.textContent || ''
        el.textContent = ''
        el.dataset.typed = 'true'
        let i = 0
        const type = () => {
          if (i <= text.length) {
            el.textContent = text.slice(0, i)
            i++
            setTimeout(type, 60)
          }
        }
        setTimeout(type, 400)
      }

      if (document.readyState === 'complete') {
        initTypewriter()
      } else {
        window.addEventListener('load', initTypewriter)
      }

      const observer = new MutationObserver(() => {
        initTypewriter()
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }
  }
}
