import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

type Data = Course
export const MockCourseList: MockMethod[] = [
  {
    url: '/api/v1/courses',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: ResponseParams): ListResponse<Data> => {
      const { perPage, page } = query
      return createResponse({ count: 85, perPage: parseInt(perPage), page: parseInt(page) || 1 })
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

const createResponse = ({ count = 10, page = 1, perPage = 10 }, attrs?: Partial<Data>): ListResponse<Data> => {
  const sendCount = (page - 1) * perPage
  const restCount = count - sendCount
  return {
    code: 200,
    msg: '成功',
    total: count,
    data: restCount > 0 ? createList(Math.min(restCount, perPage), attrs) : []
  }
}
