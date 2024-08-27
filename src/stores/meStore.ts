import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { User } from '../api/meApi'
import { http } from '../utils/http'

export const useMeStore = defineStore(
  'meStore',
  () => {
    const me = reactive<User>({
      id: 0,
      email: '',
      created_at: '',
      updated_at: ''
    })

    const setMe = (data: User) => Object.assign(me, data)

    const getMePromise = () => http.get<Resource<User>>('/me')

    return { me, setMe, getMePromise }
  }
)
