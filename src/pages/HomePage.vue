<template>
  <div>
    home page
  </div>
  <div>
    {{ meStore.me.id }}
  </div>
  <MyButton button-name="退出登录" @click="logout" />
</template>

<script lang="ts" setup>
import MyButton from '../components/MyButton.vue'
import { useMeStore } from '../stores/meStore'
import { removeJwt } from '../utils/storage'

const router = useRouter()
const meStore = useMeStore()
const logout = () => {
  router.push('/login')
  removeJwt()
}
</script>

<style lang="scss" scoped></style>
