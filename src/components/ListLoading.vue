<template>
  <div v-show="!isLoading && hasMore" ref="target" />
  <div v-show="isLoading">
    正在加载
  </div>
  <div v-show="!isLoading && !hasMore">
    没有更多
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

type Props = {
  isLoading: boolean
  hasMore: boolean
}
withDefaults(defineProps<Props>(), {
  isLoading: false,
  hasMore: false
})

const emit = defineEmits(['infinite'])

const target = ref(null)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      emit('infinite')
    }
  }
)
</script>

<style lang="scss" scoped>

</style>
