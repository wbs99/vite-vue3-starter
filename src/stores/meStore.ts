import { defineStore } from 'pinia'
import type { Me } from '../api/me-api'
import { fetchMeApi } from '../api/me-api'
import { fetchPermissionApi } from '../api/permission-api'

export const useMeStore = defineStore(
  'meStore',
  () => {
    const me = reactive<Me>({
      id: 0,
      email: '',
      created_at: '',
      updated_at: ''
    })
    const setMe = (data: Me) => {
      Object.assign(me, data)
    }

    const permissions = ref<string[]>([])
    const fetchPermissions = async () => {
      const res = await fetchPermissionApi()
      permissions.value = res.data.resource.permissions
    }

    const fetchMe = async () => {
      const res = await fetchMeApi()
      setMe(res.data.resource)
      await fetchPermissions()
    }

    const isAuthenticated = () =>
      fetchMe().then(
        () => true,
        () => false
      )

    return {
      me,
      setMe,
      permissions,
      fetchPermissions,
      fetchMe,
      isAuthenticated
    }
  },
  {
    persist: true
  }
)
