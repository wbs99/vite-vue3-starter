
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: '/home', component: () => import("../views/Home.vue"),
    children: [
      {
        path: '/home/:id',
        component: () => import("../views/First.vue"),
      }
    ]
  },
  { path: '/about', component: () => import("../views/About.vue") },
  { path: "/:pathMatch(.*)", component: () => import("../views/NotFound.vue") },
]
const history = createWebHashHistory()

export const router = createRouter({ history, routes })
