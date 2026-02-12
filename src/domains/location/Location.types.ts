export interface LocationDTO {
  id: number
  author_id: number
  short_address: string
  address: string
  description: string | null
  latitude: number | null
  longitude: number | null
  working_hours: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  is_active: boolean
}
