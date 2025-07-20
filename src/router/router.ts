import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { createRouter, createWebHistory } from 'vue-router'
import { fetchMeApi } from '../api/me-api'
import { useMeStore } from '../stores/meStore'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/login', component: () => import('../pages/LoginPage.vue'),
  },
  {
    path: '/home', component: () => import('../pages/HomePage.vue'),
  },
  { path: '/:pathMatch(.*)', component: () => import('../pages/NotFoundPage.vue') },
]
const history = createWebHistory()

export const router = createRouter({ history, routes })

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/login': 'startsWith',
}

const { isLoading } = useNProgress()
router.beforeEach(async (to) => {
  const meStore = useMeStore()
  isLoading.value = true
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }

  return meStore.getMePromise()!.then(
    async () => {
      const response = await fetchMeApi()
      meStore.setMe(response.data.resource)
      meStore.getPermissions()
      return true
    },
    () => `/login?return_to=${to.path}`
  )
})

router.afterEach(() => {
  isLoading.value = false
})
