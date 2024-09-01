<template>
  <Icon v-if="outputType === 'iconify'" :icon="props.name" />
  <svg v-else class="overflow-hidden fill-current size-[1em]">
    <use :xlink:href="`#${props.name}`" />
  </svg>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

type Props = {
  name: string
}
const props = withDefaults(defineProps<Props>(), {
  name: 'mangosteen',
})

const outputType = computed(() => {
  // if (/^https?:\/\//.test(props.name)) {
  //   return 'img'
  // }
  // else if (/i-[^:]+:[^:]+/.test(props.name)) {
  //   return 'unocss'
  // }
  if (props.name.includes(':')) {
    return 'iconify'
  } else {
    return 'svg'
  }
})
</script>

<style lang="scss" scoped></style>
