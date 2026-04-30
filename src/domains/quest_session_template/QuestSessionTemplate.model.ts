import type { DayjsType } from '@finzor-ui/use-day-js'
import type { QuestSessionTemplateDTO } from './QuestSessionTemplate.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class QuestSessionTemplate {
  readonly id!: number
  readonly author_id!: number
  readonly quest_ids!: number[]
  readonly starts_on!: DayjsType
  readonly ends_on!: DayjsType
  readonly template!: Record<string, unknown>[]
  readonly is_active!: boolean
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: QuestSessionTemplateDTO) {
    this.id = dto.id
    this.author_id = dto.author_id
    this.quest_ids = dto.quest_ids
    this.starts_on = dayjsCast(dto.starts_on)
    this.ends_on = dayjsCast(dto.ends_on)
    this.template = dto.template
    this.is_active = dto.is_active
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
