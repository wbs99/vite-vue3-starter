<template>
  <div mx-24px h-screen flex flex-col items-center justify-center>
    <MyButton mb-24px :button-loading="loginLoading" @click="onLogin" />
  </div>
</template>

<script lang="ts" setup>
import { getJwtApi } from '../api'
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
