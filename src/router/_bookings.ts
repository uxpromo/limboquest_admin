import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/bookings',
    name: 'bookings.index',
    meta: {
      layout: 'app',
    },
    component: () => import('@/pages/bookings/index.vue'),
  }),
  defineRoute({
    path: '/bookings/create',
    name: 'bookings.create',
    meta: {
      layout: 'app',
    },
    component: () => import('@/pages/bookings/create.vue'),
  }),
  defineRoute({
    path: '/bookings/:id/edit',
    name: 'bookings.edit',
    meta: {
      layout: 'app',
    },
    component: () => import('@/pages/bookings/edit.vue'),
  }),
])

export default routes
