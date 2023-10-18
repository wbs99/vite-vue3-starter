import { faker } from '@faker-js/faker'

import type { MockMethod } from 'vite-plugin-mock'
import { MockSession } from './MockSession'
import { MockMe } from './mockMe'
import {MockCourseList} from './mockCourseList'

faker.setLocale('zh_CN')

export default [
  ...MockMe, ...MockSession,...MockCourseList
] as MockMethod[]
