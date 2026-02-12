import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware, middlewarePipeline } from '@finzor-ui/feature-auth'
import auth from '@/router/_auth'
import profile from '@/router/_profile'
import locations from '@/router/_locations'
import pricingRules from '@/router/_pricing_rules'
import quests from '@/router/_quests'
import sessions from '@/router/_sessions'
import bookings from '@/router/_bookings'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard.index',
      component: () => import('@/pages/dashboard/index.vue'),
    },
    ...auth,
    ...profile,
    ...locations,
    ...quests,
    ...pricingRules,
    ...sessions,
    ...bookings,
  ],
})

router.beforeEach(async (to, from, next) => {
  await middlewarePipeline(to, from, next, [authMiddleware])
})

export default router
