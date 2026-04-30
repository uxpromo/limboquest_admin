export interface QuestSessionTemplateDTO {
  id: number
  author_id: number
  quest_ids: number[]
  starts_on: string
  ends_on: string
  template: Record<string, unknown>[]
  is_active: boolean
  created_at: string
  updated_at: string
}
