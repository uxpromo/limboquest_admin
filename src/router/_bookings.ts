const routes = [
  {
    path: '/bookings',
    name: 'bookings.index',
    component: () => import('@/pages/bookings/index.vue'),
  },
  {
    path: '/bookings/create',
    name: 'bookings.create',
    component: () => import('@/pages/bookings/create.vue'),
  },
  {
    path: '/bookings/:id/edit',
    name: 'bookings.edit',
    component: () => import('@/pages/bookings/edit.vue'),
  },
]

export default routes
