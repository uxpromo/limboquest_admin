const routes = [
  {
    path: '/quest_sessions',
    name: 'quest_sessions.index',
    component: () => import('@/pages/sessions/index.vue'),
  },
  {
    path: '/quest_sessions/create',
    name: 'quest_sessions.create',
    component: () => import('@/pages/sessions/create.vue'),
  },
  {
    path: '/quest_sessions/:id/edit',
    name: 'quest_sessions.edit',
    component: () => import('@/pages/sessions/edit.vue'),
  },
]

export default routes
