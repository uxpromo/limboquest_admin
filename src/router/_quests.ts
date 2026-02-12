const routes = [
  {
    path: '/quests',
    name: 'quests.index',
    component: () => import('@/pages/quests/index.vue'),
  },
  {
    path: '/quests/create',
    name: 'quests.create',
    component: () => import('@/pages/quests/create.vue'),
  },
  {
    path: '/quests/:id/edit',
    name: 'quests.edit',
    component: () => import('@/pages/quests/edit.vue'),
  },
]

export default routes
