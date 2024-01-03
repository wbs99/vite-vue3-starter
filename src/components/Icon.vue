<template>
  <svg class="h-5 w-5 overflow-hidden fill-current">
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
