import type { MockMethod } from 'vite-plugin-mock'
import type { PermissionResponse } from '../api/permission-api'

export const MockPermission: MockMethod[] = [
  {
    url: '/api/v1/permission',
    method: 'get',
    timeout: 100,
    response: (): Resource<PermissionResponse> => {
      return {
        resource: {
          permissions: [
            'permission.browse',
            'permission.create',
            'permission.edit',
            'permission.remove',
          ]
        }
      }
    }
  },
]
