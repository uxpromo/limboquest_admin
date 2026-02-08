const routes = [
  {
    path: "/auth",
    meta: {
      noAuth: true,
    },
    redirect: { name: "auth", params: { action: "login" } },
  },
  {
    path: "/auth/:action(login|password-reset|password-request)",
    name: "auth",
    meta: {
      noAuth: true,
    },
    component: () => import("@/pages/auth/index.vue"),
  },
];

export default routes;
