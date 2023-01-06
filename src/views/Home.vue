<template>
  <div>
    {{ countStore.count }}
    <button @click="countStore.addCount">+1</button>
    <button @click="countStore.addFive(5)">+5</button>
    <Icon name='add' />
  </div>
</template>

<script lang="ts" setup>
import { useCountStore } from '../store/useCountStore';

const countStore = useCountStore()


</script>


<style lang="scss" scoped>

</style>
