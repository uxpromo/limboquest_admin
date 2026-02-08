export type CurrentUserType = {
  id: number
  first_name: string
  second_name: string
  full_name: string
  email: string
  is_active: boolean
  is_admin?: boolean
  is_superadmin?: boolean
}

declare module '@finzor-ui/feature-auth' {
  interface AuthUserType extends CurrentUserType {}
}
