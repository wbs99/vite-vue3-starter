<template>
  <div class="flex flex-col items-center justify-center h-screen mx-6">
    <MyButton class="mb-6" :button-loading="loginLoading" @click="onLogin" />
  </div>
</template>

<script lang="ts" setup>
import { getJwtApi } from '../api/meApi'
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
