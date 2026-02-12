import type PricingRule from './PricingRule.model'

export default class PricingRuleDraft {
  readonly id: number | null = null
  name: string | null = null
  description: string | null = null
  is_for_quests: boolean = false
  is_for_gift_cards: boolean = false
  base_price: number | null = null
  base_players_count: number | null = null
  surcharge_per_player: number | null = null
  is_active: boolean = true

  constructor(model?: PricingRule) {
    if (model) {
      this.id = model.id
      this.name = model.name
      this.description = model.description
      this.is_for_quests = model.is_for_quests
      this.is_for_gift_cards = model.is_for_gift_cards
      this.base_price = model.base_price
      this.base_players_count = model.base_players_count
      this.surcharge_per_player = model.surcharge_per_player
      this.is_active = model.is_active
    }
  }

  static fromModel(model: PricingRule): PricingRuleDraft {
    return new PricingRuleDraft(model)
  }
}
