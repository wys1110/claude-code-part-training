<script setup lang="ts">
import type { Slide } from '../../slides/deck'

defineProps<{
  slide: Slide
  base: string
  compact?: boolean
}>()
</script>

<template>
  <article class="slide-card" :class="[`slide-${slide.kind ?? 'content'}`, { 'is-compact': compact }]">
    <div class="slide-meta">
      <span>{{ slide.section }}</span>
      <span>{{ slide.minutes }}분</span>
    </div>

    <div class="slide-copy">
      <p v-if="slide.kicker" class="slide-kicker">{{ slide.kicker }}</p>
      <h1>{{ slide.title }}</h1>
      <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>

      <div v-if="slide.badges?.length" class="slide-badges">
        <span v-for="badge in slide.badges" :key="badge">{{ badge }}</span>
      </div>

      <blockquote v-if="slide.quote" class="slide-quote">{{ slide.quote }}</blockquote>

      <div v-if="slide.flow?.length" class="slide-flow" :class="{ 'is-loop': slide.visual === 'agent-loop' }">
        <template v-for="(step, index) in slide.flow" :key="step">
          <div class="flow-node">{{ step }}</div>
          <div v-if="index < slide.flow.length - 1" class="flow-arrow" aria-hidden="true">→</div>
        </template>
      </div>

      <div v-if="slide.visual === 'local-remote'" class="local-remote-visual">
        <div class="repo-node"><span>💻</span><strong>Local repository</strong><small>내 PC · Git</small></div>
        <div class="repo-sync"><b>pull</b><span>⇄</span><b>push</b></div>
        <div class="repo-node"><span>☁️</span><strong>Remote repository</strong><small>GitHub</small></div>
      </div>

      <div v-if="slide.columns?.length" class="slide-columns" :class="`cols-${Math.min(slide.columns.length, 3)}`">
        <section v-for="column in slide.columns" :key="column.title" class="slide-column">
          <h2>{{ column.title }}</h2>
          <p v-if="column.body">{{ column.body }}</p>
          <ul v-if="column.items?.length">
            <li v-for="item in column.items" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>

      <ul v-if="slide.bullets?.length" class="slide-bullets">
        <li v-for="bullet in slide.bullets" :key="bullet">{{ bullet }}</li>
      </ul>

      <div v-if="slide.prompt" class="prompt-box">
        <div class="prompt-label">COPY PROMPT</div>
        <pre><code>{{ slide.prompt }}</code></pre>
      </div>

      <pre v-if="slide.code" class="slide-code"><code>{{ slide.code }}</code></pre>

      <div v-if="slide.table" class="slide-table-wrap">
        <table class="slide-table">
          <thead><tr><th v-for="header in slide.table.headers" :key="header">{{ header }}</th></tr></thead>
          <tbody>
            <tr v-for="(row, rowIndex) in slide.table.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="slide.callout" class="slide-callout">{{ slide.callout }}</div>
    </div>

    <footer class="slide-footer">
      <a v-if="slide.guide" :href="`${base}${slide.guide.replace(/^\//, '')}`">상세 교재 ↗</a>
      <span v-else></span>
      <span v-if="slide.sources?.length" class="slide-sources">
        <a v-for="source in slide.sources" :key="source.url" :href="source.url" target="_blank" rel="noreferrer">{{ source.label }}</a>
      </span>
    </footer>
  </article>
</template>
