import type { MockMethod } from 'vite-plugin-mock'

export const MockLogin: MockMethod[] = [{
  url: '/api/v1/login',
  method: 'post',
  timeout: 100,
  statusCode: 200,
  response: (): { jwt: string } => {
    return {
      jwt: 'xxxxxxx'
    }
  }
}]
