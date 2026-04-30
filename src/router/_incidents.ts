import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/incidents',
    name: 'incidents.index',
    component: () => import('@/pages/incidents/index.vue'),
  }),
])

export default routes
