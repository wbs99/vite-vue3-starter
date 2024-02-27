<template>
  <div>
    home page
  </div>
  <Icon icon="line-md:arrow-left" class="w-[1.2em] h-[1.2em]" />
  <div>
    {{ meStore.me.id }}
  </div>
  <MyButton button-name="退出登录" @click="logout" />
  <InfiniteList />
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useMeStore } from '../stores/meStore'
import { removeJwt } from '../utils/storage'

const router = useRouter()
const meStore = useMeStore()
const logout = () => {
  router.push('/login')
  removeJwt()
}
</script>
