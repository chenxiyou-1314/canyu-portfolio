import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 打字机效果
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
      
      // 页面加载后执行
      if (document.readyState === 'complete') {
        initTypewriter()
      } else {
        window.addEventListener('load', initTypewriter)
      }
      
      // 路由切换后也执行
      const observer = new MutationObserver(() => {
        initTypewriter()
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }
  }
}
