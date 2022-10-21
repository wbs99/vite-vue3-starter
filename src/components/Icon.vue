<template>
  <svg class="icon">
    <use :xlink:href="`#${props.name}`" />
  </svg>
</template>


<script lang="ts" setup >
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>