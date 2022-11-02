<template>
  <div>
    <button :disabled="isCounting" @click="onClickSendValidationCode">
      <span v-if="isCounting">{{ count }}秒后可重新发送</span><span v-else>发送验证码</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useTimeCount } from '../hooks/useTimeCount';

const { startCount, isCounting, count } = useTimeCount(3)
const onClickSendValidationCode = () => {
  startCount()
}

</script>


<style lang="scss" scoped>
  button {
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
</style>
