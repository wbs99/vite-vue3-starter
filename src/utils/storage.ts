const JWT_KEY = 'jwt'

export const setJwt = (jwt: string) => window.localStorage.setItem(JWT_KEY, jwt)

export const getJwt = () => window.localStorage.getItem(JWT_KEY) || 'null'

export const removeJwt = () => window.localStorage.removeItem(JWT_KEY)
