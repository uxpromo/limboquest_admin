const routes = [
  {
    path: '/incidents',
    name: 'incidents.index',
    component: () => import('@/pages/incidents/index.vue'),
  },
]

export default routes
