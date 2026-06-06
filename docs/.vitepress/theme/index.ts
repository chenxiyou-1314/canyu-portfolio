import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import MouseTrail from './MouseTrail.vue'
import ScrollReveal from './ScrollReveal.vue'
import SkillRadar from './SkillRadar.vue'
import CardTilt from './CardTilt.vue'
import ScrollProgress from './ScrollProgress.vue'
import BackToTop from './BackToTop.vue'
import TerminalEasterEgg from './TerminalEasterEgg.vue'
import PageLoader from './PageLoader.vue'
import StarField from './StarField.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [
        h(PageLoader),
        h(ScrollProgress),
        h(BackToTop),
        h(StarField),
        // MouseTrail only on desktop
        typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
          ? h(MouseTrail)
          : null,
        h(ScrollReveal),
        h(CardTilt),
        h(TerminalEasterEgg)
      ]
    })
  },
  enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      // ── Multi-phrase rotating typewriter with gradient color ──
      const phrases = [
        'AI算法 & 全栈开发 · 硕士研究生',
        'LangGraph 11-Agent 系统设计者',
        'ICME 2026 二作 · 2项国家发明专利',
        '从文献检索到趋势预测的全链路自动化'
      ]
      let phraseIndex = 0
      let charIndex = 0
      let isDeleting = false
      let typewriterTimer: ReturnType<typeof setTimeout> | null = null

      const gradientColors = ['#6366f1', '#818cf8', '#8b5cf6', '#a78bfa', '#06b6d4']

      function createGradientSpan(text: string) {
        let html = ''
        for (let i = 0; i < text.length; i++) {
          const colorIdx = i % gradientColors.length
          html += `<span style="color:${gradientColors[colorIdx]}">${text[i]}</span>`
        }
        return html
      }

      function typewriterStep() {
        const el = document.getElementById('hero-typewriter') as HTMLElement
          || document.querySelector('.VPHero .tagline') as HTMLElement
        if (!el) return

        const currentPhrase = phrases[phraseIndex]

        if (!isDeleting) {
          charIndex++
          const displayText = currentPhrase.slice(0, charIndex)
          el.innerHTML = createGradientSpan(displayText)
          if (charIndex === currentPhrase.length) {
            typewriterTimer = setTimeout(() => {
              isDeleting = true
              typewriterStep()
            }, 2500)
            return
          }
          typewriterTimer = setTimeout(typewriterStep, 70)
        } else {
          charIndex--
          const displayText = currentPhrase.slice(0, charIndex)
          el.innerHTML = createGradientSpan(displayText)
          if (charIndex === 0) {
            isDeleting = false
            phraseIndex = (phraseIndex + 1) % phrases.length
            typewriterTimer = setTimeout(typewriterStep, 400)
            return
          }
          typewriterTimer = setTimeout(typewriterStep, 35)
        }
      }

      const initTypewriter = () => {
        const el = document.getElementById('hero-typewriter') as HTMLElement
          || document.querySelector('.VPHero .tagline') as HTMLElement
        if (!el || el.dataset.typed === 'rotating') return
        el.dataset.typed = 'rotating'
        el.innerHTML = ''
        charIndex = 0
        phraseIndex = 0
        isDeleting = false
        if (typewriterTimer) clearTimeout(typewriterTimer)
        setTimeout(typewriterStep, 600)
      }

      // ── Skill radar auto-inject ──
      const injectRadar = () => {
        const skillSection = document.querySelector('.skill-grid')
        if (!skillSection || skillSection.dataset.radarInjected) return

        const wrapper = document.createElement('div')
        wrapper.className = 'skill-radar-slot'
        wrapper.id = 'skill-radar-mount'
        skillSection.parentElement!.insertBefore(wrapper, skillSection)
        skillSection.dataset.radarInjected = 'true'

        const { createApp } = require('vue')
        const radarApp = createApp(SkillRadar)
        radarApp.mount(wrapper)
      }

      // ── Initialize ──
      const init = () => {
        initTypewriter()
        setTimeout(injectRadar, 800)
      }

      if (document.readyState === 'complete') {
        init()
      } else {
        window.addEventListener('load', init)
      }

      const observer = new MutationObserver(() => {
        setTimeout(init, 200)
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }
  }
}
