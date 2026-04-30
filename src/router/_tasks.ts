import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/tasks',
    name: 'tasks.index',
    meta: {
      layout: 'app',
    },
    component: () => import('@/pages/tasks/index.vue'),
  }),
])

export default routes
