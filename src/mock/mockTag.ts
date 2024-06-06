import type { MockMethod } from 'vite-plugin-mock'

export const MockTag: MockMethod[] = [{
  url: '/api/v1/tag',
  method: 'get',
  statusCode: 200,
  response: (): Resource<Tag> => {
    return {
      resource: {
        id: 1,
        tagName: '标签'
      }
    }
  }
}]
