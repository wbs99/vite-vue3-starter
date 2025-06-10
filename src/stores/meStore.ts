import type { User } from '../api/meApi'
import { defineStore } from 'pinia'
import { http } from '../api/http'
import { getPermissionApi } from '../api/permissionApi'

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

    const permissions = ref<string[]>([])
    const getPermissions = async () => {
      const response = await getPermissionApi()
      permissions.value = response.data.resource.permissions
    }

    return {
      me,
      setMe,
      getMePromise,
      permissions,
      getPermissions
    }
  },
  {
    persist: true,
  }
)
