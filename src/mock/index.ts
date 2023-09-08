import { faker } from '@faker-js/faker'

import type { MockMethod } from 'vite-plugin-mock'
import { MockMe } from './mockMe'
import { MockSession } from './MockSession'

faker.setLocale('zh_CN')

export default [
  ...MockMe, ...MockSession
] as MockMethod[]
