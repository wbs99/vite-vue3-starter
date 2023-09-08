<template>
  <div>home page</div>
  <button @click="logout">
    退出登录
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { removeJwt } from '../shared/storage'

const router = useRouter()
const logout = () => {
  router.push('/login')
  removeJwt()
}
</script>

<style lang="scss" scoped></style>
