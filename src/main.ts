import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { vueQueryConfig, VueQueryPlugin } from '@/setup/tanstack-query'
import { apiConfig } from '@/setup/api'
import { authConfig } from '@/setup/auth'
import { getLocaleManagerPlugin } from '@/setup/locale'


const app = createApp(App)
  .use(VueQueryPlugin, vueQueryConfig)
  .use(createPinia())
  .use(router)
  .use(apiConfig)
  .use(authConfig)
  .use(getLocaleManagerPlugin())

app.mount('#app')
