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
  {
    path: '/locations/:id/edit',
    name: 'locations.edit',
    component: () => import('@/pages/locations/edit.vue'),
  },
]

export default routes
