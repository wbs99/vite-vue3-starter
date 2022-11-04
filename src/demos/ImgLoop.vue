<template>
  <div class="box">
    <div class="imgList">
      <img :src="img.src" v-for="img in imgList" :key="img.id">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const imgList = reactive([
  {
    id: 1,
    src: 'src/assets/icons/1.svg'
  },
  {
    id: 2,
    src: 'src/assets/icons/2.svg'
  },
  {
    id: 3,
    src: 'src/assets/icons/3.svg'
  },
  {
    id: 4,
    src: 'src/assets/icons/4.svg'
  },
  {
    id: 5,
    src: 'src/assets/icons/5.svg'
  },
  {
    id: 6,
    src: 'src/assets/icons/6.svg'
  },
  {
    id: 7,
    src: 'src/assets/icons/7.svg'
  },
])


</script>


<style lang="scss" scoped>
  .box {
    width: 800px;
    height: 100px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid pink;
    position: relative;
  }
  .imgList {
    animation:rolling 25s linear infinite;
    position: absolute;
    display: flex;
  }
  img {
    height: 100px;
    float: left;
    margin-right: 10px;
  }
  @keyframes rolling {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }

</style>
