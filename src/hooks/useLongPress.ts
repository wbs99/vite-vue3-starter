export const useLongPress = (onLongPress: () => void, delay = 500, moveThreshold = 10) => {
  const timer = ref<number>()
  const startX = ref(0)
  const startY = ref(0)
  const moved = ref(false)
  const pressElement = ref<HTMLElement>()

  const clearLongPress = () => {
    clearTimeout(timer.value)
    moved.value = false
  }

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX.value = touch.clientX
    startY.value = touch.clientY
    pressElement.value = e.currentTarget as HTMLElement
    moved.value = false

    timer.value = window.setTimeout(() => {
      if (!moved.value) {
        onLongPress()
      }
    }, delay)
  }

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    const deltaX = Math.abs(touch.clientX - startX.value)
    const deltaY = Math.abs(touch.clientY - startY.value)
    const distance = Math.max(deltaX, deltaY)

    // 若移动距离超过阈值，认为取消长按
    if (distance > moveThreshold) {
      moved.value = true
      clearLongPress()
    }
  }

  const onTouchEnd = () => {
    clearLongPress()
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
