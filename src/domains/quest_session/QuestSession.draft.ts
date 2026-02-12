import type QuestSession from './QuestSession.model'

/**
 * QuestSessionDraft для формы создания/редактирования сеанса.
 */
export default class QuestSessionDraft {
  readonly id: number | null = null
  quest_id: number | null = null
  starts_at: string | null = null
  duration: number | null = null
  pricing_rule_id: number | null = null
  prepayment_only: boolean = false
  notes: string | null = null

  constructor(model?: QuestSession) {
    if (model) {
      this.id = model.id
      this.quest_id = model.quest_id
      this.starts_at = typeof model.starts_at === 'string' ? model.starts_at : (model.starts_at as { format: (f: string) => string }).format('YYYY-MM-DDTHH:mm')
      this.duration = model.duration
      this.pricing_rule_id = model.pricing_rule_id
      this.prepayment_only = model.prepayment_only
      this.notes = model.notes
    }
  }

  static fromModel(model: QuestSession): QuestSessionDraft {
    return new QuestSessionDraft(model)
  }
}
