type Resource<T> = {
  resource: T
}

type Resources<T> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}

type Item = {
  id: number
  user_id: number
  amount: number
  note?: string
  tag_ids: number[]
  tags?: Tag[]
  happen_at: string
  created_at: string
  updated_at: string
  deleted_at?: string
  kind: 'expenses' | 'income'
}

type Tag = {
  id: number
  kind: Item['kind']
  user_id: number
  name: string
  sign: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Pager = {
  page: number
  perPage: number
}

type Course = {
  id: number
  name: string
}

type ListResponse<T> ={
  code: number
  msg: string
  total: number
  data: T[]
}
