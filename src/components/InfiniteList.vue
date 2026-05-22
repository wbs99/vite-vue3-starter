<template>
  <div>
    <slot />
    <div ref="target">
      <ListLoading :loading="isFetching" :has-more="hasMore" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  hasMore: boolean
  isFetching: boolean
  fetchMore: () => void
}

const props = defineProps<Props>()

const target = ref(null)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting && props.hasMore && !props.isFetching) {
      props.fetchMore()
    }
  },
)
</script>
