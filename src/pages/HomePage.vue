<template>
  <div class="w-40 h-40 bg-purple-500" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    长按我{{ meStore.me.email }}
  </div>
</template>

<script setup lang="ts">
import { useLongPress } from '../hooks/useLongPress'
import { useMeStore } from '../stores/meStore'

const { onTouchStart, onTouchMove, onTouchEnd } = useLongPress(() => {
  console.log('触发长按')
}, 600)

const meStore = useMeStore()
</script>
