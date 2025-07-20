import type { MockMethod } from 'vite-plugin-mock'
import { MockLogin } from './mock-login'
import { MockMe } from './mock-me'
import { MockPermission } from './mock-permissions'
import { MockTag } from './mock-tag'

export default [
  ...MockLogin, ...MockMe, ...MockTag, ...MockPermission
] as MockMethod[]
