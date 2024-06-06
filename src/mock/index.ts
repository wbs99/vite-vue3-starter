import type { MockMethod } from 'vite-plugin-mock'
import { MockSession } from './MockSession'
import { MockCourseList } from './mockCourseList'
import { MockMe } from './mockMe'
import { MockTag } from './mockTag'

export default [
  ...MockMe, ...MockSession, ...MockCourseList, ...MockTag
] as MockMethod[]
