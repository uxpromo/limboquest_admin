import type { DayjsType } from '@finzor-ui/use-day-js'
import type { QuestDTO } from './Quest.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class Quest {
  readonly id!: number
  readonly author_id!: number
  readonly slug!: string
  readonly title!: string
  readonly subtitle!: string | null
  readonly playtime!: number | null
  readonly players_min!: number | null
  readonly players_max!: number | null
  readonly players_base_limit!: number | null
  readonly surcharge_price!: number | null
  readonly base_price!: number | null
  readonly location_id!: number
  readonly short_description!: string | null
  readonly full_description!: string | null
  readonly additional_info!: string | null
  readonly age_rating!: string | null
  readonly is_visible!: boolean
  readonly is_in_dev!: boolean
  readonly opening_date_text!: string | null
  readonly average_time!: number | null
  readonly is_auto_average_time!: boolean
  readonly passability!: number | null
  readonly is_auto_passability!: boolean
  readonly best_time!: number | null
  readonly is_auto_best_time!: boolean
  readonly difficulty_level!: number | null
  readonly scariness_level!: number | null
  readonly is_bookable!: boolean
  readonly sort!: number | null
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: QuestDTO) {
    this.id = dto.id
    this.author_id = dto.author_id
    this.slug = dto.slug
    this.title = dto.title
    this.subtitle = dto.subtitle
    this.playtime = dto.playtime
    this.players_min = dto.players_min
    this.players_max = dto.players_max
    this.players_base_limit = dto.players_base_limit
    this.surcharge_price = dto.surcharge_price
    this.base_price = dto.base_price
    this.location_id = dto.location_id
    this.short_description = dto.short_description
    this.full_description = dto.full_description
    this.additional_info = dto.additional_info
    this.age_rating = dto.age_rating
    this.is_visible = dto.is_visible
    this.is_in_dev = dto.is_in_dev
    this.opening_date_text = dto.opening_date_text
    this.average_time = dto.average_time
    this.is_auto_average_time = dto.is_auto_average_time
    this.passability = dto.passability
    this.is_auto_passability = dto.is_auto_passability
    this.best_time = dto.best_time
    this.is_auto_best_time = dto.is_auto_best_time
    this.difficulty_level = dto.difficulty_level
    this.scariness_level = dto.scariness_level
    this.is_bookable = dto.is_bookable
    this.sort = dto.sort
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
