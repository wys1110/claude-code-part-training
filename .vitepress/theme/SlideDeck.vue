<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SlideFrame from './SlideFrame.vue'
import type { Slide } from '../../slides/deck'

const props = withDefaults(defineProps<{
  slides: Slide[]
  base?: string
}>(), {
  base: '/claude-code-part-training/'
})

const current = ref(0)
const overview = ref(false)
const notesOpen = ref(false)
const helpOpen = ref(false)
const touchStartX = ref<number | null>(null)
const previousOverflow = ref('')

const slide = computed(() => props.slides[current.value])
const progress = computed(() => ((current.value + 1) / props.slides.length) * 100)

function clamp(index: number) {
  return Math.max(0, Math.min(props.slides.length - 1, index))
}

function go(index: number) {
  current.value = clamp(index)
  overview.value = false
}

function next() { go(current.value + 1) }
function previous() { go(current.value - 1) }

function syncHash() {
  if (typeof window === 'undefined') return
  const hash = `#slide=${current.value + 1}`
  if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
}

function readHash() {
  if (typeof window === 'undefined') return
  const match = window.location.hash.match(/slide=(\d+)/)
  if (match) current.value = clamp(Number(match[1]) - 1)
}

async function toggleFullscreen() {
  if (typeof document === 'undefined') return
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
  else await document.exitFullscreen?.()
}

function printDeck() {
  if (typeof window === 'undefined') return
  window.print()
}

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.matches('input, textarea, select')) return

  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault(); next()
  } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault(); previous()
  } else if (event.key === 'Home') {
    event.preventDefault(); go(0)
  } else if (event.key === 'End') {
    event.preventDefault(); go(props.slides.length - 1)
  } else if (event.key.toLowerCase() === 'o') {
    overview.value = !overview.value
  } else if (event.key.toLowerCase() === 'n') {
    notesOpen.value = !notesOpen.value
  } else if (event.key.toLowerCase() === 'f') {
    toggleFullscreen()
  } else if (event.key.toLowerCase() === 'p') {
    printDeck()
  } else if (event.key === '?') {
    helpOpen.value = !helpOpen.value
  } else if (event.key === 'Escape') {
    overview.value = false
    notesOpen.value = false
    helpOpen.value = false
  }
}

function onStageClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.closest('a, button, pre, code')) return
  const ratio = event.clientX / window.innerWidth
  if (ratio < 0.32) previous()
  else if (ratio > 0.68) next()
}

function onTouchStart(event: TouchEvent) {
  touchStartX.value = event.touches[0]?.clientX ?? null
}

function onTouchEnd(event: TouchEvent) {
  if (touchStartX.value === null) return
  const end = event.changedTouches[0]?.clientX ?? touchStartX.value
  const delta = end - touchStartX.value
  if (Math.abs(delta) > 55) delta < 0 ? next() : previous()
  touchStartX.value = null
}

watch(current, syncHash)

onMounted(() => {
  readHash()
  syncHash()
  previousOverflow.value = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('hashchange', readHash)
})

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow.value
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('hashchange', readHash)
})
</script>

<template>
  <div class="deck-shell">
    <header class="deck-topbar">
      <a class="deck-brand" :href="base">
        <span class="brand-mark">CC</span>
        <span>Claude Code Training</span>
      </a>
      <div class="deck-status">
        <span>{{ slide.section }}</span>
        <strong>{{ current + 1 }} / {{ slides.length }}</strong>
      </div>
      <nav class="deck-controls" aria-label="발표 제어">
        <button type="button" title="이전 슬라이드" @click="previous">←</button>
        <button type="button" title="다음 슬라이드" @click="next">→</button>
        <button type="button" title="개요 (O)" @click="overview = !overview">▦</button>
        <button type="button" title="발표자 노트 (N)" @click="notesOpen = !notesOpen">N</button>
        <button type="button" title="전체 화면 (F)" @click="toggleFullscreen">⛶</button>
        <button type="button" title="인쇄/PDF (P)" @click="printDeck">PDF</button>
        <button type="button" title="단축키 도움말 (?)" @click="helpOpen = !helpOpen">?</button>
      </nav>
    </header>

    <main class="deck-stage" @click="onStageClick" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <SlideFrame :slide="slide" :base="base" />
    </main>

    <div class="deck-progress" aria-hidden="true"><span :style="{ width: `${progress}%` }"></span></div>

    <aside v-if="notesOpen" class="speaker-notes" aria-label="발표자 노트">
      <div class="overlay-heading">
        <strong>발표자 노트 · {{ current + 1 }}</strong>
        <button type="button" @click="notesOpen = false">닫기</button>
      </div>
      <ul><li v-for="note in slide.notes" :key="note">{{ note }}</li></ul>
      <p v-if="slide.action"><b>참가자 행동:</b> {{ slide.action }}</p>
      <p><b>전환:</b> {{ slide.transition }}</p>
    </aside>

    <div v-if="overview" class="deck-overlay overview-panel">
      <div class="overlay-heading">
        <strong>슬라이드 개요</strong>
        <button type="button" @click="overview = false">닫기</button>
      </div>
      <div class="overview-grid">
        <button v-for="(item, index) in slides" :key="item.id" type="button" :class="{ active: index === current }" @click="go(index)">
          <span>{{ index + 1 }}</span>
          <strong>{{ item.title }}</strong>
          <small>{{ item.section }}</small>
        </button>
      </div>
    </div>

    <div v-if="helpOpen" class="deck-overlay help-panel">
      <div class="overlay-heading">
        <strong>발표 모드 단축키</strong>
        <button type="button" @click="helpOpen = false">닫기</button>
      </div>
      <div class="shortcut-grid">
        <span><kbd>←</kbd><kbd>→</kbd> 이동</span>
        <span><kbd>Space</kbd> 다음</span>
        <span><kbd>O</kbd> 개요</span>
        <span><kbd>N</kbd> 노트</span>
        <span><kbd>F</kbd> 전체 화면</span>
        <span><kbd>P</kbd> PDF/인쇄</span>
        <span><kbd>Home</kbd><kbd>End</kbd> 처음/끝</span>
        <span><kbd>Esc</kbd> 패널 닫기</span>
      </div>
    </div>

    <section class="print-deck" aria-hidden="true">
      <SlideFrame v-for="item in slides" :key="item.id" :slide="item" :base="base" compact />
    </section>
  </div>
</template>
