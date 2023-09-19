<template>
  <div class="flex justify-center items-center h-screen mx-24px">
    <MyButton class="mb-24px" @click="onLogin" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { getJwtApi } from '../api'
import { setJwt } from '../utils/storage'
import MyButton from '../components/MyButton.vue'

const route = useRoute()
const router = useRouter()

const onLogin = async () => {
  const response = await getJwtApi().catch(onLoginError)
  setJwt(response.data.jwt)
  const returnTo = route.query.return_to?.toString()
  router.push(returnTo || '/')
}
const onLoginError = (error: any) => {
  throw error
}
</script>

<style lang="scss" scoped></style>
