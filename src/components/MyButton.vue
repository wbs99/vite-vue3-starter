<template>
  <button :disabled="buttonLoadingStore.buttonLoading" class="p-btn">
    <Icon v-show="buttonLoadingStore.buttonLoading" class="animate-spin animate-1s mr-12px" name="loading" />
    登录
  </button>
</template>

<script lang="ts" setup>
import { useButtonLoadingStore } from '../stores/useButtonLoadingStore'

const buttonLoadingStore = useButtonLoadingStore()
</script>

<style lang="scss" scoped></style>
