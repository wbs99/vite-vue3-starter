import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMeStore = defineStore(
  'meStore',
  () => {
    const me = reactive<User>({
      id: 0,
      email: '',
      created_at: '',
      updated_at: ''
    })

    const setMe = (data: User) => {
      me.id = data.id
      Object.assign(me, data)
    }

    return { me, setMe }
  }
)
