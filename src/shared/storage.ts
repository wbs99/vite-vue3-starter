const MyJwt = 'jwt'

export const setJwt = (jwt: string) => window.localStorage.setItem(MyJwt, JSON.stringify(jwt))

export const getJwt = () => JSON.parse(window.localStorage.getItem(MyJwt) || 'null')

export const removeJwt = () => window.localStorage.removeItem(MyJwt)
