import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'
import { MockSession } from './MockSession'
import { MockCourseList } from './mockCourseList'
import { MockMe } from './mockMe'

faker.setLocale('zh_CN')

export default [
  ...MockMe, ...MockSession, ...MockCourseList
] as MockMethod[]
