---
layout: false
outline: false
aside: false
navbar: false
footer: false
title: Claude Code 2시간 발표 모드
---

<script setup lang="ts">
import SlideDeck from '../.vitepress/theme/SlideDeck.vue'
import { slides } from './pages-deck'
</script>

<SlideDeck :slides="slides" base="/claude-code-part-training/" />
