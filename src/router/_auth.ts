import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/auth',
    meta: {
      allowGuest: true,
      layout: 'auth',
    },
    redirect: { name: 'auth', params: { action: 'login' } },
  }),
  defineRoute({
    path: '/auth/:action(login|password-reset|password-request)',
    name: 'auth',
    meta: {
      allowGuest: true,
      layout: 'auth',
    },
    component: () => import('@/pages/auth/index.vue'),
  }),
])

export default routes
