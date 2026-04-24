<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white">
    <!-- 安全区：状态栏高度（自动，不转vw） -->
    <div class="pt-[env(safe-area-inset-top)]" />

    <div class="flex items-center justify-center h-108">
      <h1 class="font-normal text-32 text-[#333333]">
        {{ title }}
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
