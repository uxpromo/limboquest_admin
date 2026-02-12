import type { DayjsType } from '@finzor-ui/use-day-js'
import type { PricingRuleDTO } from './PricingRule.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class PricingRule {
  readonly id!: number
  readonly name!: string
  readonly description!: string | null
  readonly is_for_quests!: boolean
  readonly is_for_gift_cards!: boolean
  readonly base_price!: number | null
  readonly base_players_count!: number | null
  readonly surcharge_per_player!: number | null
  readonly is_active!: boolean
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: PricingRuleDTO) {
    this.id = dto.id
    this.name = dto.name
    this.description = dto.description
    this.is_for_quests = dto.is_for_quests
    this.is_for_gift_cards = dto.is_for_gift_cards
    this.base_price = dto.base_price
    this.base_players_count = dto.base_players_count
    this.surcharge_per_player = dto.surcharge_per_player
    this.is_active = dto.is_active
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
