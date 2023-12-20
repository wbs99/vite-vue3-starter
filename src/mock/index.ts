import type { MockMethod } from 'vite-plugin-mock'
import { MockSession } from './MockSession'
import { MockCourseList } from './mockCourseList'
import { MockMe } from './mockMe'

export default [
  ...MockMe, ...MockSession, ...MockCourseList
] as MockMethod[]
