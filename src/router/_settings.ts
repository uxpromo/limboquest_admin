import { defineRoute, defineRoutes } from '@finzor-ui/layout'

const routes = defineRoutes([
  defineRoute({
    path: '/settings',
    component: () => import('@/pages/settings/index.vue'),
    name: 'settings.index',
    redirect: { name: 'settings.users' },
    children: [
      defineRoute({
        path: 'users',
        name: 'settings.users',
        component: () => import('@/pages/settings/users.vue'),
      }),
      defineRoute({
        path: 'pricing-rules',
        name: 'settings.pricing_rules.index',
        component: () => import('@/pages/settings/pricing_rules/index.vue'),
      }),
      defineRoute({
        path: 'pricing-rules/create',
        name: 'settings.pricing_rules.create',
        component: () => import('@/pages/settings/pricing_rules/create.vue'),
      }),
      defineRoute({
        path: 'pricing-rules/:id/edit',
        name: 'settings.pricing_rules.edit',
        component: () => import('@/pages/settings/pricing_rules/edit.vue'),
      }),
      defineRoute({
        path: 'locations',
        name: 'settings.locations.index',
        component: () => import('@/pages/settings/locations/index.vue'),
      }),
      defineRoute({
        path: 'locations/create',
        name: 'settings.locations.create',
        component: () => import('@/pages/settings/locations/create.vue'),
      }),
      defineRoute({
        path: 'locations/:id/edit',
        name: 'settings.locations.edit',
        component: () => import('@/pages/settings/locations/edit.vue'),
      }),
    ],
  }),
])

export default routes
