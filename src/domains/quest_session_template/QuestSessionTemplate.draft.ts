import type QuestSessionTemplate from './QuestSessionTemplate.model'

export default class QuestSessionTemplateDraft {
  readonly id: number | null = null
  author_id: number | null = null
  quest_ids: number[] = []
  starts_on: string | null = null
  ends_on: string | null = null
  template: string | null = null
  is_active: boolean = true

  constructor(model?: QuestSessionTemplate) {
    if (model) {
      this.id = model.id
      this.author_id = model.author_id
      this.quest_ids = model.quest_ids
      this.starts_on =
        typeof model.starts_on === 'string'
          ? model.starts_on
          : (model.starts_on as { format: (f: string) => string }).format('YYYY-MM-DD')
      this.ends_on =
        typeof model.ends_on === 'string'
          ? model.ends_on
          : (model.ends_on as { format: (f: string) => string }).format('YYYY-MM-DD')
      this.template = JSON.stringify(model.template, null, 2)
      this.is_active = model.is_active
    }
  }

  static fromModel(model: QuestSessionTemplate): QuestSessionTemplateDraft {
    return new QuestSessionTemplateDraft(model)
  }
}
