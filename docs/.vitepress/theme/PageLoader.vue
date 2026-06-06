<template>
  <transition name="loader-fade">
    <div v-if="visible" class="page-loader">
      <div class="loader-content">
        <div class="loader-logo">
          <span class="loader-char c">C</span>
          <span class="loader-char y">Y</span>
        </div>
        <div class="loader-bar-track">
          <div class="loader-bar-fill" :style="{ width: progress + '%' }" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)
const progress = ref(0)

onMounted(() => {
  // Simulate loading progress
  const interval = setInterval(() => {
    progress.value += Math.random() * 25 + 10
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        visible.value = false
      }, 300)
    }
  }, 120)
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loader-logo {
  display: flex;
  gap: 0.15em;
}

.loader-char {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  animation: charPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.loader-char.c {
  color: #6366f1;
  animation-delay: 0.1s;
}

.loader-char.y {
  color: #06b6d4;
  animation-delay: 0.2s;
}

@keyframes charPop {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.loader-bar-track {
  width: 120px;
  height: 3px;
  background: var(--vp-c-bg-soft);
  border-radius: 9999px;
  overflow: hidden;
}

.loader-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  border-radius: 9999px;
  transition: width 0.15s ease-out;
}

.loader-fade-leave-active {
  transition: opacity 0.4s ease;
}

.loader-fade-leave-to {
  opacity: 0;
}
</style>
