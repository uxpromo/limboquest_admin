export interface QuestSessionDTO {
  id: number
  author_id: number
  quest_id: number
  starts_at: string
  duration: number | null
  pricing_rule_id: number
  prepayment_only: boolean
  notes: string | null
  created_at: string
  updated_at: string
}
