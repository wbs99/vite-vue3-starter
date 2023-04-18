import { faker } from '@faker-js/faker'

faker.setLocale('zh_CN');

import type { MockMethod } from 'vite-plugin-mock'
import { MockMe } from './mockMe';
import { MockSession } from './MockSession';

export default [
  ...MockMe, ...MockSession
] as MockMethod[]