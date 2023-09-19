<template>
  <div class="flex flex-col justify-center items-center h-screen mx-24px">
    <MyButton class="mb-24px" :button-loading="loginLoading" @click="onLogin" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getJwtApi } from '../api'
import MyButton from '../components/MyButton.vue'
import { setJwt } from '../utils/storage'

const route = useRoute()
const router = useRouter()

const loginLoading = ref(false)
const onLogin = async () => {
  const response = await getJwtApi(loginLoading).catch(onLoginError)
  setJwt(response.data.jwt)
  const returnTo = route.query.return_to?.toString()
  router.push(returnTo || '/')
}
const onLoginError = (error: any) => {
  throw error
}
</script>

<style lang="scss" scoped></style>
