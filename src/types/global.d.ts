interface Resource<T> {
  resource: T
}
interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
interface User {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}
interface Item {
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
interface Tag {
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

interface Pager {
  page: number
  perPage: number
}
interface Course {
  id: number
  name: string
}

interface ListResponse<T> {
  code: number
  msg: string
  total: number
  data: T[]
}
