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

type Pager = {
  currentPage: number
  perPage: number
}
