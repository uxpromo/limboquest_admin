import { createRouter, createWebHistory } from 'vue-router'

import {
  authMiddleware,
  middlewarePipeline,
} from '@finzor-ui/feature-auth'
import auth from '@/router/_auth'
import profile from '@/router/_profile'
import quests from '@/router/_quests'
import sessions from '@/router/_sessions'
import bookings from '@/router/_bookings'
import settings from '@/router/_settings'
import analytics from '@/router/_analytics'
import incidents from '@/router/_incidents'
import tasks from '@/router/_tasks'
import { defineRoute, defineRoutes, type AppRouteRecordRawType } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/',
    name: 'dashboard.index',
    meta: { layout: 'app' },
    component: () => import('@/pages/dashboard/index.vue'),
  }),
  ...auth,
  ...profile,
  ...quests,
  ...sessions,
  ...bookings,
  ...settings,
  ...analytics,
  ...incidents,
  ...tasks,
  defineRoute({
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {
      allowGuest: true,
      layout: 'auth',
    },
    component: () => import('@/pages/errors/404.vue'),
  }),
]) satisfies readonly AppRouteRecordRawType[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  return await middlewarePipeline(to, from, [authMiddleware])
})

export default router