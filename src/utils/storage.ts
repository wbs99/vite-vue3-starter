const MyJwt = 'jwt'

export const setJwt = (jwt: string) => window.localStorage.setItem(MyJwt, jwt)

export const getJwt = () => window.localStorage.getItem(MyJwt) || 'null'

export const removeJwt = () => window.localStorage.removeItem(MyJwt)
