import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import type { CurrentUserType } from '@/types'
import { createApiConfig } from '@finzor-ui/feature-api'
import { createAuthConfig } from '@finzor-ui/feature-auth'
import { getLocaleManagerPlugin } from '@/setup/locale'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const apiConfig = createApiConfig({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

const authConfig = createAuthConfig<CurrentUserType>({
  userFields: {
    name: (user) => user.full_name,
    email: (user) => user.email,
  },
})

const vueQueryConfig = {
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // отключает retry по всему проекту
        refetchOnMount: false, // предотвращает бесконечные циклы
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  }),
}

const app = createApp(App)
  .use(VueQueryPlugin, vueQueryConfig)
  .use(createPinia())
  .use(router)
  .use(apiConfig)
  .use(authConfig)
  .use(getLocaleManagerPlugin())

app.mount('#app')
