import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useButtonLoadingStore = defineStore(
  'buttonLoadingStore',
  () => {
    const buttonLoading = ref(false)
    const startButtonLoading = () => {
      buttonLoading.value = true
    }
    const closeButtonLoading = () => {
      buttonLoading.value = false
    }

    return {
      buttonLoading,
      startButtonLoading,
      closeButtonLoading
    }
  }
)
