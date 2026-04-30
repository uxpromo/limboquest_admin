import type { AppRouteMetaType } from '@finzor-ui/layout'

declare module 'vue-router' {
  interface RouteMeta extends AppRouteMetaType {}
}