import { http } from './http'

export type PermissionResponse = {
  permissions: string[]
}

export const getPermissionApi = () => http.get<Resource<PermissionResponse>>('/permission')
