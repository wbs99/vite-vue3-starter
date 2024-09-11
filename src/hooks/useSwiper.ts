import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

type Point = {
  x: number
  y: number
}
type Options = {
  beforeStart?: (e: TouchEvent) => void
  afterStart?: (e: TouchEvent) => void
  beforeMove?: (e: TouchEvent) => void
  afterMove?: (e: TouchEvent) => void
  beforeEnd?: (e: TouchEvent) => void
  afterEnd?: (e: TouchEvent) => void
}

export const useSwiper = (element: Ref<HTMLElement | undefined>, options?: Options) => {
  const startPoint = ref<Point>()
  const endPoint = ref<Point>()
  const isSwiping = ref(false)
  const distance = computed(() => {
    if (!startPoint.value || !endPoint.value) { return null }
    return {
      x: endPoint.value.x - startPoint.value.x,
      y: endPoint.value.y - startPoint.value.y,
    }
  })
  const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) < 3 || Math.abs(y) < 3) {
      return ''
    } else if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e)
    isSwiping.value = true
    endPoint.value = startPoint.value = {
      x: e.touches[0].screenX,
      y: e.touches[0].screenY
    }
    options?.afterStart?.(e)
  }
  const onMoving = (e: TouchEvent) => {
    options?.beforeMove?.(e)
    if (!startPoint.value) { return }
    endPoint.value = {
      x: e.touches[0].screenX,
      y: e.touches[0].screenY
    }
    options?.afterMove?.(e)
  }
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e)
    isSwiping.value = false
    options?.afterEnd?.(e)
  }

  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMoving)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMoving)
    element.value.removeEventListener('touchend', onEnd)
  })
  return { isSwiping, direction, distance }
}
