<template>
  <div class="flex flex-col items-center justify-center h-screen mx-6">
    <MyButton class="mb-6" :button-loading="loginLoading" button-name="登录" @click="onLogin" />
  </div>
</template>

<script lang="ts" setup>
import type { LoginForm } from '../api/me-api'
import { loginApi } from '../api/me-api'
import { useMeStore } from '../stores/meStore'
import { setJwt } from '../utils/storage'

const route = useRoute()
const router = useRouter()
const meStore = useMeStore()

const loginLoading = ref(false)

const loginForm = reactive<LoginForm>({
  email: '1134954328@qq.com',
  code: '123456'
})
const onLogin = async () => {
  const response = await loginApi(loginForm, loginLoading).catch(onLoginError)
  setJwt(response.data.jwt)
  await meStore.fetchMe()
  const returnTo = route.query.return_to?.toString()
  router.push(returnTo || '/')
}
const onLoginError = (error: any) => {
  throw error
}
</script>

<style lang="scss" scoped></style>
