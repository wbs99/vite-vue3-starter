<template>
  <svg class="w-1.2em h-1.2em fill-current overflow-hidden">
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
