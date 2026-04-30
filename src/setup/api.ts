import { createApiConfig } from '@finzor-ui/feature-api'

const apiConfig = createApiConfig({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

export { apiConfig }