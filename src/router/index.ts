
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { fetchMe, mePromise } from '../shared/me'

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: '/home', component: () => import("../views/Home.vue"),
  },
  {
    path: '/sign_in', component: () => import("../views/SignIn.vue"),
  },
  { path: "/:pathMatch(.*)", component: () => import("../views/NotFound.vue") },
]
const history = createWebHashHistory()

export const router = createRouter({ history, routes })
fetchMe()
const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}
router.beforeEach((to) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return mePromise!.then(
    () => true,
    () => `/sign_in?return_to=${to.path}`
  )
})
