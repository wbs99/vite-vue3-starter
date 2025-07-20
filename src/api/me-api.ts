import { useQuery } from '@tanstack/vue-query'
import { http } from './http'

export type LoginForm = {
  email: string
  code: string
}

export type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export const FETCH_ME_QUERY_KEY = 'meApi'

export const loginApi = (
  loginForm: LoginForm,
  buttonLoading: Ref<boolean>
) => http.post<{ jwt: string }>(
  '/login',
  loginForm,
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
