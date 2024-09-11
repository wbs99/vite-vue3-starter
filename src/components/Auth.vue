<template>
  <div>
    <slot v-if="checkAuth()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script setup lang="ts">
import { auth } from '../utils/useAuth'

defineOptions({
  name: 'Auth',
})

const props = defineProps<{
  value: string | string[]
}>()

const checkAuth = () => auth(props.value)
</script>
