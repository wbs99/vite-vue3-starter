import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useMeStore } from '../stores/meStore'
import { useNProgress } from '@vueuse/integrations/useNProgress'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/NotFoundPage.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/login': 'startsWith',
  '/start': 'exact',
  '/welcome': 'startsWith'
}

function isWhiteListed(path: string) {
  return Object.entries(whiteList).some(([key, mode]) =>
    mode === 'exact' ? path === key : path.startsWith(key)
  )
}

const { isLoading } = useNProgress()

router.beforeEach(async (to) => {
  isLoading.value = true

  if (isWhiteListed(to.path)) {
    return true
  }

  const meStore = useMeStore()

  // 如果 Pinia 中已有用户信息，跳过请求
  // if (meStore.me.id) {
  //   return true
  // }

  const ok = await meStore.isAuthenticated()
  if (!ok) {
    return `/login?return_to=${encodeURIComponent(to.fullPath)}`
  }

  return true
})

router.afterEach(() => {
  isLoading.value = false
})
