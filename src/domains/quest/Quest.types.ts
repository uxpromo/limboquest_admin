export interface QuestDTO {
  id: number
  author_id: number
  slug: string
  title: string
  subtitle: string | null
  playtime: number | null
  players_min: number | null
  players_max: number | null
  players_base_limit: number | null
  surcharge_price: number | null
  base_price: number | null
  location_id: number
  short_description: string | null
  full_description: string | null
  additional_info: string | null
  age_rating: string | null
  is_visible: boolean
  is_in_dev: boolean
  opening_date_text: string | null
  average_time: number | null
  is_auto_average_time: boolean
  passability: number | null
  is_auto_passability: boolean
  best_time: number | null
  is_auto_best_time: boolean
  difficulty_level: number | null
  scariness_level: number | null
  is_bookable: boolean
  sort: number | null
  created_at: string
  updated_at: string
}
