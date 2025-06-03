<template>
  <button :disabled="buttonLoading" class="flex items-center gap-1 py-2 px-4 rounded text-white bg-purple-500">
    <SvgIcon v-show="buttonLoading" class="mr-3 animate-1s animate-spin" name="loading" />
    <span>{{ buttonName }}</span>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  buttonName: string
  buttonLoading: boolean
}
withDefaults(defineProps<Props>(), {
  buttonName: '登录',
  buttonLoading: false
})
</script>

<style lang="scss" scoped></style>
