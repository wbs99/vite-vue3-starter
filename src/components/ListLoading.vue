<template>
  <div class="flex items-center justify-center py-24">
    <template v-if="loading">
      <SvgIcon name="loading" class="mr-12 animate-spin text-sky-400 w-32 h-32" />
      <span class="text-28 text-[#999999]">加载中...</span>
    </template>
    <span v-else-if="!hasMore" class="text-28 text-[#999999]">没有更多了</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
  hasMore: boolean
}

defineProps<Props>()
</script>
