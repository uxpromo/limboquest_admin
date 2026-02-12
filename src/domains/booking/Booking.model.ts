import type { DayjsType } from '@finzor-ui/use-day-js'
import type { BookingDTO } from './Booking.types'
import dayjsCast from '@/domains/_base/casts/dayjsCast'

export default class Booking {
  readonly id!: number
  readonly quest_session_id!: number
  readonly user_id!: number | null
  readonly name!: string
  readonly phone!: string
  readonly email!: string | null
  readonly players_count!: number
  readonly status!: string
  readonly source_id!: string | null
  readonly pricing_snapshot!: unknown
  readonly total_price!: number
  readonly paid_amount!: number
  readonly manual_discount!: number
  readonly manual_discount_reason!: string | null
  readonly notes!: string | null
  readonly booking_code!: string
  readonly play_time!: number | null
  readonly winners!: boolean | null
  readonly hints!: number | null
  readonly confirmed_at!: DayjsType | null
  readonly cancelled_at!: DayjsType | null
  readonly created_at!: DayjsType
  readonly updated_at!: DayjsType

  constructor(dto: BookingDTO) {
    this.id = dto.id
    this.quest_session_id = dto.quest_session_id
    this.user_id = dto.user_id
    this.name = dto.name
    this.phone = dto.phone
    this.email = dto.email
    this.players_count = dto.players_count
    this.status = dto.status
    this.source_id = dto.source_id
    this.pricing_snapshot = dto.pricing_snapshot
    this.total_price = dto.total_price
    this.paid_amount = dto.paid_amount
    this.manual_discount = dto.manual_discount
    this.manual_discount_reason = dto.manual_discount_reason
    this.notes = dto.notes
    this.booking_code = dto.booking_code
    this.play_time = dto.play_time
    this.winners = dto.winners
    this.hints = dto.hints
    this.confirmed_at = dto.confirmed_at ? dayjsCast(dto.confirmed_at) : null
    this.cancelled_at = dto.cancelled_at ? dayjsCast(dto.cancelled_at) : null
    this.created_at = dayjsCast(dto.created_at)
    this.updated_at = dayjsCast(dto.updated_at)
  }
}
