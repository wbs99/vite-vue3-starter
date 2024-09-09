import type { MockMethod } from 'vite-plugin-mock'
import { MockLogin } from './MockLogin'
import { MockMe } from './mockMe'
import { MockPermission } from './mockPermissions'
import { MockTag } from './mockTag'

export default [
  ...MockLogin, ...MockMe, ...MockTag, ...MockPermission
] as MockMethod[]
