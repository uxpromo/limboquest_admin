import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/profile',
    name: 'profile.index',
    component: () => import('@/pages/profile/index.vue'),
  }),
])

export default routes