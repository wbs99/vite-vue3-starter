<template>
  <button :disabled="buttonLoading" class="w-btn">
    <SvgIcon v-show="buttonLoading" class="mr-3 animate-1s animate-spin" name="loading" />
    {{ buttonName }}
  </button>
</template>

<script lang="ts" setup>
defineProps({
  buttonName: {
    type: String,
    default: '登录'
  },
  buttonLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
