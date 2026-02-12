export interface PricingRuleDTO {
  id: number
  name: string
  description: string | null
  is_for_quests: boolean
  is_for_gift_cards: boolean
  base_price: number | null
  base_players_count: number | null
  surcharge_per_player: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}
