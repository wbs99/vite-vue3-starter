<template>
  <div>
    <slot v-if="checkAuthAll()" />
    <slot v-else name="no-auth" />
  </div>
</template>

<script setup lang="ts">
import { authAll } from '../utils/useAuth'

defineOptions({
  name: 'AuthAll',
})

const props = defineProps<{
  value: string[]
}>()

const checkAuthAll = () => authAll(props.value)
</script>
