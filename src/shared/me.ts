import type { AxiosResponse } from 'axios'
import { fetchMeApi } from '../api'

// eslint-disable-next-line import/no-mutable-exports
export let mePromise: Promise<AxiosResponse<{
  resource: {
    id: number
  }
}>> | undefined

export const fetchMe = () => {
  mePromise = fetchMeApi()
  return mePromise
}
