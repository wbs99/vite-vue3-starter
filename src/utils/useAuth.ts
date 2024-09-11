import { useMeStore } from '../stores/meStore'

const hasPermission = (permission: string) => {
  const meStore = useMeStore()

  return meStore.permissions.includes(permission)
}

export const auth = (permissionValue: string | string[]) => {
  let auth

  if (typeof permissionValue === 'string') {
    auth = permissionValue !== ''
      ? hasPermission(permissionValue)
      : true
  } else {
    auth = permissionValue.length > 0
      ? permissionValue.some(item => hasPermission(item))
      : true
  }

  return auth
}

export const authAll = (permissionValue: string[]) => permissionValue.length > 0
  ? permissionValue.every(item => hasPermission(item))
  : true
