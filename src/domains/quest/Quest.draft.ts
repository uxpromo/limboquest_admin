import type Quest from './Quest.model'

/**
 * QuestDraft is a draft of a Quest for create/update forms.
 */
export default class QuestDraft {
  readonly id: number | null = null
  slug: string | null = null
  title: string | null = null
  subtitle: string | null = null
  playtime: number | null = null
  players_min: number | null = null
  players_max: number | null = null
  players_base_limit: number | null = null
  surcharge_price: number | null = null
  base_price: number | null = null
  location_id: number | null = null
  short_description: string | null = null
  full_description: string | null = null
  additional_info: string | null = null
  age_rating: string | null = null
  is_visible: boolean = false
  is_in_dev: boolean = false
  opening_date_text: string | null = null
  average_time: number | null = null
  is_auto_average_time: boolean = false
  passability: number | null = null
  is_auto_passability: boolean = false
  best_time: number | null = null
  is_auto_best_time: boolean = false
  difficulty_level: number | null = null
  scariness_level: number | null = null
  is_bookable: boolean = true
  sort: number | null = null

  constructor(model?: Quest) {
    if (model) {
      this.id = model.id
      this.slug = model.slug
      this.title = model.title
      this.subtitle = model.subtitle
      this.playtime = model.playtime
      this.players_min = model.players_min
      this.players_max = model.players_max
      this.players_base_limit = model.players_base_limit
      this.surcharge_price = model.surcharge_price
      this.base_price = model.base_price
      this.location_id = model.location_id
      this.short_description = model.short_description
      this.full_description = model.full_description
      this.additional_info = model.additional_info
      this.age_rating = model.age_rating
      this.is_visible = model.is_visible
      this.is_in_dev = model.is_in_dev
      this.opening_date_text = model.opening_date_text
      this.average_time = model.average_time
      this.is_auto_average_time = model.is_auto_average_time
      this.passability = model.passability
      this.is_auto_passability = model.is_auto_passability
      this.best_time = model.best_time
      this.is_auto_best_time = model.is_auto_best_time
      this.difficulty_level = model.difficulty_level
      this.scariness_level = model.scariness_level
      this.is_bookable = model.is_bookable
      this.sort = model.sort
    }
  }

  static fromModel(model: Quest): QuestDraft {
    return new QuestDraft(model)
  }
}
