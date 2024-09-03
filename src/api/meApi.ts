import { useQuery } from '@tanstack/vue-query'
import { http } from './http'

export type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export const FETCH_ME_QUERY_KEY = 'meApi'

export const getJwtApi = (buttonLoading: Ref<boolean>) => http.post<{ jwt: string }>(
  '/session',
  { email: '1134954328@qq.com', code: 123456 },
  { _buttonLoading: buttonLoading }
)

export const fetchMeApi = () => http.get<Resource<User>>('/me')

export const useFetchMe = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [FETCH_ME_QUERY_KEY],
    queryFn: async () => {
      const response = await fetchMeApi()
      return response.data.resource
    },
  })
  return {
    meData: data, isMePending: isPending, isMeError: isError, meError: error,
  }
}
