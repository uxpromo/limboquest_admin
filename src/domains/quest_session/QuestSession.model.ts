import type { DayjsType } from '@finzor-ui/use-day-js'
import type { QuestSessionDTO } from './QuestSession.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class QuestSession {
  readonly id!: number
  readonly author_id!: number
  readonly quest_id!: number
  readonly starts_at!: DayjsType
  readonly duration!: number | null
  readonly pricing_rule_id!: number
  readonly prepayment_only!: boolean
  readonly notes!: string | null
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: QuestSessionDTO) {
    this.id = dto.id
    this.author_id = dto.author_id
    this.quest_id = dto.quest_id
    this.starts_at = dayjsCast(dto.starts_at)
    this.duration = dto.duration
    this.pricing_rule_id = dto.pricing_rule_id
    this.prepayment_only = dto.prepayment_only
    this.notes = dto.notes
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
