<template>
  <div class="flex items-center justify-center min-h-screen px-32 bg-gray-100">
    <button class="custom-btn w-686 h-88 rounded-30 text-28 font-semibold text-[#814319]" @click="router.push('/me')">
      我的作品
    </button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style lang="scss" scoped>
.custom-btn{
  background: linear-gradient(270deg, #fff8f8 0%, #ffe3e6 37%, #feebb5 100%)
}
</style>
