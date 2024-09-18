import type { MockMethod } from 'vite-plugin-mock'
import type { Tag } from '../api/tagApi'
import { faker } from '@faker-js/faker'

type Data = Tag

let id = 0
const createId = () => {
  id += 1
  return id
}

const createTag = (attrs?: Partial<Data>): Data => {
  return {
    id: createId(),
    tagName: faker.lorem.word(),
    ...attrs
  }
}

const createTagList = (n: number, attrs?: Partial<Data>): Data[] => Array.from({ length: n }).map(() => createTag(attrs))

const createTagResponse = ({ count = 10, currentPage = 1, perPage = 10 }, attrs?: Partial<Data>): Resources<Data> => {
  const sendCount = (currentPage - 1) * perPage
  const restCount = count - sendCount
  return {
    code: 200,
    msg: '成功',
    total: count,
    resources: restCount > 0 ? createTagList(Math.min(restCount, perPage), attrs) : []
  }
}

export const MockTag: MockMethod[] = [
  {
    url: '/api/v1/tag/:id',
    method: 'get',
    statusCode: 200,
    response: (): Resource<Data> => {
      return {
        resource: createTag()
      }
    }
  },
  {
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    response: ({ query }: ResponseParams): Resources<Data> => {
      const { perPage, currentPage } = query
      return createTagResponse({ count: 85, perPage: parseInt(perPage), currentPage: parseInt(currentPage) || 1 })
    }
  },
  {
    url: '/api/v1/tag',
    method: 'post',
    statusCode: 200,
    response: (): Resource<Data> => {
      return {
        resource: createTag()
      }
    }
  },
  {
    url: '/api/v1/tag/:id',
    method: 'patch',
    statusCode: 200,
    response: (): Resource<Tag> => {
      return {
        resource: createTag()
      }
    }
  },
  {
    url: '/api/v1/tag/:id',
    method: 'delete',
    statusCode: 200,
  }
]
