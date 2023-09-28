// 用于扩展 axios
import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    _buttonLoading?: Ref<boolean>
    _autoLoading?: boolean
  }
}
