const routes = [
  {
    path: '/bookings',
    name: 'bookings.index',
    component: () => import('@/pages/bookings/index.vue'),
  },
]

export default routes
