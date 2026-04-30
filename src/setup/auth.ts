import { createAuthConfig } from '@finzor-ui/feature-auth'
import type { CurrentUserType } from '@/types'

const authConfig = createAuthConfig<CurrentUserType>({
  userFields: {
    name: (user) => user.full_name,
    email: (user) => user.email,
  },
})

export { authConfig }