import { computed, ref } from "vue"

export const useTimeCount = (time: number) => {
  const timer = ref<number>()
  const count = ref<number>(time)
  const isCounting = computed(() => !!timer.value)
  const startCount = () => {
    timer.value = setInterval(() => {
      count.value -= 1
      if (count.value === 0) {
        clearInterval(timer.value)
        timer.value = undefined
        count.value = time
      }
    }, 1000)
  }
  const onClickSendValidationCode = () => {
    startCount()
  }
  return { startCount, isCounting, count }
}