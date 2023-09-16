import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useButtonLoadingStore } from '../store/useButtonLoadingStore'
import { getJwt, removeJwt } from './storage'

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

// set header and start loading
http.instance.interceptors.request.use(config => {
  const buttonLoadingStore = useButtonLoadingStore()

  const jwt = getJwt()
  if (jwt) { config.headers!.Authorization = `Bearer ${jwt}` }
  if (config._autoLoading === true) { console.log('加载中') }
  if (config._buttonLoading === true) {
    buttonLoadingStore.startButtonLoading()
  }
  return config
})

// cancel loading
http.instance.interceptors.response.use(
  response => {
    const buttonLoadingStore = useButtonLoadingStore()
    if (response.config._autoLoading === true) {
      console.log('加载完成')
    }
    if (response.config._buttonLoading === true) {
      buttonLoadingStore.closeButtonLoading()
    }
    return response
  },
  (error: AxiosError) => {
    const buttonLoadingStore = useButtonLoadingStore()
    if (error.response?.config._autoLoading === true) {
      console.log('加载完成')
    }
    if (error.response?.config._buttonLoading === true) {
      buttonLoadingStore.closeButtonLoading()
    }
    throw error
  })

// errors
http.instance.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response
      const fn = table[status]
      fn?.()
    }
    throw error
  }
)

const table: Record<string, undefined | (() => void)> = {
  401: () => {
    window.alert('登录状态过期，请重新登录')
    removeJwt()
  },
  402: () => {
    window.alert('请付费后观看')
  },
  403: () => {
    window.alert('没有权限')
  },
  429: () => {
    window.alert('请求过于频繁')
  },
  500: () => {
    window.alert('服务器错误')
  }
}
