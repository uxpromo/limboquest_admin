const routes = [
  {
    path: '/tasks',
    name: 'tasks.index',
    component: () => import('@/pages/tasks/index.vue'),
  },
]

export default routes
