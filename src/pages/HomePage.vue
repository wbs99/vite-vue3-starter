<template>
  <div>
    home page
  </div>
  <div class="border h-32 flex justify-center items-center" @touchmove="onTouchMove">
    <div class="w-16 h-16  bg-green-500" @touchstart="onTouchStart" @touchend="onTouchEnd" />
  </div>
  <Icon icon="line-md:arrow-left" class="w-[1.2em] h-[1.2em]" />
  <div>
    id {{ meStore.me.id }}
  </div>
  <MyButton button-name="退出登录" @click="logout" />
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useLongPress } from '../hooks/useLongPress'
import { useMeStore } from '../stores/meStore'
import { removeJwt } from '../utils/storage'

const router = useRouter()
const meStore = useMeStore()
const logout = () => {
  router.push('/login')
  removeJwt()
}
const onLongPress = () => {
  console.log('这是长按')
}
const { onTouchStart, onTouchMove, onTouchEnd } = useLongPress(onLongPress)
</script>
