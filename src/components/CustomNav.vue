<template>
  <header class="fixed top-0 left-0 right-0 z-[var(--z-navbar)] bg-white pt-safe">
    <div class="relative flex items-center px-32 h-108">
      <div class="absolute -translate-y-1/2 top-1/2 left-32">
        <slot name="left">
          <button aria-label="返回" @click="onBack">
            <SvgIcon name="line-md:arrow-left" class="w-24 h-24" />
          </button>
        </slot>
      </div>

      <slot name="title">
        <h1 class="flex-1 text-center font-normal text-32 text-[#333333] truncate">
          {{ title }}
        </h1>
      </slot>

      <div class="absolute -translate-y-1/2 top-1/2 right-32">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title?: string
  onBack?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

const router = useRouter()

function onBack() {
  if (props.onBack) {
    props.onBack()
    return
  }
  router.back()
}
</script>
