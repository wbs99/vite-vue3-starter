import type { MockMethod } from 'vite-plugin-mock'
import { MockSession } from './MockSession'
import { MockMe } from './mockMe'
import { MockTag } from './mockTag'

export default [
  ...MockMe, ...MockSession, ...MockTag
] as MockMethod[]
