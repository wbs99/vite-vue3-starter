<template>
  <div>
    登录页面
  </div>
  <button @click="onLogin">
    登录
  </button>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { getJwtApi } from '../api'
import { fetchMe } from '../shared/me'
import { setJwt } from '../shared/storage'

const route = useRoute()
const router = useRouter()

const onLogin = async () => {
  const response = await getJwtApi().catch(onLoginError)
  setJwt(response.data.jwt)
  const returnTo = route.query.return_to?.toString()
  fetchMe()
  router.push(returnTo || '/')
}
const onLoginError = (error: any) => {
  throw error
}
</script>

<style lang="scss" scoped></style>
