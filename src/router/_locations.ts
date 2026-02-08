const routes = [
  {
    path: '/locations',
    name: 'locations.index',
    component: () => import('@/pages/locations/index.vue'),
  },
  {
    path: '/locations/create',
    name: 'locations.create',
    component: () => import('@/pages/locations/create.vue'),
  },
]

export default routes
