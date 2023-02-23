import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

export const http = new Http('/api/v1')


if (DEBUG) {
  import('../mocks/mock').then(({ mockSession, mockMe }) => {
    const mock = (response: AxiosResponse) => {
      switch (response.config?._mock) {
        case 'session':
          [response.status, response.data] = mockSession(response.config)
          return true
        case 'me':
          [response.status, response.data] = mockMe(response.config)
          return true
      }
      return false
    }
    // mock
    http.instance.interceptors.response.use(
      response => {
        mock(response)
        if (response.status >= 400) {
          throw { response }
        } else {
          return response
        }
      },
      error => {
        mock(error.response)
        if (error.response.status >= 400) {
          throw error
        } else {
          return error.response
        }
      })
  })
}

// set header
http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) { config.headers!.Authorization = `Bearer ${jwt}` }
  if (config._autoLoading === true) { console.log('加载中') }
  return config
})
// loading
http.instance.interceptors.response.use((response) => {
  if (response.config._autoLoading === true) { console.log('加载完成') }
  return response
}, (error: AxiosError) => {
  if (error.response?.config._autoLoading === true) { console.log('加载完成') }
  throw error
})

http.instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) { alert('请求太频繁') }
    throw error
  }
)


// demo

// api/v1/tags?kind=income
// const response = await http.get<{ resources: Tag[] }>('/tags',
//   { kind: 'income' },
//   {
//     _mock: 'tagIndex',
//     _autoLoading: true
//   }
// )

// api/v1/tags?kind=expenses
// const response = await http.get<{ resources: Tag[] }>('/tags',
//   { kind: 'expenses' },
//   {
//     _mock: 'tagIndex',
//     _autoLoading: true
//   }
// )