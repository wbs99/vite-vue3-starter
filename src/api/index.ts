import { http } from '../utils/http'

export const getJwtApi = () => http.post<{ jwt: string }>('/session',
  { email: '1134954328@qq.com', code: 123456 },
  { _buttonLoading: true }
)

export const fetchMeApi = () => http.get<Resource<User>>('/me')
