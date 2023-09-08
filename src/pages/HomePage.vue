<template>
  <div>
    home page
  </div>
  <button @click="logout">
    退出登录
  </button>
  <div>
    {{ meStore.me.id }}
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { removeJwt } from '../shared/storage'
import { useMeStore } from '../store/meStore'

const router = useRouter()
const meStore = useMeStore()
const logout = () => {
  router.push('/login')
  removeJwt()
}
</script>

<style lang="scss" scoped></style>
