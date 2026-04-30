import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/quest_sessions',
    name: 'quest_sessions.index',
    component: () => import('@/pages/sessions/index.vue'),
  }),
  defineRoute({
    path: '/quest_sessions/create',
    name: 'quest_sessions.create',
    component: () => import('@/pages/sessions/create.vue'),
  }),
  defineRoute({
    path: '/quest_sessions/:id/edit',
    name: 'quest_sessions.edit',
    component: () => import('@/pages/sessions/edit.vue'),
  }),
])

export default routes
