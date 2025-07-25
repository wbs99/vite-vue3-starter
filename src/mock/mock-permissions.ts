import type { MockMethod } from 'vite-plugin-mock'
import type { Permission } from '../api/permission-api'

export const MockPermission: MockMethod[] = [
  {
    url: '/api/v1/permission',
    method: 'get',
    timeout: 100,
    response: (): Resource<Permission> => {
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
