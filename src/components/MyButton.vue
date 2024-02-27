<template>
  <button :disabled="buttonLoading" class="w-btn">
    <MyIcon v-show="buttonLoading" class="animate-1s mr-3 animate-spin" name="loading" />
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
