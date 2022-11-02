<template>
  <div>
    <div>home page</div>
    <div>
      {{ countStore.count }}
      <button @click="countStore.addCount">+1</button>
      <button @click="countStore.addFive(5)">+5</button>
    </div>
    <router-link to="/about">about</router-link>
    <Icon name='add' />
    <br>
    <CountDown />

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import CountDown from '../demos/CountDown.vue';
import { CountStore } from '../store/CountStore';
const countStore = CountStore()


</script>


<style lang="scss" scoped>

</style>
