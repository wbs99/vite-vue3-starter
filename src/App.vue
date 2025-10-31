<template>
  <router-view />
</template>

<script setup lang="ts">
import autofit from 'autofit.js'

onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: '#app',
    resize: true,
  })
  autofit.isAutofitRunning = true
})

onUnmounted(() => {
  autofit.off()
})
</script>

<style lang="scss">
</style>
