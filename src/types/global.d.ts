type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Resource<T> = {
  resource: T
}

type Resources<T> = {
  resources: T[]
  code: number
  msg: string
  total: number
}

type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}

type Pager = {
  currentPage: number
  perPage: number
}

type Course = {
  id: number
  name: string
}
