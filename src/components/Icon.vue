<template>
  <svg class="h-1.2em w-1.2em overflow-hidden fill-current">
    <use :xlink:href="`#${props.name}`" />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})
</script>

<style lang="scss" scoped></style>
