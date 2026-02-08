const routes = [
  {
    path: '/profile',
    name: 'profile.index',
    component: () => import('@/pages/profile/index.vue'),
  },
]

export default routes