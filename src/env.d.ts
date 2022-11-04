type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Mock = (config: AxiosRequestConfig) => [number, any]



// 用于扩展 axios
import { AxiosRequestConfig } from 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig {
    _autoLoading?: boolean
    _mock?: string
  }
}