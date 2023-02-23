<template>
  <div>
    sign in page
    <button @click="onSignIn"> sign in</button>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { getJwtApi } from '../apis';
import { fetchMe } from '../shared/me';
const route = useRoute()
const router = useRouter()

const onSignIn = async () => {
  const response = await getJwtApi().catch(onSignInError)
  localStorage.setItem('jwt', response.data.jwt)
  const returnTo = route.query.return_to?.toString()
  fetchMe()
  router.push(returnTo || '/')
}
const onSignInError = (error: any) => {
  throw error
}
</script>


<style lang="scss" scoped>

</style>
