import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

type Data = Course
export const MockCourseList: MockMethod[] = [
  {
    url: '/api/v1/courses',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: ResponseParams): Resources<Data> => {
      const { perPage, currentPage } = query
      return createResponse({ count: 85, perPage: parseInt(perPage), currentPage: parseInt(currentPage) || 1 })
    }
  }
]

let id = 0
const createId = () => {
  id += 1
  return id
}

const createItem = (attrs?: Partial<Data>): Data => {
  return {
    id: createId(),
    name: faker.lorem.word(),
    ...attrs
  }
}

const createList = (n: number, attrs?: Partial<Data>): Data[] => Array.from({ length: n }).map(() => createItem(attrs))

const createResponse = ({ count = 10, currentPage = 1, perPage = 10 }, attrs?: Partial<Data>): Resources<Data> => {
  const sendCount = (currentPage - 1) * perPage
  const restCount = count - sendCount
  return {
    code: 200,
    msg: '成功',
    total: count,
    resources: restCount > 0 ? createList(Math.min(restCount, perPage), attrs) : []
  }
}
