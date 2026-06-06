<template>
  <transition name="term-fade">
    <div v-if="visible" class="terminal-overlay" @click.self="close">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red" />
          <span class="terminal-dot yellow" />
          <span class="terminal-dot green" />
          <span class="terminal-title">canyu@portfolio:~</span>
        </div>
        <div class="terminal-body" ref="termBody">
          <div v-for="(line, i) in lines" :key="i" class="terminal-line" :class="line.type">
            <span v-if="line.prefix" class="terminal-prompt">{{ line.prefix }}</span>
            <span v-html="line.text" />
          </div>
          <div v-if="typing" class="terminal-cursor-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-text">{{ currentTypeText }}</span>
            <span class="terminal-blink">▌</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
const typing = ref(false)
const currentTypeText = ref('')
const lines = ref<{ type: string; prefix?: string; text: string }[]>([])
const termBody = ref<HTMLElement>()

// Konami code: ↑↑↓↓←→←→BA
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIndex = 0

const script = [
  { type: 'cmd', prefix: '$', text: 'whoami' },
  { type: 'output', text: '陈灿域 - AI算法 & 全栈开发工程师' },
  { type: 'cmd', prefix: '$', text: 'cat skills.txt' },
  { type: 'output', text: 'LangGraph | Python | Spring Boot | Vue3 | Docker | vLLM' },
  { type: 'cmd', prefix: '$', text: 'ls achievements/' },
  { type: 'output', text: 'ICME_2026.pdf  patent_1.pdf  patent_2.pdf  math_modeling_x2.pdf' },
  { type: 'cmd', prefix: '$', text: 'echo "Keep coding, keep learning 🚀"' },
  { type: 'success', text: 'Keep coding, keep learning 🚀' },
  { type: 'cmd', prefix: '$', text: 'neofetch' },
  { type: 'output', text: '<span style="color:#6366f1">  ╔══════════╗</span>    <span style="color:#6366f1">OS:</span> Ubuntu 24.04 | <span style="color:#6366f1">Host:</span> Aliyun ECS' },
  { type: 'output', text: '<span style="color:#8b5cf6">  ║  CY Dev  ║</span>    <span style="color:#8b5cf6">Kernel:</span> LangGraph 11-Agent' },
  { type: 'output', text: '<span style="color:#06b6d4">  ║  ▓▓▓▓▓▓  ║</span>    <span style="color:#06b6d4">Uptime:</span> 2 years in AI' },
  { type: 'output', text: '<span style="color:#6366f1">  ╚══════════╝</span>    <span style="color:#6366f1">Shell:</span> Python 3.12' },
  { type: 'output', text: '' },
  { type: 'success', text: '✨ Hint: 你发现了彩蛋！试试在简历页面输入 konami code ↑↑↓↓←→←→BA' },
]

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function typeCommand(text: string) {
  typing.value = true
  for (let i = 0; i <= text.length; i++) {
    currentTypeText.value = text.slice(0, i)
    await sleep(50 + Math.random() * 30)
  }
  await sleep(300)
  typing.value = false
  currentTypeText.value = ''
}

async function runScript() {
  lines.value = []
  visible.value = true

  await sleep(400)

  for (const item of script) {
    if (item.type === 'cmd') {
      await typeCommand(item.text)
      lines.value.push({ type: item.type, prefix: item.prefix, text: item.text })
    } else {
      await sleep(150)
      lines.value.push({ type: item.type, text: item.text })
    }
    // Auto-scroll
    await sleep(50)
    if (termBody.value) {
      termBody.value.scrollTop = termBody.value.scrollHeight
    }
  }
}

function close() {
  visible.value = false
  lines.value = []
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && visible.value) {
    close()
    return
  }

  if (konamiCode[konamiIndex] === e.key) {
    konamiIndex++
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0
      runScript()
    }
  } else {
    konamiIndex = 0
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.terminal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.terminal-window {
  width: 100%;
  max-width: 640px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
  animation: termAppear 0.3s ease-out;
}

@keyframes termAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.terminal-header {
  background: #1e293b;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ef4444; }
.terminal-dot.yellow { background: #eab308; }
.terminal-dot.green { background: #22c55e; }

.terminal-title {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

.terminal-body {
  background: #0f172a;
  padding: 1rem 1.25rem;
  min-height: 280px;
  max-height: 420px;
  overflow-y: auto;
  font-size: 0.82rem;
  line-height: 1.8;
}

.terminal-line {
  white-space: pre-wrap;
  word-break: break-all;
}

.terminal-line.cmd {
  color: #e2e8f0;
}

.terminal-line.output {
  color: #94a3b8;
}

.terminal-line.success {
  color: #6366f1;
  font-weight: 600;
}

.terminal-prompt {
  color: #22c55e;
  margin-right: 0.5rem;
  font-weight: 600;
}

.terminal-cursor-line {
  display: flex;
  align-items: center;
}

.terminal-cursor-text {
  color: #e2e8f0;
}

.terminal-blink {
  color: #6366f1;
  animation: termBlink 1s step-end infinite;
}

@keyframes termBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.term-fade-enter-active,
.term-fade-leave-active {
  transition: opacity 0.3s ease;
}

.term-fade-enter-from,
.term-fade-leave-to {
  opacity: 0;
}

/* Scrollbar in terminal */
.terminal-body::-webkit-scrollbar {
  width: 6px;
}

.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 3px;
}
</style>
