import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/quests',
    name: 'quests.index',
    component: () => import('@/pages/quests/index.vue'),
  }),
  defineRoute({
    path: '/quests/create',
    name: 'quests.create',
    component: () => import('@/pages/quests/create.vue'),
  }),
  defineRoute({
    path: '/quests/:id/edit',
    name: 'quests.edit',
    component: () => import('@/pages/quests/edit.vue'),
  }),
])

export default routes
