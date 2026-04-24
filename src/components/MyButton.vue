<template>
  <button :disabled="buttonLoading" class="w-full h-108 flex items-center justify-center gap-4 rounded-full font-medium text-32 text-white bg-[#2D8FFF]">
    <SvgIcon v-show="buttonLoading" class="mr-12 animate-1s animate-spin" name="loading" />
    <span>{{ buttonName }}</span>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  buttonName: string
  buttonLoading: boolean
}
withDefaults(defineProps<Props>(), {
  buttonName: '确定',
  buttonLoading: false
})
</script>

<style lang="scss" scoped></style>
