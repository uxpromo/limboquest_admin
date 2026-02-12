const routes = [
  {
    path: '/pricing_rules',
    name: 'pricing_rules.index',
    component: () => import('@/pages/pricing_rules/index.vue'),
  },
  {
    path: '/pricing_rules/create',
    name: 'pricing_rules.create',
    component: () => import('@/pages/pricing_rules/create.vue'),
  },
  {
    path: '/pricing_rules/:id/edit',
    name: 'pricing_rules.edit',
    component: () => import('@/pages/pricing_rules/edit.vue'),
  },
]

export default routes
