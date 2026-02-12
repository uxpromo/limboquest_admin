import type Booking from './Booking.model'

export default class BookingDraft {
  readonly id: number | null = null
  quest_session_id: number | null = null
  user_id: number | null = null
  name: string | null = null
  phone: string | null = null
  email: string | null = null
  players_count: number | null = null
  status: string | null = 'pending'
  source_id: string | null = null
  pricing_snapshot: unknown = null
  total_price: number | null = null
  paid_amount: number | null = null
  manual_discount: number | null = null
  manual_discount_reason: string | null = null
  notes: string | null = null
  booking_code: string | null = null
  play_time: number | null = null
  winners: boolean | null = null
  hints: number | null = null
  confirmed_at: string | null = null
  cancelled_at: string | null = null

  constructor(model?: Booking) {
    if (model) {
      this.id = model.id
      this.quest_session_id = model.quest_session_id
      this.user_id = model.user_id
      this.name = model.name
      this.phone = model.phone
      this.email = model.email
      this.players_count = model.players_count
      this.status = model.status
      this.source_id = model.source_id
      this.pricing_snapshot = model.pricing_snapshot
      this.total_price = model.total_price
      this.paid_amount = model.paid_amount
      this.manual_discount = model.manual_discount
      this.manual_discount_reason = model.manual_discount_reason
      this.notes = model.notes
      this.booking_code = model.booking_code
      this.play_time = model.play_time
      this.winners = model.winners
      this.hints = model.hints
      const formatDt = (dt: unknown) =>
        dt == null ? null : typeof dt === 'string' ? dt : (dt as { format: (f: string) => string }).format('YYYY-MM-DDTHH:mm')
      this.confirmed_at = formatDt(model.confirmed_at)
      this.cancelled_at = formatDt(model.cancelled_at)
    }
  }

  static fromModel(model: Booking): BookingDraft {
    return new BookingDraft(model)
  }
}
