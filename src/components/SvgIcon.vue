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

const outputType = computed(() =>
  props.name.includes(':')
    ? 'iconify'
    : 'svg'
)
</script>

<style lang="scss" scoped></style>
