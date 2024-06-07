import { useQuery } from '@tanstack/vue-query'
import { http } from '../utils/http'

export const getJwtApi = (buttonLoading: Ref<boolean>) => http.post<{ jwt: string }>(
  '/session',
  { email: '1134954328@qq.com', code: 123456 },
  { _buttonLoading: buttonLoading }
)

export const fetchMeApi = () => http.get<Resource<User>>('/me')

export const fetchMeQuery = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['meApi'],
    queryFn: async () => {
      const response = await fetchMeApi()
      return response.data.resource
    },
  })
  return {
    meData: data, isMeLoading: isLoading, isMeError: isError, meError: error,
  }
}
