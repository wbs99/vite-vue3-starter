import { http } from './http'

export type Permission = {
  permissions: string[]
}

export const fetchPermissionApi = () => http.get<Resource<Permission>>('/permission')
