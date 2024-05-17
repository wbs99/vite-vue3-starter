import { ref } from 'vue'

export const useLongPress = (onLongPress: () => void) => {
  const timer = ref<number>()
  const pressElement = ref<HTMLDivElement>()
  const onTouchStart = (e: TouchEvent) => {
    pressElement.value = e.currentTarget as HTMLDivElement
    timer.value = setTimeout(() => {
      onLongPress()
    }, 500)
  }
  const onTouchEnd = () => {
    clearTimeout(timer.value)
  }

  const onTouchMove = (e: TouchEvent) => {
    const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (pressElement.value !== pointedElement
      && pressElement.value?.contains(pointedElement) === false) {
      clearTimeout(timer.value)
    }
  }
  return { onTouchStart, onTouchMove, onTouchEnd }
}
