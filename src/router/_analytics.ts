import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/analytics',
    component: () => import('@/pages/analytics/index.vue'),
    name: 'analytics.index',
    redirect: { name: 'analytics.overview' },
    children: [
      defineRoute({
        path: 'overview',
        name: 'analytics.overview',
        component: () => import('@/pages/analytics/overview.vue'),
      }),
    ],
  }),
])

export default routes
